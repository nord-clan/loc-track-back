/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Tuple } from '#/models/node';
import type { IUsersOnNode } from '#/models/user-on-node';
import { builder } from '#/graphql/builder';
import NodeService from '#/services/node.service';
import NodeDataService from '#/services/node-data.service';
import UserOnNodeService from '#/services/user-on-node.service';

const nodeService = new NodeService();
const nodeDataService = new NodeDataService();
const userOnNodeService = new UserOnNodeService();

interface INodeCreateInput {
  angle?: number;
  height: number;
  width: number;
  layerId: string;
  type?: string;
  pos: Tuple;
}

const NodeCreateInput = builder.inputRef<INodeCreateInput>('NodeCreateInput').implement({
  fields: (t) => ({
    angle: t.float({ required: false }),
    height: t.int({ required: true }),
    width: t.int({ required: true }),
    layerId: t.field({ type: 'UUID', required: true }),
    pos: t.field({ type: 'Tuple', required: true }),
    type: t.field({ type: 'String', required: false })
  })
});

builder.mutationField('createNode', (t) =>
  t.prismaField({
    description: 'Create node',
    type: 'Node',
    args: {
      data: t.arg({
        type: NodeCreateInput,
        required: true
      })
    },
    errors: { types: [Error] },
    resolve: async (query, root, args, ctx, info) => {
      const node = await nodeService.post({
        ...args.data
      });

      await nodeDataService.post({
        nodeId: node.id
      });

      return node;
    }
  })
);

builder.mutationField('deleteNode', (t) =>
  t.field({
    description: 'Delete node',
    type: 'Int',
    errors: { types: [Error] },
    args: { data: t.arg({ type: ['UUID'], required: false }) },
    resolve: async (root, args, ctx, info) => {
      const ids = args.data;
      if (!ids) return 0;

      const result = await nodeService.deleteManyByWhere({
        where: {
          id: {
            in: ids
          }
        }
      });
      return result.count;
    }
  })
);

interface INodeUpdateInput {
  id: string;
  angle?: number;
  pos?: Tuple;
  height?: number;
  width?: number;
}

const NodeUpdateInput = builder.inputRef<INodeUpdateInput>('NodeUpdateInput').implement({
  fields: (t) => ({
    id: t.field({ type: 'UUID', required: true }),
    angle: t.float({ required: false }),
    pos: t.field({ type: 'Tuple', required: false }),
    height: t.int({ required: false }),
    width: t.int({ required: false })
  })
});

builder.mutationField('updateNode', (t) =>
  t.field({
    description: 'Update node data',
    errors: { types: [Error] },
    type: 'Boolean',
    args: {
      data: t.arg({
        type: [NodeUpdateInput],
        required: true
      })
    },
    resolve: async (root, args, ctx, info) => {
      const nodes = args.data;

      const promises = nodes.map((node) => nodeService.updateByWhere(node.id, node));
      await Promise.allSettled(promises);

      return true;
    }
  })
);

type IUserOnNodeCreateInput = Omit<IUsersOnNode, 'node' | 'user' | 'id'>;

const UserOnNodeCreateInput = builder
  .inputRef<IUserOnNodeCreateInput>('UserOnNodeCreateInput')
  .implement({
    fields: (t) => ({
      nodeId: t.string({ required: true }),
      userId: t.string({ required: true }),
      activationAt: t.field({ type: 'TimestampTZ', required: true }),
      deactivationAt: t.field({ type: 'TimestampTZ', required: false })
    })
  });

builder.mutationField('createUserOnNode', (t) =>
  t.prismaField({
    description: 'Create usersOnNode',
    type: 'UsersOnNode',
    args: {
      data: t.arg({
        type: UserOnNodeCreateInput,
        required: true
      })
    },
    errors: { types: [Error] },
    resolve: async (query, _, args) => userOnNodeService.create(args.data)
  })
);
