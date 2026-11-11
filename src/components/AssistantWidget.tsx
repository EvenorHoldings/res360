import { MessageCircleQuestion } from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
const AssistantChat = lazy(() => import('./AssistantChat'));
export const OPEN_ASSISTANT_EVENT = 'res360:open-assistant';
/** Floating help assistant; the chat code loads only when a visitor opens it. */
export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const h = () => setOpen(true); window.addEventListener(OPEN_ASSISTANT_EVENT, h); return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, h); }, []);
  if (open) return <Suspense fallback={null}><AssistantChat onClose={() => setOpen(false)} /></Suspense>;
  return <Button type="button" onClick={() => setOpen(true)} aria-label="Open the Res360 assistant" className="fixed bottom-4 right-4 z-50 h-12 rounded-sm px-4 shadow-lg"><MessageCircleQuestion /> Ask Res360</Button>;
}
