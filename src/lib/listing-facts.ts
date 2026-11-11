import type { Listing } from '@/lib/listings';
type Facts = Pick<Listing,'is_demo'|'price_on_request'|'nsfas_accredited'|'nsfas_verified'|'source'|'source_url'|'last_confirmed_at'|'published_at'|'created_at'|'distance_to_campus_km'|'distance_km'>;
/** NSFAS wording may only say "accredited" when staff verified it. */
export function nsfasLabel(l: Facts): string | null {
  if (l.nsfas_verified) return 'NSFAS-accredited';
  if (l.nsfas_accredited) return 'NSFAS: host-declared';
  return null;
}
export const PRICE_ON_REQUEST = 'Contact the provider for fees and availability';
const SOURCE: Record<string, string> = { host_submitted: 'Submitted by the host', institution_directory: 'Institution directory', admin_import: 'Res360 directory import', demo: 'Demo data' };
export function sourceLine(l: Facts): string {
  const d = l.last_confirmed_at ?? l.published_at ?? l.created_at;
  return `Source: ${SOURCE[l.source] ?? l.source} · Last checked ${new Date(d).toLocaleDateString('en-ZA')}`;
}
export function campusDistance(l: Facts): number | null { return l.distance_to_campus_km ?? l.distance_km ?? null; }
