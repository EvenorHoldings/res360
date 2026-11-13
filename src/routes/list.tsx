import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { PageBody } from '@/components/SiteFrame';
import { Button } from '@/components/ui/button';
import { ListingSubmitForm } from '@/components/ListingSubmitForm';
import { PrideIcon, PawIcon, AccessIcon } from '@/components/FeatureIcons';
import { pageHead } from '@/lib/page-head';

export const Route = createFileRoute('/list')({
  head: () => pageHead('List your space | Res360', 'Submit student accommodation to Res360 for review.', '/list'),
  component: ListPage,
});
const CHIPS = [['lgbtq', PrideIcon, 'LGBTQ+ Friendly'], ['pet', PawIcon, 'Pet Friendly'], ['accessible', AccessIcon, 'Special Needs Accessible']] as const;
function ListPage() {
  const [f, setF] = useState({ lgbtq: false, pet: false, accessible: false });
  return <PageBody title="List your space">
    <p>Hosts submit a room or residence for review. Listings appear in search only after approval.</p>
    <div className="flex flex-wrap gap-3 pt-2">
      <Button className="rounded-full bg-photo-action text-photo-ink hover:bg-photo-action/90" onClick={() => document.getElementById('listing-form')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })}>Start a listing</Button>
      <Button asChild variant="outline" className="rounded-full text-photo-ink"><Link to="/signup">Create account</Link></Button>
      <Button asChild variant="secondary"><Link to="/portfolio">Readiness workspace</Link></Button>
    </div>
    <div className="rounded-lg bg-brand-navy p-4 pt-6 text-photo-foreground">
      <div className="mb-[18px] flex flex-wrap justify-center gap-2.5">{CHIPS.map(([k, Icon, label]) => <Button key={k} type="button" variant="ghost" aria-pressed={f[k]} onClick={() => setF(v => ({ ...v, [k]: !v[k] }))} className={`min-h-11 h-auto rounded-sm border border-photo-line px-4 py-2 text-sm hover:bg-photo-glass hover:text-photo-foreground ${f[k] ? 'bg-photo-foreground text-photo-ink' : 'bg-photo-glass text-photo-foreground'}`}><span aria-hidden="true"><Icon /></span> {label}</Button>)}</div>
      <ListingSubmitForm id="listing-form" features={f} />
    </div>
  </PageBody>;
}
