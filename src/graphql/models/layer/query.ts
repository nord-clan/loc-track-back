import { builder } from '#/graphql/builder';
import LayerService from '#/services/layer.service';

const service = new LayerService();

builder.queryField('layers', (t) =>
  t.prismaField({
    description: 'Get all layers',
    type: ['Layer'],
    args: {},
    errors: { types: [Error] },
    resolve: async (query) => service.getAll(query)
  })
);

builder.queryField('layersByOffice', (t) =>
  t.prismaField({
    description: 'Get layer by office id',
    type: 'Layer',
    args: { officeId: t.arg({ type: 'UUID', required: true }) },
    errors: { types: [Error] },
    resolve: async (query, _, args) =>
      service.getByWhere({ query, where: { officeId: args.officeId } })
  })
);
