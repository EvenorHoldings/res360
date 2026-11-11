import { createServerFn } from '@tanstack/react-start';
export type HelpArticle = { id: string; question: string; answer_md: string; audience: string; category_id: string | null; sort: number | null };
export type HelpCategory = { id: string; slug: string; title: string; audience: string; sort: number | null };
/** Public read of published help content (RLS limits to published rows). */
export const getHelpContent = createServerFn({ method: 'GET' }).handler(async () => {
  const { createClient } = await import('@supabase/supabase-js');
  const db = createClient(process.env['SUPABASE_URL']!, process.env['SUPABASE_PUBLISHABLE_KEY']!, { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } });
  const [cats, arts] = await Promise.all([
    db.from('help_categories').select('id,slug,title,audience,sort').order('sort'),
    db.from('help_articles').select('id,question,answer_md,audience,category_id,sort').eq('status', 'published').order('sort'),
  ]);
  return { categories: (cats.data ?? []) as HelpCategory[], articles: (arts.data ?? []) as HelpArticle[] };
});
