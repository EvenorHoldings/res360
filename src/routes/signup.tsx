import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { signupSchema } from '@/lib/signup-schema';
import { PageBody } from '@/components/SiteFrame';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { pageHead } from '@/lib/page-head';
import { AltSignIn } from '@/components/AltSignIn';

export const Route = createFileRoute('/signup')({
  head: () => pageHead('Sign up | Res360', 'Create a free Res360 account. Use your .ac.za email to become Student Verified.', '/signup'),
  component: Signup,
});



function Signup() {
  const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false); const [role, setRole] = useState<'student' | 'host'>('student');
  const [sentTo, setSentTo] = useState(''); const [pw, setPw] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = signupSchema.safeParse({ ...Object.fromEntries(new FormData(e.currentTarget)), role });
    if (!parsed.success) { setMsg(parsed.error.issues[0]?.message ?? 'Check your details.'); return; }
    setBusy(true);
    const d = parsed.data;
    const { error } = await supabase.auth.signUp({ email: d.email, password: d.password, options: { emailRedirectTo: window.location.origin, data: { full_name: d.full_name, signup_role: d.role, terms_accepted: true, age_confirmed: true, marketing_opt_in: d.marketing === 'on' } } });
    setBusy(false);
    if (error) setMsg(error.message); else { setMsg(''); setSentTo(d.email); }
  }
  async function resend() { setBusy(true); const { error } = await supabase.auth.resend({ type: 'signup', email: sentTo, options: { emailRedirectTo: window.location.origin } }); setBusy(false); setMsg(error ? error.message : 'We sent the email again.'); }
  const input = 'mt-1 min-h-11 w-full rounded-md bg-photo-foreground px-3 text-photo-ink';
  if (sentTo) return <PageBody title="Check your email"><p>We sent a verification link to <strong>{sentTo}</strong>. Open it to finish creating your account. .ac.za addresses become Student Verified after confirmation.</p><Button type="button" disabled={busy} onClick={resend} className="rounded-full bg-photo-action text-photo-ink hover:bg-photo-action/90">{busy ? 'Sending…' : 'Resend email'}</Button><p role="status" className="text-sm">{msg}</p><p className="text-sm"><Link to="/login" className="underline">Back to log in</Link></p></PageBody>;
  return <PageBody title="Create your account">
    <form onSubmit={submit} className="max-w-sm space-y-3">
      <div role="group" aria-label="Account type" className="grid grid-cols-2 rounded-md border border-border p-1">{([['student', "I'm a student"], ['host', "I'm a host"]] as const).map(([v, l]) => <Button key={v} type="button" variant="ghost" aria-pressed={role === v} onClick={() => setRole(v)} className={`min-h-11 rounded-sm ${role === v ? 'bg-brand-navy text-brand-on-dark hover:bg-brand-navy/90 hover:text-brand-on-dark' : ''}`}>{l}</Button>)}</div>
      <label className="block text-sm">Full name<input name="full_name" autoComplete="name" required className={input} /></label>
      <label className="block text-sm">Email<input name="email" type="email" autoComplete="email" required className={input} /></label>
      <label className="block text-sm">Password<input name="password" type="password" autoComplete="new-password" required minLength={10} value={pw} onChange={e => setPw(e.target.value)} aria-describedby="pw-hint" className={input} /></label>
      <p id="pw-hint" className="text-xs text-muted-foreground">{pw.length >= 10 ? 'Length looks good. ' : `At least 10 characters (${pw.length}/10). `}Passwords found in known data breaches are rejected.</p>
      <label className="flex min-h-11 items-start gap-2 text-sm"><input type="checkbox" name="terms" required className="mt-1 h-4 w-4" /><span>I agree to the <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link></span></label>
      <label className="flex min-h-11 items-start gap-2 text-sm"><input type="checkbox" name="age" required className="mt-1 h-4 w-4" /><span>I am 18 or older, or I have a parent or guardian's consent</span></label>
      <label className="flex min-h-11 items-start gap-2 text-sm"><input type="checkbox" name="marketing" className="mt-1 h-4 w-4" /><span>Send me occasional Res360 news (optional)</span></label>
      <Button type="submit" disabled={busy} className="w-full rounded-full bg-photo-action text-photo-ink hover:bg-photo-action/90">{busy ? 'Creating…' : 'Sign up'}</Button>
      <p role="status" className="text-sm">{msg}</p>
      <p className="text-sm">Already have an account? <Link to="/login" className="underline">Log in</Link></p>
    </form>
    <AltSignIn />
  </PageBody>;
}
