import { institutionsFor, citiesFor, PROVINCES, type InstitutionType } from '@/data/institution-catalog';
import { OTHER_COLLEGE } from '@/data/institutions';
export function InstitutionChoices({province,city='',type=''}:{province:string;city?:string;type?:string}){const entries=institutionsFor(province,city,type);return <>{(['Public University','TVET College','Private Institution'] as InstitutionType[]).map(t=><optgroup key={t} label={t}>{Array.from(new Set(entries.filter(i=>i.type===t).map(i=>i.name))).sort().map(n=><option key={n} value={n}>{n}{entries.find(i=>i.name===n)?.national?' · National / distance':''}</option>)}</optgroup>)}<option value={OTHER_COLLEGE}>{OTHER_COLLEGE}</option></>;}
export function CityChoices({province}:{province:string}){return <>{citiesFor(province).map(c=><option key={c}>{c}</option>)}</>;}
export { PROVINCES };
