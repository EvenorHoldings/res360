import { createFileRoute, Link } from '@tanstack/react-router';
import { PageBody } from '@/components/SiteFrame';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/help')({ head: () => pageHead('Help | Residence24', 'Help using Residence24 accommodation search and listings.', '/help'), component: () => <PageBody title="Help"><p>Search for a room by location, province or institution. Select any accommodation preferences to narrow your results.</p><p>To list a space, select “List Your Space”, sign in, and complete the submission form. Listings appear publicly only after approval.</p><p>For account access, use the <Link to="/login" className="underline">Login page</Link>.</p></PageBody> });
