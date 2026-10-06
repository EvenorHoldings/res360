import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  organisation: z.string().trim().max(160).optional(),
  message: z.string().trim().max(2000).optional(),
  website: z.string().max(0).optional(), // honeypot: must stay empty
});

export const submitInvestorLead = createServerFn({ method: 'POST' })
  .inputValidator((data) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const since = new Date(Date.now() - 3600_000).toISOString();
    const { count } = await supabaseAdmin.from('investor_leads').select('id', { count: 'exact', head: true }).eq('email', data.email).gte('created_at', since);
    if ((count ?? 0) >= 5) throw new Error('Too many requests. Please try again later.');
    const { error } = await supabaseAdmin.from('investor_leads').insert({ name: data.name, email: data.email, organisation: data.organisation || null, message: data.message || null });
    if (error) throw new Error('Could not save your request.');
    return { ok: true };
  });
