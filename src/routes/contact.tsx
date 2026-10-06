import { createFileRoute, Link } from '@tanstack/react-router';
import { PageBody } from '@/components/SiteFrame';
import { pageHead } from '@/lib/page-head';

export const Route = createFileRoute('/contact')({
  head: () => pageHead('Contact | Res360', 'Get in touch with the Res360 team.', '/contact'),
  component: () => <PageBody title="Contact">
    <p>Questions about a listing or your account? Start with our <Link to="/help" className="underline">Help page</Link>.</p>
    <p>Investors can request the data room on the <Link to="/pitch" className="underline">Pitch page</Link>.</p>
  </PageBody>,
});
