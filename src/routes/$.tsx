import { createFileRoute, Link } from '@tanstack/react-router';
import { PageBody } from '@/components/SiteFrame';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/$')({ head: () => pageHead('Page not found | Residence24', 'This Residence24 page could not be found.', '/404'), component: () => <PageBody title="Page not found"><p>That page does not exist.</p><Link to="/" className="underline">Return home</Link></PageBody> });
