import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

export const getRecommendations = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ request: z.string().trim().min(10).max(1000) }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: allowed, error } = await context.supabase.rpc('consume_ai_matching_request');
    if (error) return { ok: false as const, status: 503, message: 'AI matching is temporarily unavailable.' };
    if (!allowed) return { ok: false as const, status: 429, message: 'You have reached 10 matching requests this hour. Please try again next hour.' };
    const { recommendListings } = await import('./ai/recommend.server');
    return recommendListings(data.request);
  });
