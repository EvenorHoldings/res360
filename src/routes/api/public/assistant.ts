import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/api/public/assistant')({
  server: { handlers: { POST: async ({ request }) => (await import('@/lib/assistant/assistant.server')).handleAssistantChat(request) } },
});
