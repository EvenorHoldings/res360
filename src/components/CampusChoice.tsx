import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
export type Campus={id:string;name:string;city:string;province:string};
/** Optional campus select, shown only when the chosen institution has several campuses. */
export function CampusChoice({institution,value,onChange,className,labelClassName}:{institution:string;value:string;onChange:(c:Campus|null)=>void;className?:string;labelClassName?:string}){
 const [campuses,setCampuses]=useState<Campus[]>([]);
 useEffect(()=>{let live=true;setCampuses([]);if(!institution)return;
  supabase.from('campuses').select('id,name,cities!inner(name,provinces!inner(name)),institutions!inner(name)').eq('institutions.name',institution).order('name').then(({data})=>{if(!live||!data)return;setCampuses(data.map((c:any)=>({id:c.id,name:c.name,city:c.cities.name,province:c.cities.provinces.name})));});
  return()=>{live=false};},[institution]);
 if(campuses.length<2)return null;
 return <label className={labelClassName}><span className="sr-only">Campus</span><select aria-label="Campus (optional)" value={value} onChange={e=>onChange(campuses.find(c=>c.id===e.target.value)??null)} className={className}><option value="">Any campus</option>{campuses.map(c=><option key={c.id} value={c.id}>{c.name} · {c.city}</option>)}</select></label>;}
