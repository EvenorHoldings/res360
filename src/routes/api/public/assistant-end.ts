import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/api/public/assistant-end')({
  server: { handlers: { POST: async ({ request }) => (await import('@/lib/assistant/assistant.server')).handleAssistantEnd(request) } },
});
