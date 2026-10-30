import type { Block } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

/**
 * Image and Text Block — side-by-side layout with an image on the left or
 * right and rich-text content on the opposite side.
 */
export const ImageTextBlock: Block = {
  slug: 'image-text',
  labels: {
    singular: 'Image & Text',
    plural: 'Image & Text Blocks',
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
        description: 'Section heading (required).',
      },
    },
    // ── Rich text body ────────────────────────────────────────────────────────
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor(),
      admin: {
        description: 'Body text edited with the Lexical editor.',
      },
    },
    // ── Image ─────────────────────────────────────────────────────────────────
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Image asset from the Media library (required).',
      },
    },
    // ── Image position ────────────────────────────────────────────────────────
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      required: true,
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description: 'Which side of the text the image appears on.',
      },
    },
    // ── Alt text override ─────────────────────────────────────────────────────
    {
      name: 'altOverride',
      type: 'text',
      maxLength: 255,
      admin: {
        description:
          'Optional accessible alt text that overrides the alt text stored on the Media record. Use when the same image needs a different description in this context.',
      },
    },
  ],
};

