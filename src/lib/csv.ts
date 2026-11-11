/** Minimal RFC-4180 CSV parser (quoted fields, escaped quotes, CRLF). */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = []; let row: string[] = []; let f = ''; let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(f); f = ''; if (row.some(v => v.trim())) rows.push(row); row = []; }
    else f += c;
  }
  row.push(f); if (row.some(v => v.trim())) rows.push(row);
  const [head, ...body] = rows; if (!head) return [];
  const keys = head.map(h => h.trim().toLowerCase());
  return body.map(r => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? '').trim()])));
}
export const DIRECTORY_COLUMNS = ['institution','campus','name','residence_type','address','lat','lng','price_from_zar','beds','nsfas_accredited','source_url','last_checked_at','confidence'] as const;
export const RESIDENCE_TYPES = ['university_res','university_leased','private_student_res','landlord_room','shared_house'] as const;
const leasedUkzn = new Set(['Ambassador Residence','Absa Residence','Welkom Residence','Alex Residence','YMCA','LTI Residence','Dulwich Residence']);
/** Only allow directory fields; personal contact columns never leave the browser. */
export function prepareDirectoryRows(rows: Record<string,string>[]): Record<string,string>[] {
  return rows.map(row => {
    const clean = Object.fromEntries([...DIRECTORY_COLUMNS, 'notes'].map(k => [k, (row[k] ?? '').replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '[removed]').replace(/(?:\+27|\b0)[ ()-]*\d{2}[ ()-]*\d{3}[ ()-]*\d{4}\b/g, '[removed]')]));
    if (clean['institution'] === 'University of KwaZulu-Natal' && clean['campus'] === 'Pietermaritzburg' && leasedUkzn.has(clean['name'] ?? '')) clean['residence_type'] = 'university_leased';
    return clean;
  });
}
