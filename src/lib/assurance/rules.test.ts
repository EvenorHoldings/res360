import { describe, expect, test } from 'bun:test';
import { canReview, readinessSchema, auditResults } from './rules';
describe('Residence assurance rules',()=>{
 test('auditors cannot review their own inspections',()=>expect(canReview('auditor','auditor','aal2')).toBe(false));
 test('independent reviewers require MFA',()=>{expect(canReview('auditor','reviewer','aal1')).toBe(false);expect(canReview('auditor','reviewer','aal2')).toBe(true);});
 test('capacity and disclosures are required before readiness submission',()=>{expect(readinessSchema.safeParse({mandate:'',capacity:'0',utilities:'',safety:''}).success).toBe(false);expect(readinessSchema.safeParse({mandate:'Authority to list confirmed',capacity:'12',utilities:'Prepaid electricity and stored water',safety:'Fire exits and access controls disclosed'}).success).toBe(true);});
 test('inspection supports all four required observations',()=>expect([...auditResults]).toEqual(['pass','fail','not_applicable','not_observed']));
});