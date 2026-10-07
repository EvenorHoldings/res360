import { createOpenAI } from '@ai-sdk/openai';
import { APICallError, streamText } from 'ai';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { createLovableAiGatewayRunIdFetch } from './run-id.server';

const GATEWAY_URL = 'https://ai.gateway.lovable.dev/v1';
const MODEL = 'openai/gpt-6-astra';

export type Recommendation = { id: string; score: number; reason: string };
export type RecommendResult =
  | { ok: true; summary: string; matches: Recommendation[]; considered: number }
  | { ok: false; status: number; message: string };

const INSTRUCTIONS = `You are Res360's student accommodation matcher for South Africa.
You receive a renter's plain-language request and a JSON list of approved listings (prices in ZAR per month).
Pick up to 6 listings that best match budget, area/campus and needs. Only use ids from the list. Never invent listings or facts.
If nothing fits well, return the closest options and say what does not match.
Reply with JSON only, no markdown: {"summary": string (1-2 sentences), "matches": [{"id": string, "score": integer 0-100, "reason": string (max 30 words, plain language, mention price and any mismatch)}]}`;

export async function recommendListings(request: string): Promise<RecommendResult> {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) return { ok: false, status: 500, message: 'AI matching is not configured yet.' };

  const db = createClient<Database>(process.env['SUPABASE_URL']!, process.env['SUPABASE_PUBLISHABLE_KEY']!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await db
    .from('listings')
    .select('id,title,suburb,location,city,province,institution,distance_km,monthly_rent,deposit_zar,room_type,available_from,lgbtq_friendly,pet_friendly,accessible,nsfas_accredited,amenities,description')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(80);
  if (error) return { ok: false, status: 500, message: 'Could not load listings right now.' };
  const listings = data ?? [];
  if (listings.length === 0) return { ok: true, summary: 'There are no approved residences to match yet. Check back soon.', matches: [], considered: 0 };

  const compact = listings.map((l) => ({ ...l, description: l.description.slice(0, 240) }));
  const runIdFetch = createLovableAiGatewayRunIdFetch(undefined);
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { 'Lovable-API-Key': apiKey, 'X-Lovable-AIG-SDK': 'vercel-ai-sdk' },
    fetch: runIdFetch.fetch,
  });

  try {
    const result = streamText({
      model: provider.responses(MODEL),
      instructions: INSTRUCTIONS,
      messages: [{ role: 'user', content: `Renter request:\n${request}\n\nListings:\n${JSON.stringify(compact)}` }],
      providerOptions: { openai: { store: false, reasoningEffort: 'low' } },
    });
    const text = await result.text;
    const json = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const parsed = JSON.parse(json) as { summary?: unknown; matches?: unknown };
    const valid = new Set(listings.map((l) => l.id));
    const matches = (Array.isArray(parsed.matches) ? parsed.matches : [])
      .filter((m): m is Recommendation => !!m && typeof m.id === 'string' && valid.has(m.id))
      .slice(0, 6)
      .map((m) => ({ id: m.id, score: Math.max(0, Math.min(100, Math.round(Number(m.score) || 0))), reason: String(m.reason ?? '').slice(0, 300) }));
    return { ok: true, summary: String(parsed.summary ?? '').slice(0, 400), matches, considered: listings.length };
  } catch (err) {
    if (APICallError.isInstance(err)) {
      const status = err.statusCode ?? 500;
      if (status === 429) return { ok: false, status, message: 'AI matching is busy. Please try again in a minute.' };
      if (status === 402) return { ok: false, status, message: 'AI matching has run out of credits. The site owner needs to add credits.' };
      if (status === 403) return { ok: false, status, message: 'AI matching is not available right now.' };
      return { ok: false, status, message: 'AI matching failed. Please try again later.' };
    }
    if (err instanceof SyntaxError) return { ok: false, status: 502, message: 'The AI reply could not be read. Please try rephrasing.' };
    return { ok: false, status: 500, message: 'AI matching failed. Please try again later.' };
  }
}
