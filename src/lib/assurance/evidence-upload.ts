// Fail closed until the trusted scanner and its quarantine workflow are deployed.
export const EVIDENCE_UPLOADS_ENABLED = false;

export function requireEvidenceUploads() {
  if (!EVIDENCE_UPLOADS_ENABLED) {
    throw new Error('Document uploads are blocked until virus checking is set up.');
  }
}