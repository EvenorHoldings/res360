import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { PageBody } from '@/components/SiteFrame';
import { pageHead } from '@/lib/page-head';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/reset-password')({ head: () => pageHead('Set a new password | Res360', 'Choose a new password for your Res360 account.', '/reset-password'), component: ResetPassword });
function ResetPassword() {
 const [ready,setReady]=useState(false); const [password,setPassword]=useState(''); const [confirm,setConfirm]=useState(''); const [msg,setMsg]=useState(''); const [err,setErr]=useState(false); const [done,setDone]=useState(false); const [busy,setBusy]=useState(false);
 useEffect(()=>{ if(window.location.hash.includes('type=recovery')) setReady(true); const {data:{subscription}}=supabase.auth.onAuthStateChange(e=>{if(e==='PASSWORD_RECOVERY')setReady(true);}); return ()=>subscription.unsubscribe(); },[]);
 async function submit(e:FormEvent){e.preventDefault();setMsg('');if(password.length<10){setErr(true);setMsg('Use at least 10 characters.');return}if(password!==confirm){setErr(true);setMsg('The passwords do not match.');return}setBusy(true);const {error}=await supabase.auth.updateUser({password});setBusy(false);if(error){setErr(true);setMsg(error.message);}else{setErr(false);setDone(true);setMsg('Your password has been updated.');}}
 return <PageBody title="Set a new password">{done ? <p><Link to="/" className="underline">Continue to Res360</Link></p> : !ready ? <p>Open this page from the reset link in your email. <Link to="/login" className="underline">Request a new link</Link>.</p> : <form onSubmit={submit} className="max-w-sm space-y-4"><label className="block">New password<input type="password" autoComplete="new-password" required minLength={10} value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-md bg-photo-foreground p-3 text-photo-ink"/></label><p className="-mt-2 text-sm">At least 10 characters. Passwords found in known data breaches are rejected.</p><label className="block">Confirm new password<input type="password" autoComplete="new-password" required value={confirm} onChange={e=>setConfirm(e.target.value)} className="mt-1 w-full rounded-md bg-photo-foreground p-3 text-photo-ink"/></label><Button disabled={busy} type="submit" className="bg-photo-action text-photo-foreground">{busy?'Saving…':'Update password'}</Button></form>}<p role={err?'alert':'status'} className={err?'text-destructive':''}>{msg}</p></PageBody>;
}
