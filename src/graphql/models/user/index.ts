import { builder } from '../../builder';
import './query';
import './mutation';

export const UserPrisma = builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),

    login: t.exposeString('login'),
    password: t.exposeString('password'),

    avatar: t.exposeString('avatar', { nullable: true }),
    city: t.exposeString('city', { nullable: true }),
    firstName: t.exposeString('firstName', { nullable: true }),
    lastName: t.exposeString('lastName', { nullable: true }),
    telegram: t.exposeString('telegram', { nullable: true }),
    mobile: t.exposeString('mobile', { nullable: true }),
    emailPersonal: t.exposeString('emailPersonal', { nullable: true }),
    emailSecondary: t.exposeString('emailSecondary', { nullable: true }),
    status: t.exposeString('status', { nullable: true }),
    country: t.exposeString('country', { nullable: true }),

    birthDate: t.expose('birthDate', { nullable: true, type: 'TimestampTZ' }),
    employmentDate: t.expose('employmentDate', { nullable: true, type: 'TimestampTZ' }),

    createdAt: t.expose('createdAt', { nullable: true, type: 'TimestampTZ' }),
    updatedAt: t.expose('updatedAt', { nullable: true, type: 'TimestampTZ' }),

    reserves: t.relation('UsersOnNode')
  })
});

builder.prismaObject('UsersOnNode', {
  name: 'UsersOnNode',
  description: 'Users on node',
  fields: (t) => ({
    id: t.exposeID('id'),
    nodeId: t.exposeString('nodeId'),
    userId: t.exposeString('userId'),
    createdAt: t.expose('createdAt', { type: 'TimestampTZ' }),
    activationAt: t.expose('activationAt', { type: 'TimestampTZ' }),
    deactivationAt: t.expose('deactivationAt', { type: 'TimestampTZ', nullable: true }),

    node: t.relation('Node'),
    user: t.relation('User')
  })
});
