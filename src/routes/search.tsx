import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { SiteFrame } from '@/components/SiteFrame';
import { SearchForm } from '@/components/SearchForm';
import { ListingCard } from '@/components/ListingCard';
import { Skeleton } from '@/components/ui/skeleton';
import { searchListings, type Listing, type SearchFilters } from '@/lib/listings';
import { pageHead } from '@/lib/page-head';

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
  async function run(next: SearchFilters, nextSort = sort) {
    setFilters(next); setBusy(true); setError('');
    try { setRows(await searchListings({ ...next, sort: nextSort })); } catch { setError('Search is unavailable right now. Please try again.'); setRows([]); }
    setBusy(false);
  }
  return (
    <SiteFrame>
      <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl">Find a room</h1>
        <SearchForm onSearch={(f) => run(f)} busy={busy} />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm">{error || (rows ? `${rows.length} ${rows.length === 1 ? 'residence' : 'residences'} found` : 'Choose filters and search to see residences.')}</p>
          <label className="text-sm">Sort by{' '}
            <select value={sort} onChange={(e) => { setSort(e.target.value); if (rows) void run(filters, e.target.value); }} className="ml-1 min-h-11 rounded-full bg-photo-foreground px-3 text-photo-ink">
              <option value="newest">Newest</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="distance">Distance to campus</option>
            </select>
          </label>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {busy ? Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-44 rounded-[14px] bg-photo-glass" />) : rows?.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
        {!busy && rows?.length === 0 && !error && <p className="mt-8 rounded-[14px] border border-photo-line bg-photo-panel p-6 text-center">No residences match yet. Try fewer filters or another province.</p>}
      </main>
    </SiteFrame>
  );
}
