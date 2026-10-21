import { z } from 'zod';

export const contactSubmissionSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(1, 'Name cannot be empty')
    .max(100, 'Name must be 100 characters or fewer'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be 255 characters or fewer'),
  subject: z
    .string({ required_error: 'Subject is required' })
    .trim()
    .min(1, 'Subject cannot be empty')
    .max(200, 'Subject must be 200 characters or fewer'),
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message must be 5000 characters or fewer'),
  honeypot: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
