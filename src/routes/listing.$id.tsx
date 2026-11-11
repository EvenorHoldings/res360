import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { z } from 'zod';
import { AssuranceDetail } from '@/components/assurance/AssuranceDetail';
import { SiteFrame } from '@/components/SiteFrame';
import { RentCalculator } from '@/components/RentCalculator';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { zar, type Listing } from '@/lib/listings';
import { campusDistance, nsfasLabel, petFriendlyAllowed, PRICE_ON_REQUEST, sourceLine } from '@/lib/listing-facts';

export const Route = createFileRoute('/listing/$id')({
  head: () => ({ meta: [
    { title: 'Residence details | Res360' },
    { name: 'description', content: 'Price, deposit, amenities and inclusive features for this Res360 student residence.' },
    { property: 'og:title', content: 'Residence details | Res360' },
    { property: 'og:description', content: 'Price, deposit, amenities and inclusive features for this Res360 student residence.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ListingPage,
});

const enquirySchema = z.object({ message: z.string().trim().min(10, 'Please write at least 10 characters.').max(1000), preferred_move_in: z.string().optional() });

function ListingPage() {
  const { id } = Route.useParams();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);
  const [msg, setMsg] = useState('');
  useEffect(() => { void supabase.from('listings').select('*').eq('id', id).maybeSingle().then(({ data }) => setListing(data)); }, [id]);

  async function enquire(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMsg('Please sign in to request a viewing.'); return; }
    const parsed = enquirySchema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) { setMsg(parsed.error.issues[0]?.message ?? 'Check your details.'); return; }
    const { error } = await supabase.from('enquiries').insert({ listing_id: id, student_id: user.id, message: parsed.data.message, preferred_move_in: parsed.data.preferred_move_in || null });
    setMsg(error ? 'Could not send your request. Please try again.' : 'Viewing request sent to the host.');
    if (!error) e.currentTarget.reset();
  }

  return (
    <SiteFrame>
      <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        {listing === undefined ? <Skeleton className="h-64 rounded-[14px] bg-photo-glass" /> : listing === null ? (
          <div className="rounded-[14px] bg-photo-panel p-8 text-center"><h1 className="text-2xl">Residence not found</h1><Link to="/search" className="mt-3 inline-block underline">Back to search</Link></div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <article className="rounded-[14px] border border-photo-line bg-photo-panel p-6 backdrop-blur-[14px]">
              {listing.image_urls.length > 0 && <div className="mb-4 grid grid-cols-2 gap-2">{listing.image_urls.slice(0, 4).map((src, i) => <img key={src} src={src} alt={`${listing.title} photo ${i + 1}`} width={600} height={400} loading="lazy" className="aspect-[3/2] w-full rounded-lg object-cover" />)}</div>}
              <h1 className="text-3xl">{listing.title}</h1>
              <p className="mt-1">{[listing.suburb, listing.location, listing.province].filter(Boolean).join(', ')}</p>
              {listing.price_on_request?<p className="mt-3 text-lg font-semibold">{PRICE_ON_REQUEST}{listing.source_url&&<> · <a href={listing.source_url} target="_blank" rel="noopener noreferrer" className="underline">Provider page</a></>}</p>:<p className="mt-3 text-2xl font-bold">{zar.format(listing.monthly_rent)} <span className="text-base font-normal">/ month</span></p>}
              <p className="mt-1 text-xs">{sourceLine(listing)}</p>
              <OwnerConfirm listing={listing} onDone={l=>setListing(l)}/>
              {listing.deposit_zar != null && <p className="text-sm">Deposit {zar.format(listing.deposit_zar)}</p>}
              {listing.available_from && <p className="text-sm">Available from {new Date(listing.available_from).toLocaleDateString('en-ZA')}</p>}
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {listing.is_demo && <span className="rounded-full border border-brand-gold px-2 py-1 font-semibold text-brand-gold">Demo</span>}
                {nsfasLabel(listing) && <span className="rounded-full border border-photo-line px-2 py-1">{nsfasLabel(listing)}</span>}
                {listing.lgbtq_friendly && <span className="rounded-full border border-photo-line px-2 py-1">🏳️‍🌈 LGBTQ+ Friendly</span>}
                {petFriendlyAllowed(listing) && <span className="rounded-full border border-photo-line px-2 py-1">🐾 Pet Friendly</span>}
                {listing.accessible && <span className="rounded-full border border-photo-line px-2 py-1">♿ Accessible</span>}
                {listing.institution && <span className="rounded-full border border-photo-line px-2 py-1">Near {listing.institution}{campusDistance(listing) != null ? ` · ${campusDistance(listing)} km` : ''}</span>}
              </div>
              <p className="mt-4 whitespace-pre-line">{listing.description}</p>
              {listing.amenities.length > 0 && <><h2 className="mt-5 text-lg">Amenities</h2><ul className="mt-1 list-disc pl-5 text-sm">{listing.amenities.map((a) => <li key={a}>{a}</li>)}</ul></>}
              <AssuranceDetail listingId={listing.id}/>
              <form onSubmit={enquire} className="mt-6 space-y-3 border-t border-photo-line pt-5">
                <h2 className="text-lg">Request viewing</h2>
                <label className="block text-sm">Message<textarea name="message" required maxLength={1000} className="mt-1 min-h-24 w-full rounded-md bg-photo-foreground p-3 text-photo-ink" /></label>
                <label className="block text-sm">Preferred move-in<input name="preferred_move_in" type="date" className="mt-1 min-h-11 w-full rounded-md bg-photo-foreground px-3 text-photo-ink" /></label>
                <Button type="submit" className="rounded-full bg-photo-action text-photo-ink hover:bg-photo-action/90">Send request</Button>
                <p role="status" className="text-sm">{msg} {msg.startsWith('Please sign in') && <Link to="/login" className="underline">Sign in</Link>}</p>
              </form>
            </article>
            <RentCalculator initialRent={listing.monthly_rent} />
          </div>
        )}
      </main>
    </SiteFrame>
  );
}

function OwnerConfirm({ listing, onDone }: { listing: Listing; onDone: (l: Listing) => void }) {
  const [mine, setMine] = useState(false); const [note, setNote] = useState('');
  useEffect(() => { void supabase.auth.getUser().then(({ data }) => setMine(!!data.user && data.user.id === listing.owner_id)); }, [listing.owner_id]);
  if (!mine || listing.is_demo) return null;
  async function confirm() {
    const { error } = await supabase.rpc('confirm_listing_available', { _listing: listing.id });
    if (error) { setNote('Could not confirm right now. Please try again.'); return; }
    const { data } = await supabase.from('listings').select('*').eq('id', listing.id).maybeSingle();
    if (data) onDone(data); setNote('Thanks. Your listing is confirmed for another 30 days.');
  }
  return <div className="mt-3 rounded-lg border border-photo-line p-3 text-sm">{listing.status === 'stale' ? 'This listing is hidden from search until you confirm it is still available.' : 'Listings are hidden after 30 days unless you confirm they are still available.'} <Button type="button" size="sm" variant="outline" onClick={confirm} className="ml-2">Confirm still available</Button><p role="status" className="mt-1">{note}</p></div>;
}
