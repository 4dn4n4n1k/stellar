import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';
import { Users } from './collections/Users';
import { ContactSubmissions } from './collections/ContactSubmissions';
import { Media } from './collections/Media';
import { Publications } from './collections/Publications';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      actions: ['@/components/admin/AdminLogout#AdminLogout'],
    },
  },
  collections: [Users, ContactSubmissions, Media, Publications],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'temp-secret-key-at-least-thirty-two-chars-long',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl:
        process.env.DATABASE_URI?.includes('localhost') ||
        process.env.DATABASE_URI?.includes('127.0.0.1')
          ? false
          : { rejectUnauthorized: false },
    },
  }),
});
