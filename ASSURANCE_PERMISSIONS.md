# Phase 2 permissions and readiness

| Actor | Access |
|---|---|
| Signed-out visitor | Existing public search; private workspaces redirect to login. |
| Residence owner | Own private listing drafts, readiness disclosures, document metadata, inspection results and corrective-action responses/appeals. No approval authority. |
| Assigned auditor with MFA | Assigned active inspection capture and submission; no independent review of their own findings. |
| Reviewer / administrator with MFA | Operational records and independent review, readiness decisions and corrective-action decisions. Readiness approval does not publish a listing. |
| Trusted scan service | Virus-scan result; browser users cannot mark files clean. |

Workflow functions verify caller identity, ownership or staff role inside the database. RLS continues to govern direct client access. Evidence downloads require a clean scan and use 60-second signed access; unscanned files remain quarantined. Checklist items used by an inspection are immutable and changes require a new version.

## Verified this round

- Four concrete rule tests pass (self-review, MFA, submission completeness, inspection observations).
- Generated schema includes readiness fields; preview compilation passes.
- Signed-out portfolio and operations navigation both redirect to login without browser errors.
- Database security scan no longer flags draft templates/items; the earlier public reviews warning remains.

## Not verified or not enabled

- Authenticated create/save/resume/upload/audit/review flow: requesting account session could not be minted. User sign-in is needed before testing this flow.
- No validated published checklist exists, so scheduling remains disabled.
- Virus-scanning service is unconfigured: uploads are private but cannot be opened or approved.
- No safe offline sync: capture is explicitly online-only.
- No live subscriptions or automated expiry notifications yet; queues refresh on command and successful writes.
- Reviewer portfolios are not province/programme scoped in the existing foundation; reviewer permissions currently span operational residence records.
- No public scores, student reports UI, emergency service promises or deployment were added.