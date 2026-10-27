import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
export type Listing = Tables<'listings'>;
export type RoomType = 'single' | 'sharing' | 'studio' | 'bachelor';
export type SearchFilters = { query?: string; province?: string; city?:string; institutionType?:string; institution?: string; maxRent?: number; roomType?: RoomType | undefined; moveIn?: string; maxDistance?: number | undefined; nsfas?: boolean; lgbtq?: boolean; pet?: boolean; accessible?: boolean; sort?: string };

export async function searchListings(filters: SearchFilters) {
  const args:Record<string,string>={};
  if(filters.province)args['_province']=filters.province;
  if(filters.city)args['_city']=filters.city;
  if(filters.institution)args['_institution']=filters.institution;
  if(filters.institutionType)args['_type']=filters.institutionType;
  if(filters.query?.trim())args['_query']=filters.query.trim();
  const {data,error}=await supabase.rpc('search_location_listings',args);
  if(error)throw error;
  const rows=(data??[]) as Listing[];
  const filtered=rows.filter(l=>(filters.maxRent==null||l.monthly_rent<=filters.maxRent)&&(!filters.roomType||l.room_type===filters.roomType)&&(!filters.moveIn||!l.available_from||l.available_from<=filters.moveIn)&&(filters.maxDistance==null||(l.distance_km!=null&&l.distance_km<=filters.maxDistance))&&(!filters.nsfas||l.nsfas_accredited)&&(!filters.lgbtq||l.lgbtq_friendly)&&(!filters.pet||l.pet_friendly)&&(!filters.accessible||l.accessible));
  if(filters.sort==='price_asc')filtered.sort((a,b)=>a.monthly_rent-b.monthly_rent);
  if(filters.sort==='price_desc')filtered.sort((a,b)=>b.monthly_rent-a.monthly_rent);
  if(filters.sort==='distance')filtered.sort((a,b)=>(a.distance_km??Infinity)-(b.distance_km??Infinity));
  return filtered.slice(0,60);
}
export const zar = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 });
