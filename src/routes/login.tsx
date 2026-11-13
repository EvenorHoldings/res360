import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { PageBody } from '@/components/SiteFrame';
import { pageHead } from '@/lib/page-head';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/login')({ head: () => pageHead('Login | Res360', 'Sign in or create your Res360 account.', '/login'), component: Login });
function Login() {
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [forgot,setForgot]=useState(false); const [message,setMessage]=useState(''); const [isError,setIsError]=useState(false); const [busy,setBusy]=useState(false); const [signedIn,setSignedIn]=useState(false);
 useEffect(() => { supabase.auth.getUser().then(({data}) => setSignedIn(Boolean(data.user))); const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>setSignedIn(Boolean(session?.user))); return () => subscription.unsubscribe(); },[]);
 const say=(m:string,err=false)=>{setMessage(m);setIsError(err);};
 async function submit(e: FormEvent) { e.preventDefault();setBusy(true);say('');
  if(forgot){const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${window.location.origin}/reset-password`});setBusy(false);if(error)say(error.message,true);else say('If an account exists for that email, we have sent a password reset link.');return;}
  const result=await supabase.auth.signInWithPassword({email,password}); setBusy(false); if(result.error) say(result.error.message,true); else say('You are signed in.'); }
 return <PageBody title={forgot?'Reset your password':'Login'}>{signedIn ? <div className="space-y-4"><p>You are signed in.</p><Link to="/" className="underline">Return home</Link><div><Button onClick={async()=>{await supabase.auth.signOut();say('Signed out.')}}>Sign out</Button></div></div> : <form onSubmit={submit} className="max-w-sm space-y-4"><label className="block">Email<input aria-label="Email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-md bg-photo-foreground p-3 text-photo-ink" /></label>{!forgot&&<><label className="block">Password<input aria-label="Password" type="password" autoComplete="current-password" required minLength={6} value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-md bg-photo-foreground p-3 text-photo-ink" /></label><p className="-mt-2"><Button type="button" variant="link" className="h-auto px-0 text-photo-foreground underline" onClick={()=>{setForgot(true);say('')}}>Forgot password?</Button></p></>}<Button disabled={busy} type="submit" className="bg-photo-action text-photo-foreground">{busy ? 'Please wait…' : forgot ? 'Send reset link' : 'Sign in'}</Button><p>{forgot ? <Button type="button" variant="link" className="px-0 text-photo-foreground underline" onClick={()=>{setForgot(false);say('')}}>Back to sign in</Button> : <Link to="/signup" className="underline">New here? Create account</Link>}</p></form>}<p role={isError?'alert':'status'} className={isError?'text-destructive':''}>{message}</p></PageBody>;
}
