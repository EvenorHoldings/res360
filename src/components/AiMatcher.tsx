import { Link } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useState, type FormEvent } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getRecommendations } from '@/lib/recommend.functions';

type Match = { id: string; score: number; reason: string };

export function AiMatcher() {
  const recommend = useServerFn(getRecommendations);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [titles, setTitles] = useState<Record<string, string>>({});

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (text.trim().length < 10) { setError('Tell us a little more (at least 10 characters).'); return; }
    setBusy(true); setError(''); setMatches(null);
    try {
      const res = await recommend({ data: { request: text } });
      if (!res.ok) { setError(res.message); }
      else {
        setSummary(res.summary); setMatches(res.matches);
        if (res.matches.length) {
          const { supabase } = await import('@/integrations/supabase/client');
          const { data } = await supabase.from('listings').select('id,title').in('id', res.matches.map((m) => m.id));
          setTitles(Object.fromEntries((data ?? []).map((r) => [r.id, r.title])));
        }
      }
    } catch { setError('AI matching failed. Please try again.'); }
    setBusy(false);
  }

  return (
    <section aria-labelledby="ai-title" className="mb-6 rounded-[14px] border border-photo-line bg-photo-panel p-5 text-left backdrop-blur-[14px]">
      <h2 id="ai-title" className="flex items-center gap-2 text-xl"><Wand2 size={20} aria-hidden="true" /> Describe what you need</h2>
      <p className="mt-1 text-sm opacity-85">Tell us your budget, preferred areas and needs in your own words. AI-powered matching suggests residences and explains why.</p>
      <form onSubmit={submit} className="mt-3 space-y-3">
        <label htmlFor="ai-request" className="sr-only">Your accommodation needs</label>
        <textarea id="ai-request" value={text} onChange={(e) => setText(e.target.value)} maxLength={1000} placeholder="e.g. Under R5 000 a month near UCT, quiet, pet friendly, available from February" className="min-h-24 w-full rounded-md bg-photo-foreground p-3 text-photo-ink" />
        <Button type="submit" disabled={busy} className="rounded-full bg-photo-action text-photo-ink hover:bg-photo-action/90">{busy ? 'Finding matches…' : 'Find my matches'}</Button>
      </form>
      <div aria-live="polite" className="mt-3 text-sm">
        {error && <p className="font-medium">{error}</p>}
        {matches && <>
          {summary && <p className="mb-3">{summary}</p>}
          {matches.length === 0 ? <p>No close matches yet. Try widening your budget or area.</p> : (
            <ol className="space-y-2">
              {matches.map((m) => (
                <li key={m.id} className="rounded-lg border border-photo-line p-3">
                  <div className="flex items-center justify-between gap-3">
                    <Link to="/listing/$id" params={{ id: m.id }} className="font-semibold underline">{titles[m.id] ?? 'View residence'}</Link>
                    <span className="rounded-full bg-photo-action px-2 py-0.5 text-xs font-semibold text-photo-ink">{m.score}% match</span>
                  </div>
                  <p className="mt-1 opacity-90">{m.reason}</p>
                </li>
              ))}
            </ol>
          )}
          <p className="mt-2 text-xs opacity-70">Suggestions are AI-generated. Always check details with the host.</p>
        </>}
      </div>
    </section>
  );
}
