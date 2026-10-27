<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use TanStack file routes and shared SiteFrame for public pages rather than React Router; this preserves the project's SSR router and consistent site navigation.
- Public listings are read through RLS and submissions are owner-scoped pending rows; this keeps unapproved accommodation off public search.
- AI listing recommendations run in a server function (src/lib/ai/*.server.ts) that reads only approved listings and validates returned ids; this keeps the AI key server-side and prevents invented listings.
- Search map uses Leaflet + OpenStreetMap, lazy-loaded client-only, falling back to province centres when a listing lacks coordinates; Leaflet cannot run during server rendering.
- Assurance workspaces live under the authenticated layout and use the existing browser client with RLS and narrowly scoped database workflow functions; this keeps owners isolated and staff mutations MFA-checked.
- Audit capture is online-only and evidence is quarantined until a trusted scan marks it clean; this prevents unsafe offline overwrites and unscanned document access.
- Safety reports use authenticated server functions and versioned AES-GCM ciphertext bound to reporter identity; only assigned MFA safety managers can decrypt, with metadata-only triage and reporter status projections.
- Public assurance details use a narrow approved-listing RPC projection; never infer verification from landlord IDs or unconfirmed accreditation flags.
