import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';
import { Users } from './collections/Users';
import { ContactSubmissions } from './collections/ContactSubmissions';
import { Media } from './collections/Media';
import { Publications } from './collections/Publications';
import { TeamMembers } from './collections/TeamMembers';
import { AssociateExperts } from './collections/AssociateExperts';
import { JobOpenings } from './collections/JobOpenings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadSecret = process.env.PAYLOAD_SECRET;

if (!payloadSecret || payloadSecret.length < 32) {
  throw new Error(
    'PAYLOAD_SECRET must be configured and contain at least 32 characters.'
  );
}

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
  collections: [Users, ContactSubmissions, Media, Publications, TeamMembers, AssociateExperts, JobOpenings],
  editor: lexicalEditor(),
  secret: payloadSecret,
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
          : { rejectUnauthorized: true },
    },
  }),
});
