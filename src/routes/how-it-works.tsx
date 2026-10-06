import { createFileRoute } from '@tanstack/react-router';
import { PageBody } from '@/components/SiteFrame';
import { pageHead } from '@/lib/page-head';

export const Route = createFileRoute('/how-it-works')({
  head: () => pageHead('How it works | Res360', 'Search, compare and request viewings of verified student accommodation on Res360.', '/how-it-works'),
  component: () => <PageBody title="How it works">
    <h2 className="text-xl">For students</h2>
    <ol className="list-decimal space-y-1 pl-5"><li>Search by province, campus, price and inclusive features.</li><li>Save and compare residences.</li><li>Request a viewing and agree terms directly with the host.</li></ol>
    <h2 className="text-xl">For hosts</h2>
    <ol className="list-decimal space-y-1 pl-5"><li>Create an account and submit your space.</li><li>Our team reviews every listing before it goes live.</li><li>Answer viewing requests from students.</li></ol>
    <h2 className="text-xl">Safety and verification</h2>
    <p>Listings are reviewed before publication. Students who confirm a .ac.za email are marked Student Verified. Always view a property and read the lease before paying.</p>
  </PageBody>,
});
