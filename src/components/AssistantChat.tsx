import { useChat } from '@ai-sdk/react';
import { Link } from '@tanstack/react-router';
import { DefaultChatTransport, type ToolUIPart } from 'ai';
import { X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from '@/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from '@/components/ai-elements/prompt-input';
import { Shimmer } from '@/components/ai-elements/shimmer';
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from '@/components/ai-elements/tool';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

function sessionId() {
  let id = sessionStorage.getItem('res360-assistant-session');
  if (!id) { id = crypto.randomUUID().replace(/-/g, ''); sessionStorage.setItem('res360-assistant-session', id); }
  return id;
}

export default function AssistantChat({ onClose }: { onClose: () => void }) {
  const sid = useMemo(sessionId, []);
  const [error, setError] = useState('');
  const box = useRef<HTMLDivElement>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/public/assistant', headers: async () => { const { data } = await supabase.auth.getSession(); const t = data.session?.access_token; return t ? { Authorization: `Bearer ${t}` } : {}; }, body: () => ({ sessionId: sid, consent: true, pagePath: window.location.pathname }) }), [sid]);
  const { messages, sendMessage, status, stop } = useChat({ id: sid, transport, onError: (e) => {
    let msg = e.message; try { msg = JSON.parse(e.message).error ?? msg; } catch { /* plain text */ }
    setError(msg || 'The assistant could not answer. Please try again.');
  } });
  const busy = status === 'submitted' || status === 'streaming';
  const focus = () => box.current?.querySelector('textarea')?.focus();
  useEffect(() => { focus(); }, [status]);
  useEffect(() => {
    const end = () => navigator.sendBeacon?.('/api/public/assistant-end', JSON.stringify({ sessionId: sid }));
    window.addEventListener('pagehide', end);
    return () => { window.removeEventListener('pagehide', end); if (messages.length) end(); };
  }, [sid, messages.length]);
  return <div ref={box} role="dialog" aria-label="Res360 assistant" className="fixed bottom-4 right-4 z-50 flex h-[min(600px,calc(100dvh-2rem))] w-[min(400px,calc(100vw-2rem))] flex-col rounded-lg border border-border bg-background text-foreground shadow-lg">
    <div className="flex items-center justify-between border-b border-border px-4 py-3"><div className="flex items-center gap-2"><span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-sm bg-primary text-sm font-bold text-primary-foreground">360</span><div><p className="font-semibold leading-tight">Res360 assistant</p><Link to="/contact" className="text-xs underline">Talk to a person</Link></div></div><Button type="button" variant="ghost" size="icon" aria-label="Close assistant" onClick={onClose}><X /></Button></div>
    <Conversation className="flex-1"><ConversationContent>
      {messages.length === 0 && <ConversationEmptyState title="How can we help?" description="Ask about rooms near your campus, listing a space, the rent calculator or your account." />}
      {messages.map(m => <Message from={m.role} key={m.id}><MessageContent className={m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-transparent'}>
        {m.parts.map((p, i) => p.type === 'text' ? (m.role === 'assistant' ? <MessageResponse key={i}>{p.text}</MessageResponse> : <p key={i}>{p.text}</p>)
          : p.type.startsWith('tool-') ? <Tool key={i} defaultOpen={false}><ToolHeader type={(p as ToolUIPart).type} state={(p as ToolUIPart).state} /><ToolContent><ToolInput input={(p as ToolUIPart).input} /><ToolOutput output={(p as ToolUIPart).output} errorText={(p as ToolUIPart).errorText} /></ToolContent></Tool> : null)}
      </MessageContent></Message>)}
      {status === 'submitted' && <Shimmer>Checking Res360…</Shimmer>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </ConversationContent><ConversationScrollButton /></Conversation>
    <div className="border-t border-border p-3">
      <p className="mb-2 text-xs text-muted-foreground">AI assistant. Don't share ID numbers, passwords or bank details. Chats are used to improve Res360; see <Link to="/privacy" className="underline">Privacy</Link>.</p>
      <PromptInput onSubmit={({ text }) => { const t = text.trim(); if (!t || busy) return; setError(''); void sendMessage({ text: t }); }}>
        <PromptInputTextarea placeholder="Ask the Res360 assistant…" autoFocus />
        <PromptInputFooter className="justify-end"><PromptInputSubmit status={status} disabled={false} onStop={stop} /></PromptInputFooter>
      </PromptInput>
    </div>
  </div>;
}

