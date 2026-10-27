import { z } from 'zod';
export const categories=['urgent_danger','fire_electrical','water_sanitation','overcrowding','harassment_threat','billing_lease','accessibility','other'] as const;
export const concernSchema=z.object({listingId:z.string().uuid().optional(),category:z.enum(categories),description:z.string().trim().min(10).max(4000),contact:z.string().trim().max(250).optional(),sharingScope:z.enum(['safety_staff_only','redacted_response_permitted']),consent:z.literal(true)});
export function urgency(category:string){return ['urgent_danger','fire_electrical','harassment_threat'].includes(category)?'critical':['water_sanitation','overcrowding'].includes(category)?'high':'normal';}
export function officialLabel(type:string,authority:string,status:string){if(status==='expired')return `Expired confirmation · ${authority}`;return type==='accreditation'?`Official status confirmed by ${authority}`:`${type.replaceAll('_',' ')} checked by ${authority}`;}
