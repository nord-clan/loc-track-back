import { builder } from '#/graphql/builder';
import OfficeService from '#/services/office.service';

const service = new OfficeService();

builder.queryField('offices', (t) =>
  t.prismaField({
    description: 'Get all offices',
    type: ['Office'],
    args: {},
    errors: { types: [Error] },
    resolve: async (query) => service.getAllByWhere({ query })
  })
);

builder.queryType({
  fields: (t) => ({
    officeByUuid: t.prismaField({
      description: 'Get office by id',
      type: 'Office',
      errors: { types: [Error] },
      args: { id: t.arg({ type: 'UUID', required: true }) },
      resolve: async (query, _, args) => service.getByWhere({ query, where: { id: args.id } })
    })
  })
});
