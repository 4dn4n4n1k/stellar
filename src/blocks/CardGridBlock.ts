import type { Block } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

/**
 * Card Grid Block — displays a configurable grid of cards with optional
 * images, descriptions, links, and rich-text bodies.
 */
export const CardGridBlock: Block = {
  slug: 'card-grid',
  labels: {
    singular: 'Card Grid',
    plural: 'Card Grids',
  },
  admin: {
    group: 'Page Builder',
  },
  fields: [
    // ── Section header ────────────────────────────────────────────────────────
    {
      name: 'eyebrow',
      type: 'text',
      maxLength: 100,
      admin: {
        description: 'Optional short label displayed above the section heading.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      maxLength: 200,
      admin: {
        description: 'Optional section heading displayed above the card grid.',
      },
    },
    {
      name: 'introduction',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Optional introductory paragraph displayed between the heading and the grid.',
      },
    },
    // ── Grid columns ──────────────────────────────────────────────────────────
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      required: true,
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        description: 'Number of columns in the card grid (on large viewports).',
      },
    },
    // ── Cards ─────────────────────────────────────────────────────────────────
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      labels: {
        singular: 'Card',
        plural: 'Cards',
      },
      admin: {
        description: 'Between 1 and 12 cards.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          maxLength: 150,
          admin: {
            description: 'Card title.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          maxLength: 500,
          admin: {
            description: 'Short summary text displayed on the card.',
          },
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          admin: {
            description: 'Optional card image from the Media library.',
          },
        },
        {
          name: 'href',
          type: 'text',
          maxLength: 2048,
          admin: {
            description: 'Optional destination URL or internal path when the card is clickable.',
          },
        },
        {
          name: 'body',
          type: 'richText',
          editor: lexicalEditor(),
          admin: {
            description:
              'Optional rich-text body content (displayed below the description, e.g. in an expanded or detail view).',
          },
        },
      ],
    },
  ],
};

