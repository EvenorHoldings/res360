import { createFileRoute } from '@tanstack/react-router';
import { PageBody } from '@/components/SiteFrame';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/about')({ head: () => pageHead('About | Residence24', 'Learn about Residence24 student accommodation in South Africa.', '/about'), component: () => <PageBody title="About Residence24"><p>Residence24 helps students find accommodation across South Africa. Search by location, province or institution and compare approved listings that fit your needs.</p><p>Property owners can submit a space for review before it appears in search results.</p></PageBody> });
