import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense, useMemo, useState } from 'react';
import { AiMatcher } from '@/components/AiMatcher';
import { toMapPoints } from '@/lib/geo';
import { SiteFrame } from '@/components/SiteFrame';
import { SearchForm } from '@/components/SearchForm';
import { ListingCard } from '@/components/ListingCard';
import { Skeleton } from '@/components/ui/skeleton';
import { searchListings, type Listing, type SearchFilters } from '@/lib/listings';
import { pageHead } from '@/lib/page-head';

const ListingsMap = lazy(() => import('@/components/ListingsMap'));

export const Route = createFileRoute('/search')({
  head: () => pageHead('Find a room | Res360', 'Search approved student accommodation by province, campus, price and inclusive features.', '/search'),
  component: SearchPage,
});

function SearchPage() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sort, setSort] = useState('newest');
  const [rows, setRows] = useState<Listing[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<'list' | 'map'>('list');
  const points = useMemo(() => toMapPoints(rows ?? []), [rows]);
  async function run(next: SearchFilters, nextSort = sort) {
    setFilters(next); setBusy(true); setError('');
    try { setRows(await searchListings({ ...next, sort: nextSort })); } catch { setError('Search is unavailable right now. Please try again.'); setRows([]); }
    setBusy(false);
  }
  return (
    <SiteFrame>
      <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl">Find a room</h1>
        <AiMatcher />
        <SearchForm onSearch={(f) => run(f)} busy={busy} />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm">{error || (rows ? `${rows.length} ${rows.length === 1 ? 'residence' : 'residences'} found` : 'Choose filters and search to see residences.')}</p>
          <div className="flex flex-wrap items-center gap-3"><div role="group" aria-label="Results view" className="inline-flex rounded-full border border-photo-line bg-photo-glass p-1">{(['list', 'map'] as const).map((v) => <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={`min-h-9 rounded-full px-4 text-sm ${view === v ? 'bg-photo-foreground text-photo-ink' : ''}`}>{v === 'list' ? 'List' : 'Map'}</button>)}</div>
          <label className="text-sm">Sort by{' '}
            <select value={sort} onChange={(e) => { setSort(e.target.value); if (rows) void run(filters, e.target.value); }} className="ml-1 min-h-11 rounded-full bg-photo-foreground px-3 text-photo-ink">
              <option value="newest">Newest</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="distance">Distance to campus</option>
            </select>
          </label></div>
        </div>
        {view === 'map' && !busy && <div className="mt-6"><ClientOnly fallback={<Skeleton className="h-[420px] rounded-[14px] bg-photo-glass" />}><Suspense fallback={<Skeleton className="h-[420px] rounded-[14px] bg-photo-glass" />}><ListingsMap points={points} /></Suspense></ClientOnly>{rows && points.some((p) => p.approximate) && <p className="mt-2 text-xs opacity-75">Some pins show the province centre because the host has not set an exact location.</p>}{!rows && <p className="mt-2 text-sm">Search to place residences on the map.</p>}</div>}
        <div className={`mt-6 grid gap-4 ${view === 'map' ? 'sm:grid-cols-2 lg:grid-cols-3' : ''} sm:grid-cols-2 lg:grid-cols-3`}>
          {busy ? Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-44 rounded-[14px] bg-photo-glass" />) : rows?.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
        {!busy && rows?.length === 0 && !error && <p className="mt-8 rounded-[14px] border border-photo-line bg-photo-panel p-6 text-center">No residences match yet. Try fewer filters or another province.</p>}
      </main>
    </SiteFrame>
  );
}
