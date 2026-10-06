import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { PageBody } from '@/components/SiteFrame';
import { ListingCard } from '@/components/ListingCard';
import { supabase } from '@/integrations/supabase/client';
import type { Listing } from '@/lib/listings';
import { pageHead } from '@/lib/page-head';

export const Route = createFileRoute('/saved')({
  head: () => pageHead('Saved residences | Res360', 'Residences you have saved on Res360.', '/saved'),
  component: SavedPage,
});

function SavedPage() {
  const [rows, setRows] = useState<Listing[] | null>(null);
  const [signedIn, setSignedIn] = useState(true);
  useEffect(() => { void (async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSignedIn(false); return; }
    const { data } = await supabase.from('saved_listings').select('listing_id, listings(*)').eq('user_id', user.id);
    setRows((data ?? []).map((r) => r.listings).filter(Boolean) as Listing[]);
  })(); }, []);
  return <PageBody title="Saved residences">
    {!signedIn ? <p><Link to="/login" className="underline">Sign in</Link> to see your saved residences.</p>
      : rows === null ? <p>Loading…</p>
      : rows.length === 0 ? <p>Nothing saved yet. <Link to="/search" className="underline">Find a room</Link>.</p>
      : <div className="grid gap-4 sm:grid-cols-2">{rows.map((l) => <ListingCard key={l.id} listing={l} />)}</div>}
  </PageBody>;
}
