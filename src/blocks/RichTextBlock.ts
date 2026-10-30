import type { Block } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

/**
 * Rich Text Block — flexible content area with optional eyebrow, heading,
 * and a Lexical rich-text body.  Content width is adjustable.
 */
export const RichTextBlock: Block = {
  slug: 'rich-text',
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Text Blocks',
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
      maxLength: 200,
      admin: {
        description: 'Optional section heading.',
      },
    },
    // ── Rich text body ────────────────────────────────────────────────────────
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor(),
      admin: {
        description: 'Rich-text body content edited with the Lexical editor.',
      },
    },
    // ── Content width ─────────────────────────────────────────────────────────
    {
      name: 'contentWidth',
      type: 'select',
      defaultValue: 'standard',
      required: true,
      options: [
        { label: 'Narrow', value: 'narrow' },
        { label: 'Standard', value: 'standard' },
        { label: 'Wide', value: 'wide' },
      ],
      admin: {
        description: 'Controls the maximum content width of this block.',
      },
    },
  ],
};

