import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { PageBody } from '@/components/SiteFrame';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { pageHead } from '@/lib/page-head';
import { getHelpContent, type HelpArticle } from '@/lib/help.functions';
import { filterHelp, type Audience } from '@/lib/help-search';

export const Route = createFileRoute('/help')({
  loader: () => getHelpContent(),
  head: ({ loaderData }) => {
    const base = pageHead('Help centre | Res360', 'Answers about finding student rooms, listing a space, accounts, safety and Res360.', '/help');
    const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: (loaderData?.articles ?? []).map(a => ({ '@type': 'Question', name: a.question, acceptedAnswer: { '@type': 'Answer', text: a.answer_md } })) };
    return { ...base, scripts: loaderData?.articles.length ? [{ type: 'application/ld+json', children: JSON.stringify(faq) }] : [] };
  },
  component: HelpPage,
});

function sessionId() {
  let id = sessionStorage.getItem('res360-help-session');
  if (!id) { id = crypto.randomUUID().replace(/-/g, ''); sessionStorage.setItem('res360-help-session', id); }
  return id;
}

function Helpful({ article }: { article: HelpArticle }) {
  const [done, setDone] = useState('');
  async function vote(helpful: boolean) {
    const { data } = await supabase.rpc('vote_help_article', { _article: article.id, _helpful: helpful, _session: sessionId() });
    setDone(data ? 'Thanks for your feedback.' : 'You have already given feedback on this answer.');
  }
  return <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">{done ? <span role="status">{done}</span> : <><span>Was this helpful?</span><Button size="sm" variant="outline" onClick={() => vote(true)}>Yes</Button><Button size="sm" variant="outline" onClick={() => vote(false)}>No</Button></>}</div>;
}

function HelpPage() {
  const { categories, articles } = Route.useLoaderData();
  const [audience, setAudience] = useState<Audience>('all');
  const [query, setQuery] = useState('');
  const shown = useMemo(() => filterHelp(articles, audience, query), [articles, audience, query]);
  return <PageBody title="Help centre">
    <label className="block text-sm">Search help<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="For example: NSFAS, deposit, confirm listing" className="mt-1 min-h-11 w-full rounded-sm border border-input bg-background px-3 text-foreground" /></label>
    <Tabs value={audience} onValueChange={v => setAudience(v as Audience)}><TabsList><TabsTrigger value="student">Students</TabsTrigger><TabsTrigger value="landlord">Landlords</TabsTrigger><TabsTrigger value="all">All</TabsTrigger></TabsList></Tabs>
    {shown.length === 0 && <p role="status">No answers match your search. Try other words or <Link to="/contact" className="underline">contact us</Link>.</p>}
    {categories.map(c => { const items = shown.filter(a => a.category_id === c.id); if (!items.length) return null; return <section key={c.id}><h2 className="mt-6 text-xl font-semibold">{c.title}</h2><Accordion type="multiple">{items.map(a => <AccordionItem key={a.id} value={a.id}><AccordionTrigger className="text-left">{a.question}</AccordionTrigger><AccordionContent>{a.answer_md.split(/\n{2,}/).map((p, i) => <p key={i} className="mb-2">{p}</p>)}<Helpful article={a} /></AccordionContent></AccordionItem>)}</Accordion></section>; })}
    <section className="mt-8 rounded-sm border border-border bg-card p-5"><h2 className="text-lg font-semibold">Still stuck?</h2><p className="mt-1 text-sm"><Link to="/contact" className="underline">Contact the Res360 team</Link> or visit the <Link to="/safety" className="underline">Safety centre</Link> for urgent concerns.</p></section>
  </PageBody>;
}
