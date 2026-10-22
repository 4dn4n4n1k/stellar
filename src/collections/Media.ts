import type { CollectionConfig } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/avif',
  'application/pdf',
] as const;

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media Asset',
    plural: 'Media Assets',
  },
  admin: {
    group: 'Content',
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
  },
  access: {
    // Public visitors can view media files (PDF reports, publication covers, website imagery)
    read: () => true,
    // Only authenticated staff can upload or modify media assets
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user && (user as { role?: string }).role === 'admin'),
  },
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    mimeTypes: [...ALLOWED_MIME_TYPES],
  },
  hooks: {
    beforeValidate: [
      ({ req, data }) => {
        // Enforce strict file size and MIME-type restrictions on upload
        const file = req.file;
        if (file) {
          if (file.size > MAX_FILE_SIZE_BYTES) {
            throw new Error(
              `File exceeds maximum upload size of ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB. (Uploaded: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`
            );
          }
          if (!ALLOWED_MIME_TYPES.includes(file.mimetype as (typeof ALLOWED_MIME_TYPES)[number])) {
            throw new Error(
              `Forbidden file type: ${file.mimetype}. Only images (JPEG, PNG, WebP, SVG, AVIF) and PDF documents are allowed.`
            );
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      maxLength: 255,
      admin: {
        description: 'Descriptive alternative text for screen readers (accessibility) and asset identification',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Optional descriptive caption, subtitle, or attribution credit',
      },
    },
  ],
  timestamps: true,
};
