import { builder } from '../../builder';
import './query';
import './mutation';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    login: t.exposeString('login'),
    password: t.exposeString('password'),
    avatar: t.exposeString('avatar', { nullable: true }),

    nodes: t.relation('UsersOnNode')
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
