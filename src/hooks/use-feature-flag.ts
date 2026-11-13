import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/** Reads a row from public.feature_flags; anything missing or failing counts as OFF. */
export function useFeatureFlags(keys: readonly string[]) {
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const joined = keys.join(',');
  useEffect(() => {
    let live = true;
    supabase.from('feature_flags').select('key, enabled').in('key', joined.split(',')).then(({ data }) => {
      if (live && data) setFlags(Object.fromEntries(data.map((r) => [r.key, r.enabled === true])));
    });
    return () => { live = false; };
  }, [joined]);
  return flags;
}
