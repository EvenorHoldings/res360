import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { PageBody } from '@/components/SiteFrame';
import { pageHead } from '@/lib/page-head';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/privacy')({ head: () => pageHead('Privacy Policy | Res360', 'How Res360 handles personal information under POPIA.', '/privacy'), component: Privacy });

function Privacy() {
  const [officer, setOfficer] = useState<{ name?: string | null; email?: string | null }>({});
  useEffect(() => { void supabase.rpc('information_officer').then(({ data }) => setOfficer((data ?? {}) as typeof officer)); }, []);
  return <PageBody title="Privacy Policy">
    <p>Res360 (formerly Residence24) operates this site and is the responsible party for personal information collected through it under South Africa’s Protection of Personal Information Act (POPIA).</p>
    <h2 className="text-xl font-bold">Information Officer</h2>
    <p>{officer.name || 'Information Officer, Res360'}{' · '}{officer.email ? <a href={`mailto:${officer.email}`} className="underline">{officer.email}</a> : <Link to="/contact" className="underline">Contact us</Link>}</p>
    <h2 className="text-xl font-bold">What we collect</h2>
    <ul className="list-disc space-y-1 pl-5"><li>Your name and email address.</li><li>Your password, stored only as a secure one-way hash.</li><li>Your phone number, if you choose to give it.</li><li>Listing details you submit: description, location, price, photos and features.</li><li>Messages you send to the Res360 assistant.</li><li>Safety reports and any contact details you add to them.</li><li>Your consent choices, including whether you want marketing messages.</li></ul>
    <p>We use this information to run your account, accommodation search, listing review, the assistant and safety reporting. Only approved listing details are shown publicly. Pending submissions are visible only to their owner and authorised reviewers. We do not sell personal information.</p>
    <p>You may ask to access, correct or delete your personal information by contacting the Information Officer. We may keep information where the law or a safety investigation requires it. We use service providers to host and secure the site and take reasonable steps to protect your information.</p>
    <h2 className="text-xl font-bold">Site analytics</h2>
    <p>Lovable, which hosts this site's analytics, records the pages visited, where visitors came from, their country, browser, operating system and device type, how long they stay, how fast pages load, errors, and which buttons and links are clicked. This is recorded for every visitor. It uses no cookies, stores nothing on your device, does not keep IP addresses and does not identify you. Detailed data is kept for 90 days and daily summaries for a year. Lovable collects this data for us. <a href="https://lovable.dev/privacy" className="underline" target="_blank" rel="noopener noreferrer">Lovable's privacy policy</a> explains how it handles it.</p>
    <p>Signing in uses our account service, which stores a sign-in session in your browser so you stay logged in. Maps on the search page load map tiles from OpenStreetMap, which receives your IP address when tiles load.</p>
    <h2 className="text-xl font-bold">Private residence concerns · Notice 27 October 2026</h2>
    <p>Concern descriptions and optional contact details are encrypted and used only to investigate and respond to your report. Assigned Res360 safety staff must complete two-step verification to open them. Original reports are not shared with landlords or published. Optional permission to prepare a redacted provider response does not authorise sharing your identity.</p>
    <p>You can see your own case status after signing in. Res360 is not an emergency service and does not monitor reports around the clock; in an emergency, contact SAPS on 10111.</p>
    <h2 className="mt-6 text-xl font-semibold">Assistant chats and deleting your data</h2>
    <p>Messages to the Res360 assistant are stored with email addresses, phone numbers and ID numbers removed. Chat messages are deleted after 90 days and issue summaries after 12 months. To ask us to delete your data sooner, use the <Link to="/contact" className="underline">Contact page</Link> with the subject "Delete my data". Include the email address on your account if you have one.</p>
  </PageBody>;
}
