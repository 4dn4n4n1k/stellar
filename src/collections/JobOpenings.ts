import type { CollectionConfig } from 'payload';

export const employmentTypes = [
  'Full-time',
  'Part-time',
  'Consultancy',
  'Contract',
  'Internship',
] as const;

export type EmploymentType = (typeof employmentTypes)[number];

export const JobOpenings: CollectionConfig = {
  slug: 'job-openings',
  labels: {
    singular: 'Job Opening',
    plural: 'Job Openings',
  },
  defaultSort: 'displayOrder',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['displayOrder', 'title', 'employmentType', 'location', 'applicationDeadline', '_status', 'updatedAt'],
    group: 'Content',
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  access: {
    // Public visitors can read published job openings only; authenticated staff can read all
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        _status: {
          equals: 'published',
        },
      };
    },
    // Authenticated staff can create and update job openings
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    // Only administrators can delete job openings
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
      maxLength: 255,
      index: true,
      admin: {
        description: 'Position or assignment title (e.g. Senior Research Associate)',
      },
    },
    {
      name: 'employmentType',
      type: 'select',
      required: true,
      index: true,
      options: employmentTypes.map((type) => ({
        label: type,
        value: type,
      })),
      defaultValue: 'Consultancy',
      admin: {
        position: 'sidebar',
        description: 'Type of engagement',
      },
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Dhaka, Bangladesh',
      maxLength: 150,
      admin: {
        position: 'sidebar',
        description: 'Duty station or work arrangement (e.g. Dhaka, Bangladesh / Hybrid)',
      },
    },
    {
      name: 'applicationDeadline',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
        description: 'Application deadline (optional)',
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
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 5000,
      admin: {
        description: 'Detailed overview of the role, core responsibilities, and qualifications',
      },
    },
    {
      name: 'applicationInstructions',
      type: 'textarea',
      maxLength: 1000,
      admin: {
        description: 'Specific application instructions. If left blank, standard instructions to submit CV via email will apply',
      },
    },
  ],
  timestamps: true,
};
