import type { CollectionConfig } from 'payload';

export const AssociateExperts: CollectionConfig = {
  slug: 'associate-experts',
  labels: {
    singular: 'Associate Expert',
    plural: 'Associate Experts',
  },
  defaultSort: 'displayOrder',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['displayOrder', 'title', 'expertise', '_status', 'updatedAt'],
    group: 'Content',
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  access: {
    // Public visitors can read published associate experts only; authenticated staff can read all
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        _status: {
          equals: 'published',
        },
      };
    },
    // Authenticated staff can create and update associate experts
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    // Only administrators can delete associate experts
    delete: ({ req: { user } }) => Boolean(user && (user as { role?: string }).role === 'admin'),
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc) {
          doc.status = doc._status || 'published';
        }
        return doc;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 150,
      index: true,
      admin: {
        description: 'Specialist or consultant title (e.g. Governance Expert)',
      },
    },
    {
      name: 'expertise',
      type: 'text',
      required: true,
      maxLength: 255,
      admin: {
        description: 'Core domain or sector of expertise (e.g. Democracy & Governance)',
      },
    },
    {
      name: 'profileImage',
      type: 'relationship',
      relationTo: 'media',
      filterOptions: {
        mimeType: {
          contains: 'image/',
        },
      },
      admin: {
        position: 'sidebar',
        description: 'Optional profile or avatar asset from media library',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Display order priority (e.g. 1, 2, 3... lower numbers appear first)',
      },
    },
  ],
  timestamps: true,
};
