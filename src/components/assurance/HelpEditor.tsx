import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
type Row = { id: string; question: string; answer_md: string; status: string; audience: string; category_id: string | null; helpful_yes: number; helpful_no: number };
type Cat = { id: string; title: string };
const field = 'mt-1 w-full rounded-sm border border-input bg-background px-3 py-2 text-foreground';
/** Admin-only help article editor; RLS returns drafts only to admins. */
export function HelpEditor() {
  const [rows, setRows] = useState<Row[]>([]); const [cats, setCats] = useState<Cat[]>([]); const [open, setOpen] = useState<string | null>(null); const [msg, setMsg] = useState('');
  async function load() {
    const [{ data: c }, { data: a }] = await Promise.all([supabase.from('help_categories').select('id,title').order('sort'), supabase.from('help_articles').select('id,question,answer_md,status,audience,category_id,helpful_yes,helpful_no').order('sort')]);
    setCats(c ?? []); setRows((a ?? []) as Row[]);
  }
  useEffect(() => { void load(); }, []);
  async function save(r: Row) {
    const body = { question: r.question.trim(), answer_md: r.answer_md.trim(), status: r.status, audience: r.audience, category_id: r.category_id, updated_at: new Date().toISOString() };
    if (!body.question || !body.answer_md) { setMsg('Question and answer are required.'); return; }
    if (body.status === 'published' && body.answer_md.includes('[CONFIRM]')) { setMsg('Remove every [CONFIRM] note before publishing.'); return; }
    const { error } = r.id === 'new' ? await supabase.from('help_articles').insert(body) : await supabase.from('help_articles').update(body).eq('id', r.id);
    setMsg(error ? 'Could not save. Only admins can edit help articles.' : 'Saved.'); if (!error) { setOpen(null); void load(); }
  }
  const drafts = rows.filter(r => r.status === 'draft').length;
  const list = open === 'new' ? [{ id: 'new', question: '', answer_md: '', status: 'draft', audience: 'all', category_id: cats[0]?.id ?? null, helpful_yes: 0, helpful_no: 0 }, ...rows] : rows;
  return <section className="mb-8 rounded-sm border border-border bg-card p-5"><h2 className="mb-2 text-xl font-semibold">Help centre articles</h2>
    <p className="mb-3 text-sm text-muted-foreground">{rows.length} articles, {drafts} drafts awaiting confirmation. Only published articles appear on the Help page.</p>
    <Button type="button" variant="outline" size="sm" onClick={() => setOpen('new')}>New article</Button><p role="status" className="mt-2 text-sm">{msg}</p>
    <ul className="mt-3 divide-y divide-border">{list.map(r => <li key={r.id} className="py-2">{open === r.id ? <Editor row={r} cats={cats} onSave={save} onCancel={() => setOpen(null)} /> : <button type="button" onClick={() => setOpen(r.id)} className="flex w-full justify-between gap-3 text-left text-sm"><span>{r.question}</span><span className="shrink-0 text-muted-foreground">{r.status} · 👍 {r.helpful_yes} · 👎 {r.helpful_no}</span></button>}</li>)}</ul></section>;
}
function Editor({ row, cats, onSave, onCancel }: { row: Row; cats: Cat[]; onSave: (r: Row) => void; onCancel: () => void }) {
  const [r, setR] = useState(row);
  return <div className="space-y-2 text-sm"><label className="block">Question<input value={r.question} onChange={e => setR({ ...r, question: e.target.value })} className={field} /></label>
    <label className="block">Answer<textarea value={r.answer_md} onChange={e => setR({ ...r, answer_md: e.target.value })} className={`${field} min-h-32`} /></label>
    <div className="grid gap-2 sm:grid-cols-3"><label>Category<select value={r.category_id ?? ''} onChange={e => setR({ ...r, category_id: e.target.value || null })} className={field}>{cats.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select></label>
    <label>Audience<select value={r.audience} onChange={e => setR({ ...r, audience: e.target.value })} className={field}><option value="student">Students</option><option value="landlord">Landlords</option><option value="all">Everyone</option></select></label>
    <label>Status<select value={r.status} onChange={e => setR({ ...r, status: e.target.value })} className={field}><option value="draft">Draft</option><option value="published">Published</option></select></label></div>
    <div className="flex gap-2"><Button type="button" size="sm" onClick={() => onSave(r)}>Save</Button><Button type="button" size="sm" variant="ghost" onClick={onCancel}>Cancel</Button></div></div>;
}
