import { builder } from '#/graphql/builder';
import './query';
import './mutation';
import UserOnNodeService from '#/services/user-on-node.service';

const userOnNodeService = new UserOnNodeService();

builder.prismaObject('Node', {
  name: 'Node',
  description: 'Node model',
  fields: (t) => ({
    id: t.exposeID('id'),
    pos: t.expose('pos', { type: 'Tuple' }),
    angle: t.exposeInt('angle'),
    width: t.exposeFloat('width'),
    height: t.exposeFloat('height'),
    type: t.exposeString('type'),
    layerId: t.exposeString('layerId'),
    reserves: t.prismaField({
      type: ['UsersOnNode'],
      nullable: true,
      args: {
        at: t.arg({ type: 'TimestampTZ', required: false }),
        to: t.arg({ type: 'TimestampTZ', required: false })
      },
      resolve: async (query, root, args) => {
        const at = args?.at ?? new Date(new Date().setHours(0, 0, 0, 0));
        const to = args?.to ?? new Date(new Date().setDate(new Date().getDate() + 1));

        return userOnNodeService.getByWhere({
          query,
          where: {
            nodeId: root.id,
            OR: [
              {
                AND: [
                  // {
                  //   activationAt: {
                  //     gt: at
                  //   }
                  // },
                  {
                    deactivationAt: {
                      gt: at,
                      lt: to
                    }
                  }
                ]
              },
              {
                AND: [
                  // {
                  //   activationAt: {
                  //     lte: at
                  //   }
                  // },
                  {
                    deactivationAt: null
                  }
                ]
              }
            ]
          }
        });
      }
    }),

    //* relation
    nodeType: t.relation('NodeType', { nullable: true }),
    layer: t.relation('Layer', { nullable: true }),
    data: t.relation('NodeData'),
    users: t.relation('UsersOnNode')
  })
});

builder.prismaObject('NodeType', {
  name: 'NodeType',
  description: 'NodeType model',
  fields: (t) => ({
    name: t.exposeString('name'),
    size: t.expose('size', { type: 'Tuple' }),
    numberOfUsers: t.exposeInt('numberOfUsers'),
    createdAt: t.expose('createdAt', { type: 'TimestampTZ' }),

    nodes: t.relation('Nodes')
  })
});

builder.prismaObject('NodeData', {
  name: 'NodeData',
  description: 'NodeData model',
  fields: (t) => ({
    index: t.int({ nullable: true, resolve: (v) => v.index }),
    allowMove: t.boolean({ nullable: true, resolve: (v) => v.allowMove }),
    allowResize: t.boolean({ nullable: true, resolve: (v) => v.allowResize }),
    backgroundSrc: t.string({ nullable: true, resolve: (v) => v.backgroundSrc }),
    customCss: t.string({ nullable: true, resolve: (v) => v.customCss }),

    node: t.relation('Node')
  })
});
