import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { PageBody } from '@/components/SiteFrame';
import { pageHead } from '@/lib/page-head';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/login')({ head: () => pageHead('Login | Residence24', 'Sign in or create your Residence24 account.', '/login'), component: Login });
function Login() {
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [register,setRegister]=useState(false); const [message,setMessage]=useState(''); const [busy,setBusy]=useState(false); const [signedIn,setSignedIn]=useState(false);
 useEffect(() => { supabase.auth.getUser().then(({data}) => setSignedIn(Boolean(data.user))); const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>setSignedIn(Boolean(session?.user))); return () => subscription.unsubscribe(); },[]);
 async function submit(e: FormEvent) { e.preventDefault();setBusy(true);setMessage(''); const result=register ? await supabase.auth.signUp({email,password}) : await supabase.auth.signInWithPassword({email,password}); setBusy(false); if(result.error) setMessage(result.error.message); else if(register && !result.data.session) setMessage('Check your email to confirm your account.'); else setMessage('You are signed in.'); }
 return <PageBody title="Login">{signedIn ? <div className="space-y-4"><p>You are signed in.</p><Link to="/" className="underline">Return home</Link><div><Button onClick={async()=>{await supabase.auth.signOut();setMessage('Signed out.')}}>Sign out</Button></div></div> : <form onSubmit={submit} className="max-w-sm space-y-4"><label className="block">Email<input aria-label="Email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-md bg-photo-foreground p-3 text-photo-ink" /></label><label className="block">Password<input aria-label="Password" type="password" required minLength={6} value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-md bg-photo-foreground p-3 text-photo-ink" /></label><Button disabled={busy} type="submit" className="bg-photo-action text-photo-foreground">{busy ? 'Please wait…' : register ? 'Create account' : 'Sign in'}</Button><p><Button type="button" variant="link" className="px-0 text-photo-foreground underline" onClick={()=>{setRegister(!register);setMessage('')}}>{register ? 'Already have an account? Sign in' : 'New here? Create account'}</Button></p></form>}<p role="status">{message}</p></PageBody>;
}
