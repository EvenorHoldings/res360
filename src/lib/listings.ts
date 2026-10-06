import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
export type Listing = Tables<'listings'>;
export type RoomType = 'single' | 'sharing' | 'studio' | 'bachelor';
export type SearchFilters = { query?: string; province?: string; institution?: string; maxRent?: number; roomType?: RoomType | undefined; moveIn?: string; maxDistance?: number | undefined; nsfas?: boolean; lgbtq?: boolean; pet?: boolean; accessible?: boolean; sort?: string };

export async function searchListings(filters: SearchFilters) {
  const args: Record<string, string | number | boolean> = { _sort: filters.sort || 'newest' };
  if (filters.province) args["_province"] = filters.province;
  if (filters.institution) args["_institution"] = filters.institution;
  if (filters.maxRent) args["_max_rent"] = filters.maxRent;
  if (filters.roomType) args["_room_type"] = filters.roomType;
  if (filters.moveIn) args["_move_in"] = filters.moveIn;
  if (filters.maxDistance) args["_max_distance"] = filters.maxDistance;
  if (filters.nsfas) args["_nsfas"] = true;
  if (filters.lgbtq) args["_lgbtq"] = true;
  if (filters.pet) args["_pet"] = true;
  if (filters.accessible) args["_accessible"] = true;
  const { data, error } = await supabase.rpc('search_listings', args as never);
  if (error) throw error;
  const rows = (data ?? []) as Listing[];
  const query = filters.query?.trim().toLocaleLowerCase();
  return query ? rows.filter((item) => [item.title, item.location, item.suburb ?? '', item.description].some((v) => v.toLocaleLowerCase().includes(query))) : rows;
}
export const zar = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 });
