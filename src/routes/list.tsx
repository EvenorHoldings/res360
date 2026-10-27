import { createFileRoute, Link } from '@tanstack/react-router';
import { PageBody } from '@/components/SiteFrame';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/page-head';

export const Route = createFileRoute('/list')({
  head: () => pageHead('List your space | Res360', 'Submit student accommodation to Res360 for review.', '/list'),
  component: () => <PageBody title="List your space">
    <p>Hosts submit a room or residence for review. Listings appear in search only after approval.</p>
    <ol className="list-decimal space-y-1 pl-5"><li>Create a free account.</li><li>Open the home page and choose “List Your Space”.</li><li>Add details, price and inclusive features, then submit.</li></ol>
    <div className="flex flex-wrap gap-3 pt-2">
      <Button asChild className="rounded-full bg-photo-action text-photo-ink hover:bg-photo-action/90"><Link to="/">Start a listing</Link></Button>
      <Button asChild variant="outline" className="rounded-full text-photo-ink"><Link to="/signup">Create account</Link></Button>
      <Button asChild variant="secondary"><Link to="/portfolio">Readiness workspace</Link></Button>
    </div>
  </PageBody>,
});
