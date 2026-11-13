import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { lovable } from '@/integrations/lovable';
import { supabase } from '@/integrations/supabase/client';
import { useFeatureFlags } from '@/hooks/use-feature-flag';

const KEYS = ['google_signin', 'microsoft_signin', 'magic_link'] as const;

export function friendlyOAuthError(message: string) {
  if (/admin|consent|approval|AADSTS65001|AADSTS90094/i.test(message)) {
    return 'Your university needs an administrator to approve Res360 before you can sign in with Microsoft. Sign in with email instead, then verify your student status with your .ac.za address.';
  }
  return message;
}

/** Extra sign-in options; each renders only when its feature flag is on. */
export function AltSignIn({ email }: { email?: string }) {
  const flags = useFeatureFlags(KEYS);
  const [msg, setMsg] = useState(''); const [err, setErr] = useState(false); const [busy, setBusy] = useState(false);
  if (!flags['google_signin'] && !flags['microsoft_signin'] && !flags['magic_link']) return null;
  const say = (m: string, e = false) => { setMsg(m); setErr(e); };
  async function oauth(provider: 'google' | 'microsoft') {
    setBusy(true); say('');
    const r = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
    setBusy(false);
    if (r.error) say(friendlyOAuthError(r.error.message ?? String(r.error)), true);
  }
  async function magic() {
    if (!email) { say('Enter your email above first.', true); return; }
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: window.location.origin } });
    setBusy(false);
    say(error ? error.message : 'If an account exists for that email, we have sent a sign-in link.', Boolean(error));
  }
  const btn = 'w-full rounded-full bg-photo-action text-photo-ink hover:bg-photo-action/90';
  return <div className="max-w-sm space-y-3 pt-2">
    {flags['google_signin'] && <Button type="button" disabled={busy} onClick={() => oauth('google')} className={btn}>Continue with Google</Button>}
    {flags['microsoft_signin'] && <Button type="button" disabled={busy} onClick={() => oauth('microsoft')} className={btn}>Continue with Microsoft (university account)</Button>}
    {flags['magic_link'] && <p><Button type="button" variant="link" disabled={busy} onClick={magic} className="h-auto px-0 text-photo-foreground underline">Email me a sign-in link</Button></p>}
    {msg && <p role={err ? 'alert' : 'status'} className={err ? 'text-destructive text-sm' : 'text-sm'}>{msg}</p>}
  </div>;
}
