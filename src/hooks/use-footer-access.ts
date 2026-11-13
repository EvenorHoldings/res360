import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
export type FooterAccess = { signedIn: boolean; staff: boolean; safety: boolean; host: boolean };
const none: FooterAccess = { signedIn: false, staff: false, safety: false, host: false };
/** Footer link visibility from server-checked roles; routes still enforce access themselves. */
export function useFooterAccess() {
  const [access, setAccess] = useState<FooterAccess>(none);
  useEffect(() => {
    let live = true;
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { if (live) setAccess(none); return; }
      const { data } = await supabase.rpc('my_staff_flags');
      const f = (data ?? {}) as Partial<FooterAccess>;
      if (live) setAccess({ signedIn: true, staff: !!f.staff, safety: !!f.safety, host: !!f.host });
    };
    void load();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((e) => { if (e === 'SIGNED_IN' || e === 'SIGNED_OUT') void load(); });
    return () => { live = false; subscription.unsubscribe(); };
  }, []);
  return access;
}
