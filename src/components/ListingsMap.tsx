import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapPoint } from '@/lib/geo';
import { zar } from '@/lib/listings';

// Browser-only: load via React.lazy behind <ClientOnly>.
export default function ListingsMap({ points, onSelect }: { points: MapPoint[]; onSelect?: (id: string) => void }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!el.current || map.current) return;
    map.current = L.map(el.current, { scrollWheelZoom: false }).setView([-29, 25], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map.current);
    layer.current = L.layerGroup().addTo(map.current);
    return () => { map.current?.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    if (!map.current || !layer.current) return;
    layer.current.clearLayers();
    for (const p of points) {
      const marker = L.circleMarker([p.lat, p.lng], { radius: 9, color: '#0B3C5D', weight: 2, fillColor: '#12B5A6', fillOpacity: 0.9 });
      const div = document.createElement('div');
      const title = document.createElement('strong'); title.textContent = p.listing.title;
      const price = document.createElement('div'); price.textContent = `${zar.format(p.listing.monthly_rent)} / month`;
      const where = document.createElement('div'); where.textContent = [p.listing.suburb, p.listing.location, p.listing.province].filter(Boolean).join(', ');
      const link = document.createElement('a'); link.href = `/listing/${p.listing.id}`; link.textContent = 'View residence';
      div.append(title, price, where);
      if (p.approximate) { const n = document.createElement('em'); n.textContent = 'Approximate location'; div.append(n); }
      div.append(link);
      marker.bindPopup(div);
      marker.on('click', () => onSelect?.(p.listing.id));
      marker.addTo(layer.current);
    }
    if (points.length > 0) map.current.fitBounds(L.latLngBounds(points.map((p) => [p.lat, p.lng])), { padding: [40, 40], maxZoom: 13 });
  }, [points, onSelect]);

  return <div ref={el} role="region" aria-label="Map of residences" className="h-[420px] w-full overflow-hidden rounded-[14px] border border-photo-line text-photo-ink" />;
}
