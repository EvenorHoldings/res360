import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { weeklyIssueSummary } from '@/lib/assistant/weekly.functions';
type Issue = { id: string; category: string; severity: string; summary: string; suggested_action: string | null; status: string; created_at: string; province_id: number | null; institution_id: string | null; provinces: { name: string } | null; institutions: { name: string } | null };
const field = 'mt-1 block min-h-10 rounded-sm border border-input bg-background px-2 text-foreground';
const SEV_ORDER: Record<string, number> = { safety: 0, high: 1, medium: 2, low: 3 };
/** Admin view of assistant-derived visitor issues; safety items always sort first. */
export function VisitorIssues() {
  const [rows, setRows] = useState<Issue[]>([]); const [err, setErr] = useState('');
  const [f, setF] = useState({ category: '', severity: '', province: '', institution: '', from: '' });
  const [summary, setSummary] = useState(''); const [busy, setBusy] = useState(false);
  async function load() {
    const { data, error } = await supabase.from('support_issues').select('id,category,severity,summary,suggested_action,status,created_at,province_id,institution_id,provinces(name),institutions(name)').order('created_at', { ascending: false }).limit(500);
    if (error) setErr('Visitor issues are available to admins only.'); else setRows((data ?? []) as never);
  }
  useEffect(() => { void load(); }, []);
  const shown = useMemo(() => rows.filter(r => (!f.category || r.category === f.category) && (!f.severity || r.severity === f.severity) && (!f.province || r.provinces?.name === f.province) && (!f.institution || r.institutions?.name === f.institution) && (!f.from || r.created_at >= f.from)).sort((a, b) => (SEV_ORDER[a.severity] ?? 9) - (SEV_ORDER[b.severity] ?? 9) || b.created_at.localeCompare(a.created_at)), [rows, f]);
  const week = 7 * 86400_000, now = Date.now();
  const thisWeek = rows.filter(r => now - Date.parse(r.created_at) < week).length;
  const lastWeek = rows.filter(r => { const d = now - Date.parse(r.created_at); return d >= week && d < 2 * week; }).length;
  const themes = Object.entries(rows.reduce<Record<string, number>>((a, r) => { a[r.category] = (a[r.category] ?? 0) + 1; return a; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const uniq = (xs: (string | undefined | null)[]) => Array.from(new Set(xs.filter(Boolean) as string[])).sort();
  async function setStatus(id: string, status: string) { const { error } = await supabase.from('support_issues').update({ status }).eq('id', id); if (!error) setRows(rs => rs.map(r => r.id === id ? { ...r, status } : r)); }
  async function weekly() { setBusy(true); try { setSummary((await weeklyIssueSummary()).text); } catch (e) { setSummary(e instanceof Error ? e.message : 'Could not generate the summary.'); } finally { setBusy(false); } }
  if (err) return <section className="mb-8 rounded-sm border border-border bg-card p-5"><h2 className="text-xl font-semibold">Visitor issues</h2><p className="text-sm text-muted-foreground">{err}</p></section>;
  const safetyOpen = rows.filter(r => r.severity === 'safety' && r.status === 'open').length;
  return <section className="mb-8 rounded-sm border border-border bg-card p-5"><h2 className="mb-2 text-xl font-semibold">Visitor issues</h2>
    {safetyOpen > 0 && <p role="alert" className="mb-3 rounded-sm border border-destructive p-3 text-sm font-semibold text-destructive">{safetyOpen} open safety {safetyOpen === 1 ? 'issue needs' : 'issues need'} attention.</p>}
    <p className="text-sm">This week {thisWeek} · last week {lastWeek} {lastWeek ? `(${thisWeek >= lastWeek ? '+' : ''}${Math.round(((thisWeek - lastWeek) / lastWeek) * 100)}%)` : ''}</p>
    {themes.length > 0 && <p className="mt-1 text-sm text-muted-foreground">Top themes: {themes.map(([c, n]) => `${c.replace(/_/g, ' ')} (${n})`).join(', ')}</p>}
    <div className="mt-3 flex flex-wrap gap-3 text-sm">
      <label>Category<select value={f.category} onChange={e => setF({ ...f, category: e.target.value })} className={field}><option value="">All</option>{uniq(rows.map(r => r.category)).map(x => <option key={x}>{x}</option>)}</select></label>
      <label>Severity<select value={f.severity} onChange={e => setF({ ...f, severity: e.target.value })} className={field}><option value="">All</option>{['safety', 'high', 'medium', 'low'].map(x => <option key={x}>{x}</option>)}</select></label>
      <label>Province<select value={f.province} onChange={e => setF({ ...f, province: e.target.value })} className={field}><option value="">All</option>{uniq(rows.map(r => r.provinces?.name)).map(x => <option key={x}>{x}</option>)}</select></label>
      <label>Institution<select value={f.institution} onChange={e => setF({ ...f, institution: e.target.value })} className={field}><option value="">All</option>{uniq(rows.map(r => r.institutions?.name)).map(x => <option key={x}>{x}</option>)}</select></label>
      <label>From<input type="date" value={f.from} onChange={e => setF({ ...f, from: e.target.value })} className={field} /></label>
      <Button type="button" variant="outline" disabled={busy} onClick={weekly} className="self-end">{busy ? 'Generating…' : 'Generate weekly summary'}</Button>
    </div>
    {summary && <p className="mt-3 whitespace-pre-line rounded-sm border border-border p-3 text-sm">{summary}</p>}
    <ul className="mt-4 divide-y divide-border">{shown.map(r => <li key={r.id} className="py-3 text-sm"><p className="font-semibold">{r.severity.toUpperCase()} · {r.category.replace(/_/g, ' ')} · {new Date(r.created_at).toLocaleString('en-ZA')} · {r.status}</p><p className="mt-1">{r.summary}</p>{r.suggested_action && <p className="mt-1 text-muted-foreground">Suggested: {r.suggested_action}</p>}<div className="mt-2 flex gap-2"><Button size="sm" variant="outline" onClick={() => setStatus(r.id, 'triaged')}>Mark triaged</Button><Button size="sm" variant="outline" onClick={() => setStatus(r.id, 'resolved')}>Mark resolved</Button></div></li>)}{shown.length === 0 && <li className="py-3 text-sm text-muted-foreground">No issues match.</li>}</ul>
  </section>;
}
