import { createFileRoute, Link } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useState, type FormEvent, type ReactNode } from 'react';
import { SiteFrame } from '@/components/SiteFrame';
import { Button } from '@/components/ui/button';
import { submitInvestorLead } from '@/lib/investor-leads.functions';
import { pageHead } from '@/lib/page-head';

export const Route = createFileRoute('/pitch')({
  head: () => pageHead('Investor pitch | Res360', 'Res360: safe, affordable student housing near South African campuses. Investor overview and data room request.', '/pitch'),
  component: Pitch,
});

const Demo = () => <span className="ml-2 rounded-full bg-photo-action px-2 py-0.5 align-middle text-xs font-semibold text-photo-ink">Demo data</span>;
function Slide({ n, title, children }: { n: number; title: ReactNode; children: ReactNode }) {
  return <section className="flex min-h-[85vh] snap-start items-center px-4 py-12"><div className="mx-auto w-full max-w-3xl rounded-[14px] border border-photo-line bg-photo-panel p-8 backdrop-blur-[14px]"><p className="text-sm opacity-70">{n} / 10</p><h2 className="mt-1 text-3xl">{title}</h2><div className="mt-4 space-y-3">{children}</div></div></section>;
}

function Pitch() {
  const [zarMode, setZarMode] = useState(false);
  const [rate, setRate] = useState(18.5);
  const money = (usd: number) => zarMode ? new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(usd * rate) : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd);
  const send = useServerFn(submitInvestorLead);
  const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMsg('');
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try { await send({ data: { name: f.name ?? '', email: f.email ?? '', organisation: f.organisation || undefined, message: f.message || undefined, website: f.website || undefined } }); setMsg('Thank you. We will be in touch about the data room.'); e.currentTarget.reset(); }
    catch { setMsg('Please check your details and try again.'); }
    setBusy(false);
  }
  const input = 'mt-1 min-h-11 w-full rounded-md bg-photo-foreground px-3 text-photo-ink';
  return (
    <SiteFrame>
      <main id="main-content" className="h-[calc(100vh-4rem)] snap-y snap-mandatory overflow-y-auto">
        <section className="flex min-h-[85vh] snap-start items-center px-4"><div className="mx-auto max-w-3xl text-center"><h1 className="text-[clamp(32px,6vw,60px)]">Res360</h1><p className="text-xl">Every student. Every campus. Every home.</p><p className="mt-2 text-sm opacity-75">Res360, formerly Residence24</p></div></section>
        <Slide n={1} title="Problem"><p>Short-term, safe, affordable student housing near campuses is fragmented across informal listings, word of mouth and agents.</p></Slide>
        <Slide n={2} title="Solution"><p>The Res360 platform, homeowner conversions, university partnerships and student transport — one trusted place to find and fill student beds.</p></Slide>
        <Slide n={3} title="Market"><ul className="list-disc pl-5"><li>SA public university students: [VERIFY WITH SOURCE]</li><li>Share needing accommodation: [VERIFY WITH SOURCE]</li><li>Target suburbs: Observatory, Brooklyn, Maitland, Salt River, Woodstock</li></ul></Slide>
        <Slide n={4} title="Product"><p>Live today: province and campus search, inclusive filters, listing pages with viewing requests, rent calculator and host submissions.</p><div className="flex flex-wrap gap-3"><Button asChild className="rounded-full bg-photo-action text-photo-ink"><Link to="/search">Open search</Link></Button><Button asChild variant="outline" className="rounded-full text-photo-ink"><Link to="/list">Host flow</Link></Button></div></Slide>
        <Slide n={5} title="Business model"><ul className="list-disc pl-5"><li>Commission per booking</li><li>Featured-listing fees</li><li>Premium subscriptions</li><li>Homeowner conversion fees</li></ul></Slide>
        <Slide n={6} title={<>Traction <span className="ml-2 rounded-full bg-photo-action px-2 py-0.5 align-middle text-xs font-semibold text-photo-ink">Prototype data</span></>}><p>Prototype stage. Live listing and enquiry counts will be shown here from the platform; no figures are presented as real traction yet.</p></Slide>
        <Slide n={7} title="Roadmap"><ol className="list-decimal pl-5"><li>Phase 1 — setup (months 1–6)</li><li>Phase 2 — pilot Observatory + Woodstock (months 7–12)</li><li>Phase 3 — Brooklyn, Maitland, Salt River (year 2)</li><li>Phase 4 — other university towns (year 3)</li></ol></Slide>
        <Slide n={8} title={<>Financials<Demo /></>}>
          <div className="flex flex-wrap items-center gap-3 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={zarMode} onChange={(e) => setZarMode(e.target.checked)} className="h-5 w-5" /> Show in ZAR</label>{zarMode && <label>USD/ZAR rate <input type="number" step="0.1" min="1" value={rate} onChange={(e) => setRate(Number(e.target.value) || 1)} className="ml-1 w-24 rounded-md bg-photo-foreground px-2 py-1 text-photo-ink" /></label>}</div>
          <dl className="grid grid-cols-2 gap-2">{([['Startup need', 275000], ['Seed ask', 300000], ['Revenue Y1', 200000], ['Revenue Y2', 500000], ['Revenue Y3', 900000]] as const).map(([k, v]) => <div key={k} className="rounded-lg bg-photo-glass p-3"><dt className="text-xs opacity-75">{k}</dt><dd className="text-lg font-bold">{money(v)}</dd></div>)}<div className="rounded-lg bg-photo-glass p-3"><dt className="text-xs opacity-75">Break-even</dt><dd className="text-lg font-bold">18–24 months</dd></div></dl>
        </Slide>
        <Slide n={9} title="Team"><p><strong>Joachim Paul</strong>, founder — real estate and student housing background.</p><p>Supported by marketing and legal advisors.</p></Slide>
        <Slide n={10} title="The Ask">
          <p>Seed round of {money(300000)} to launch the Cape Town pilot.</p>
          <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">Name<input name="name" required minLength={2} maxLength={120} className={input} /></label>
            <label className="text-sm">Email<input name="email" type="email" required maxLength={255} className={input} /></label>
            <label className="text-sm sm:col-span-2">Organisation<input name="organisation" maxLength={160} className={input} /></label>
            <label className="text-sm sm:col-span-2">Message<textarea name="message" maxLength={2000} className={`${input} min-h-20 py-2`} /></label>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <Button type="submit" disabled={busy} className="rounded-full bg-photo-action text-photo-ink hover:bg-photo-action/90 sm:col-span-2">{busy ? 'Sending…' : 'Request the data room'}</Button>
            <p role="status" className="text-sm sm:col-span-2">{msg}</p>
          </form>
        </Slide>
      </main>
    </SiteFrame>
  );
}
