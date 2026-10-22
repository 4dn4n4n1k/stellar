import type { CollectionConfig } from 'payload';

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  defaultSort: 'displayOrder',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['displayOrder', 'name', 'title', '_status', 'updatedAt'],
    group: 'Content',
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  access: {
    // Public visitors can read published team members only; authenticated staff can read all
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        _status: {
          equals: 'published',
        },
      };
    },
    // Authenticated staff can create and update team members
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    // Only administrators can delete team members
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
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 150,
      index: true,
      admin: {
        description: 'Full name of the team member or partner',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 150,
      admin: {
        description: 'Professional title or role (e.g. Managing Director)',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      maxLength: 2000,
      admin: {
        description: 'Professional biography summarizing background, focus areas, and leadership',
      },
    },
    {
      name: 'expertise',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Expertise Area',
        plural: 'Expertise Areas',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Key areas of expertise and domain specializations',
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
        description: 'Optional headshot photo from media library',
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
