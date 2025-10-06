import { adminOnly } from '@/payload/access/adminOnly'
import { adminOnlyFieldAccess } from '@/payload/access/adminOnlyFieldAccess'
import { adminOrSelf } from '@/payload/access/adminOrSelf'
import { publicAccess } from '@/payload/access/publicAccess'
import { checkRole } from '@/payload/access/utilities'
import type { CollectionConfig, Field } from 'payload'

const RolesField: Field = {
  name: 'roles',
  type: 'select',
  access: {
    create: adminOnlyFieldAccess,
    read: adminOnlyFieldAccess,
    update: adminOnlyFieldAccess,
  },
  defaultValue: ['other'],
  hasMany: true,
  hooks: {
    // beforeChange: [ensureFirstUserIsAdmin],
  },
  options: [
    {
      label: 'admin',
      value: 'admin',
    },
    {
      label: 'other',
      value: 'other',
    },
  ],
}


export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Users',
    defaultColumns: ['email', 'roles'],
    useAsTitle: 'email',
  },
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    create: publicAccess,
    delete: adminOnly,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed

    RolesField,

  ],
}
