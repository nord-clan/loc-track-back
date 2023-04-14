import { builder } from '#/graphql/builder';
import NodeService from '#/services/node.service';
import UserOnNodeService from '#/services/user-on-node.service';

const nodeService = new NodeService();
const userOnNodeService = new UserOnNodeService();

builder.queryField('nodes', (t) =>
  t.prismaField({
    description: 'Get all nodes',
    type: ['Node'],
    args: {},
    errors: { types: [Error] },
    resolve: async (query) => nodeService.getAll(query)
  })
);

builder.queryField('nodesByLayerId', (t) =>
  t.prismaField({
    description: 'Get node by layer id',
    type: ['Node'],
    args: { layerId: t.arg({ type: 'UUID', required: true }) },
    errors: { types: [Error] },
    resolve: async (query, _, args) =>
      nodeService.getAllByWhere({ query, where: { layerId: args.layerId } })
  })
);

builder.queryField('usersOnNodes', (t) =>
  t.prismaField({
    description: 'usersOnNodes',
    type: ['UsersOnNode'],
    args: {},
    errors: { types: [Error] },
    resolve: async (query, _, args) => userOnNodeService.getAll()
  })
);

builder.queryField('usersOnNodesRange', (t) =>
  t.prismaField({
    description: 'usersOnNode',
    type: ['UsersOnNode'],
    args: {
      fromAt: t.arg({ type: 'TimestampTZ', required: true }),
      toAt: t.arg({ type: 'TimestampTZ', required: true })
    },
    errors: { types: [Error] },
    resolve: async (query, _, args) =>
      userOnNodeService.getByWhere({
        query,
        where: {
          OR: [
            {
              activationAt: {
                gt: args.fromAt as Date,
                lt: args.toAt as Date
              }
            },
            {
              deactivationAt: {
                gt: args.fromAt as Date,
                lt: args.toAt as Date
              }
            }
          ]
        }
      })
  })
);
