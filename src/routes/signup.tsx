import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { z } from 'zod';
import { PageBody } from '@/components/SiteFrame';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { pageHead } from '@/lib/page-head';

export const Route = createFileRoute('/signup')({
  head: () => pageHead('Sign up | Res360', 'Create a free Res360 account. Use your .ac.za email to become Student Verified.', '/signup'),
  component: Signup,
});

const schema = z.object({ full_name: z.string().trim().min(2, 'Enter your name.').max(100), email: z.string().trim().email('Enter a valid email.').max(255), password: z.string().min(8, 'Password must be at least 8 characters.').max(72) });

function Signup() {
  const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) { setMsg(parsed.error.issues[0]?.message ?? 'Check your details.'); return; }
    setBusy(true);
    const { error } = await supabase.auth.signUp({ email: parsed.data.email, password: parsed.data.password, options: { emailRedirectTo: window.location.origin, data: { full_name: parsed.data.full_name } } });
    setBusy(false);
    setMsg(error ? error.message : 'Check your inbox to confirm your email. .ac.za addresses become Student Verified after confirmation.');
  }
  const input = 'mt-1 min-h-11 w-full rounded-md bg-photo-foreground px-3 text-photo-ink';
  return <PageBody title="Create your account">
    <form onSubmit={submit} className="max-w-sm space-y-3">
      <label className="block text-sm">Full name<input name="full_name" autoComplete="name" required className={input} /></label>
      <label className="block text-sm">Email<input name="email" type="email" autoComplete="email" required className={input} /></label>
      <label className="block text-sm">Password<input name="password" type="password" autoComplete="new-password" required minLength={8} className={input} /></label>
      <Button type="submit" disabled={busy} className="w-full rounded-full bg-photo-action text-photo-ink hover:bg-photo-action/90">{busy ? 'Creating…' : 'Sign up'}</Button>
      <p role="status" className="text-sm">{msg}</p>
      <p className="text-sm">Already have an account? <Link to="/login" className="underline">Log in</Link></p>
    </form>
  </PageBody>;
}
