import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
export type Listing = Tables<'listings'>;
export type SearchFilters = {query?:string;province?:string;institution?:string;maxRent?:number;roomType?:'single'|'sharing'|'studio'|'bachelor';moveIn?:string;maxDistance?:number;nsfas?:boolean;lgbtq?:boolean;pet?:boolean;accessible?:boolean;sort?:string};
export async function searchListings(filters:SearchFilters) {
 const {data,error}=await supabase.rpc('search_listings',{_province:filters.province||undefined,_institution:filters.institution||undefined,_max_rent:filters.maxRent,_room_type:filters.roomType,_move_in:filters.moveIn||undefined,_max_distance:filters.maxDistance,_nsfas:filters.nsfas,_lgbtq:filters.lgbtq,_pet:filters.pet,_accessible:filters.accessible,_sort:filters.sort||'newest'});
 if(error) throw error;
 const query=filters.query?.trim().toLocaleLowerCase();
 return query ? (data??[]).filter(item=>[item.title,item.location,item.description].some(value=>value.toLocaleLowerCase().includes(query))) : data??[];
}
export const zar = new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR',maximumFractionDigits:0});
