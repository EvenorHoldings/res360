import type { Listing } from '@/lib/listings';

// Approximate centres used when a listing has no exact coordinates.
const PROVINCE_CENTRES: Record<string, [number, number]> = {
  'Eastern Cape': [-33.96, 25.6], 'Free State': [-29.12, 26.21], Gauteng: [-26.2, 28.04],
  'KwaZulu-Natal': [-29.86, 31.02], Limpopo: [-23.9, 29.45], Mpumalanga: [-25.47, 30.97],
  'Northern Cape': [-28.74, 24.77], 'North West': [-26.69, 27.09], 'Western Cape': [-33.93, 18.42],
};

export type MapPoint = { listing: Listing; lat: number; lng: number; approximate: boolean };

function jitter(id: string) {
  let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) | 0;
  return [((h & 0xff) / 255 - 0.5) * 0.06, (((h >> 8) & 0xff) / 255 - 0.5) * 0.06] as const;
}

export function toMapPoints(rows: Listing[]): MapPoint[] {
  return rows.flatMap((l): MapPoint[] => {
    if (l.lat != null && l.lng != null) return [{ listing: l, lat: l.lat, lng: l.lng, approximate: false }];
    const c = PROVINCE_CENTRES[l.province];
    if (!c) return [];
    const [dy, dx] = jitter(l.id);
    return [{ listing: l, lat: c[0] + dy, lng: c[1] + dx, approximate: true }];
  });
}
