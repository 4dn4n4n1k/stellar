import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes lock after failed attempts
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'createdAt'],
    group: 'Admin',
  },
  access: {
    // Only logged in users can access admin panel
    admin: ({ req: { user } }) => Boolean(user),
    // Only authenticated users can read users list
    read: ({ req: { user } }) => Boolean(user),
    // Only admins can create new users (no public registration!)
    create: ({ req: { user } }) => Boolean(user && (user as { role?: string }).role === 'admin'),
    // Admins can update any user, individuals can update themselves
    update: ({ req: { user } }) => {
      if (!user) return false;
      if ((user as { role?: string }).role === 'admin') return true;
      return {
        id: {
          equals: user.id,
        },
      };
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => Boolean(user && (user as { role?: string }).role === 'admin'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: ({ req: { user } }) => Boolean(user && (user as { role?: string }).role === 'admin'),
      },
    },
  ],
  timestamps: true,
};
