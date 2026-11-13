import { z } from 'zod';

export const signupSchema = z.object({
  full_name: z.string().trim().min(2, 'Enter your name.').max(100),
  email: z.string().trim().email('Enter a valid email.').max(255),
  password: z.string().min(10, 'Password must be at least 10 characters.').max(72),
  role: z.enum(['student', 'host']),
  terms: z.literal('on', { message: 'Please agree to the Terms and Privacy Policy.' }),
  age: z.literal('on', { message: 'Please confirm you are 18 or older, or have consent.' }),
  marketing: z.string().optional(),
});
