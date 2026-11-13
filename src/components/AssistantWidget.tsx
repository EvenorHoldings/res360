import { MessageCircleQuestion } from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
const AssistantChat = lazy(() => import('./AssistantChat'));
export const OPEN_ASSISTANT_EVENT = 'res360:open-assistant';
/** Floating help assistant; the chat code loads only when a visitor opens it. */
export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const h = () => setOpen(true); window.addEventListener(OPEN_ASSISTANT_EVENT, h); return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, h); }, []);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s));
    return () => data.subscription.unsubscribe();
  }, []);
  if (open && signedIn === false) return <div role="dialog" aria-label="Res360 assistant" className="fixed bottom-4 right-4 z-50 w-[min(360px,calc(100vw-2rem))] rounded-lg border border-border bg-background p-4 text-foreground shadow-lg">
    <div className="flex items-start justify-between gap-2"><p className="font-semibold">Sign in to chat with the Res360 assistant</p><Button type="button" variant="ghost" size="icon" aria-label="Close" onClick={() => setOpen(false)}><X /></Button></div>
    <p className="mt-1 text-sm text-muted-foreground">You can still browse the <Link to="/help" className="underline">Help centre</Link> without an account.</p>
    <div className="mt-3 flex gap-2"><Button asChild><Link to="/login">Sign in</Link></Button><Button asChild variant="outline"><Link to="/signup">Create account</Link></Button></div>
  </div>;
  if (open && signedIn) return <Suspense fallback={null}><AssistantChat onClose={() => setOpen(false)} /></Suspense>;
  return <Button type="button" onClick={() => setOpen(true)} aria-label="Open the Res360 assistant" className="fixed bottom-4 right-4 z-50 h-12 rounded-sm px-4 shadow-lg"><MessageCircleQuestion /> Ask Res360</Button>;
}
