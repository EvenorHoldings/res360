import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

export const getRecommendations = createServerFn({ method: 'POST' })
  .inputValidator((data) => z.object({ request: z.string().trim().min(10).max(1000) }).parse(data))
  .handler(async ({ data }) => {
    const { recommendListings } = await import('./ai/recommend.server');
    return recommendListings(data.request);
  });
