import type { CollectionConfig } from 'payload';

export const publicationCategories = [
  'Research Reports',
  'Policy Briefs',
  'Articles',
  'Insights',
  'Blogs',
] as const;

export type PublicationCategory = (typeof publicationCategories)[number];

export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: {
    singular: 'Publication',
    plural: 'Publications',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publicationDate', '_status', 'updatedAt'],
    group: 'Content',
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  access: {
    // Public visitors can read published publications only; authenticated staff can read all
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        _status: {
          equals: 'published',
        },
      };
    },
    // Only authenticated staff can create, update, or delete publications
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user && (user as { role?: string }).role === 'admin'),
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (!data) return data;

        // Auto-generate URL-friendly slug from title if not explicitly provided
        if (!data.slug && data.title && typeof data.title === 'string') {
          data.slug = data.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        } else if (data.slug && typeof data.slug === 'string') {
          // Normalize provided slug
          data.slug = data.slug
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        }

        // Set default publicationDate to today if missing on create
        if (operation === 'create' && !data.publicationDate) {
          data.publicationDate = new Date().toISOString();
        }

        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc) {
          // Expose standard status property reflecting draft/published state
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
      maxLength: 255,
      index: true,
      admin: {
        description: 'Primary title of the publication',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Unique URL-friendly identifier (auto-generated from title if blank)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 2000,
      admin: {
        description: 'Comprehensive summary of the publication',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      index: true,
      options: publicationCategories.map((cat) => ({
        label: cat,
        value: cat,
      })),
      admin: {
        position: 'sidebar',
        description: 'Publication category for classification and filtering',
      },
    },
    {
      name: 'publicationDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
        description: 'Official release or publication date',
      },
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'media',
      filterOptions: {
        mimeType: {
          contains: 'image/',
        },
      },
      admin: {
        position: 'sidebar',
        description: 'Optional cover image asset',
      },
    },
    {
      name: 'document',
      type: 'relationship',
      relationTo: 'media',
      filterOptions: {
        mimeType: {
          equals: 'application/pdf',
        },
      },
      admin: {
        description: 'Downloadable PDF or document file attachment',
      },
    },
  ],
  timestamps: true,
};
