/** Removes emails, SA phone numbers and 13-digit ID numbers before storage or model calls. */
export const redact = (t: string) => t
  .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '[email]')
  .replace(/(?:\+27|0)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}/g, '[phone]')
  .replace(/\b\d{13}\b/g, '[id-number]');
const SAFETY = /\b(danger|unsafe|assault|attack(ed)?|rape|raped|abuse[ds]?|threat(en(ed)?)?|violen(ce|t)|stalk(ing|ed)?|harass(ed|ment)?|kill|suicid(e|al)|weapon|gun|knife|fire|emergency|help me)\b/i;
/** Fast keyword screen so a possible safety message is escalated before the end-of-chat summary. */
export const looksLikeSafety = (t: string) => SAFETY.test(t);
