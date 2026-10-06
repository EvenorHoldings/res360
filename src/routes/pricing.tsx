import { createFileRoute } from '@tanstack/react-router';
import { PageBody } from '@/components/SiteFrame';
import { RentCalculator } from '@/components/RentCalculator';
import { pageHead } from '@/lib/page-head';

export const Route = createFileRoute('/pricing')({
  head: () => pageHead('Pricing | Res360', 'Res360 is free for students. See host options and estimate your rent in rand.', '/pricing'),
  component: () => <PageBody title="Pricing">
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-[14px] border border-photo-line bg-photo-panel p-5"><h2 className="text-xl">Students</h2><p className="text-2xl font-bold">Free</p><p className="text-sm">Search, save and request viewings at no cost.</p></div>
      <div className="rounded-[14px] border border-photo-line bg-photo-panel p-5"><h2 className="text-xl">Hosts</h2><p className="text-2xl font-bold">Free to list</p><p className="text-sm">Featured listings and booking commission will be introduced later; pricing to be confirmed.</p></div>
    </div>
    <RentCalculator />
  </PageBody>,
});
