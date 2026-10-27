import { z } from 'zod';
export const readinessSchema = z.object({mandate:z.string().trim().min(10).max(2000),capacity:z.string().regex(/^[1-9][0-9]{0,4}$/),utilities:z.string().trim().min(10).max(2000),safety:z.string().trim().min(10).max(2000),accessibility:z.string().max(2000).default('')});
export const listingDraftSchema=z.object({title:z.string().trim().min(5).max(120),location:z.string().trim().min(2).max(160),province:z.string().min(2),description:z.string().trim().min(20).max(2000),monthly_rent:z.number().nonnegative()});
export function canReview(auditor:string|null,reviewer:string,aal:string){return auditor!==reviewer && aal==='aal2';}
export const auditResults=['pass','fail','not_applicable','not_observed'] as const;
