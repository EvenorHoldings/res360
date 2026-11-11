import type { HelpArticle } from './help.functions';
export type Audience = 'student' | 'landlord' | 'all';
/** Audience tab + case-insensitive word search over question and answer. */
export function filterHelp(articles: HelpArticle[], audience: Audience, query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return articles.filter(a => (audience === 'all' || a.audience === audience || a.audience === 'all')
    && words.every(w => `${a.question} ${a.answer_md}`.toLowerCase().includes(w)));
}
