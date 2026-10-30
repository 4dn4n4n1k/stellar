import type { Block } from 'payload';

/**
 * Call-to-Action Block — a prominent panel prompting visitors to take action.
 * Supports a primary action and an optional secondary action.
 * Visual tone is controlled by the `tone` field.
 */
export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
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
        description: 'Optional short label displayed above the heading.',
      },
    },
    // ── Heading ───────────────────────────────────────────────────────────────
    {
      name: 'heading',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Main heading of the call-to-action panel (required).',
      },
    },
    // ── Supporting body text ──────────────────────────────────────────────────
    {
      name: 'body',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Optional supporting paragraph displayed beneath the heading.',
      },
    },
    // ── Primary action ────────────────────────────────────────────────────────
    {
      name: 'primaryAction',
      type: 'group',
      label: 'Primary Action',
      admin: {
        description: 'Required primary call-to-action button.',
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
            description: 'Destination URL or internal path.',
          },
        },
      ],
    },
    // ── Secondary action ──────────────────────────────────────────────────────
    {
      name: 'secondaryAction',
      type: 'group',
      label: 'Secondary Action',
      admin: {
        description: 'Optional secondary button.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          maxLength: 80,
          admin: {
            description: 'Button label text. Leave blank to hide the secondary button.',
          },
        },
        {
          name: 'href',
          type: 'text',
          maxLength: 2048,
          admin: {
            description: 'Destination URL or internal path.',
          },
        },
      ],
    },
    // ── Visual tone ───────────────────────────────────────────────────────────
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'navy',
      required: true,
      options: [
        { label: 'Navy', value: 'navy' },
        { label: 'Teal', value: 'teal' },
        { label: 'Light', value: 'light' },
      ],
      admin: {
        description: 'Background colour and text colour preset for this CTA panel.',
      },
    },
  ],
};

