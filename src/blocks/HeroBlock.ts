import type { Block } from 'payload';

/**
 * Hero Block — large, visually prominent page-opening section.
 * Supports eyebrow text, heading, body copy, an optional background image,
 * layout alignment, and up to three call-to-action buttons.
 */
export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  admin: {
    group: 'Page Builder',
  },
  fields: [
    // ── Eyebrow ──────────────────────────────────────────────────────────────
    {
      name: 'eyebrow',
      type: 'text',
      maxLength: 100,
      admin: {
        description: 'Short label displayed above the heading (e.g. "Our Mission"). Optional.',
      },
    },
    // ── Heading ──────────────────────────────────────────────────────────────
    {
      name: 'heading',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Primary headline for this hero section.',
      },
    },
    // ── Body text ─────────────────────────────────────────────────────────────
    {
      name: 'body',
      type: 'textarea',
      maxLength: 1000,
      admin: {
        description: 'Supporting paragraph text displayed beneath the heading.',
      },
    },
    // ── Background image ─────────────────────────────────────────────────────
    {
      name: 'backgroundImage',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Optional full-bleed background image (use the shared Media library).',
      },
    },
    // ── Alignment ─────────────────────────────────────────────────────────────
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      required: true,
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description: 'Horizontal alignment of heading, body text, and actions.',
      },
    },
    // ── Actions ───────────────────────────────────────────────────────────────
    {
      name: 'actions',
      type: 'array',
      maxRows: 3,
      labels: {
        singular: 'Action',
        plural: 'Actions',
      },
      admin: {
        description: 'Up to three call-to-action buttons.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          maxLength: 80,
          admin: {
            description: 'Button label text.',
          },
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          maxLength: 2048,
          admin: {
            description: 'Destination URL or internal path (e.g. /contact).',
          },
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          required: true,
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Ghost', value: 'ghost' },
          ],
          admin: {
            description: 'Visual style of this button.',
          },
        },
      ],
    },
  ],
};
