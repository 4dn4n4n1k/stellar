import type { CollectionConfig } from 'payload';
import { contactSubmissionSchema } from '../lib/validations/contact';

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Contact Submission',
    plural: 'Contact Submissions',
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    group: 'Submissions',
  },
  access: {
    // Public visitors can submit inquiries
    create: () => true,
    // Strictly private: Only authenticated staff can read, update, or delete submissions
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user && (user as { role?: string }).role === 'admin'),
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        // Only enforce Zod schema on public creation (unauthenticated)
        if (!req.user && data) {
          const parsed = contactSubmissionSchema.safeParse(data);
          if (!parsed.success) {
            const firstError = parsed.error.issues[0]?.message || 'Validation error';
            throw new Error(firstError);
          }
        }
        return data;
      },
    ],
    beforeChange: [
      ({ data, req }) => {
        // Anti-spam honeypot enforcement
        if (data && data.honeypot) {
          // If honeypot is populated, mark as spam or reject
          data.status = 'spam';
        }
        // Prevent public users from setting private status or staff notes
        if (!req.user && data) {
          data.status = data.status === 'spam' ? 'spam' : 'new';
          data.notes = undefined;
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      maxLength: 200,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      maxLength: 5000,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Spam', value: 'spam' },
      ],
      access: {
        // Public cannot set status, only authenticated users can update it
        create: () => false,
        update: ({ req: { user } }) => Boolean(user),
      },
    },
    {
      name: 'honeypot',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal staff notes (not visible to visitor)',
      },
      access: {
        read: ({ req: { user } }) => Boolean(user),
        create: () => false,
        update: ({ req: { user } }) => Boolean(user),
      },
    },
  ],
  timestamps: true,
};
