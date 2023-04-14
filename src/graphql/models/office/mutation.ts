import { builder } from '#/graphql/builder';
import OfficeService from '#/services/office.service';

const service = new OfficeService();

const OfficeCreateInput = builder.inputType('OfficeCreateInput', {
  fields: (t) => ({
    name: t.string({ required: true })
  })
});

builder.mutationField('createOffice', (t) =>
  t.prismaField({
    description: 'Create office',
    type: 'Office',
    args: {
      data: t.arg({
        type: OfficeCreateInput,
        required: true
      })
    },
    errors: {
      types: [Error]
    },
    resolve: async (query, root, args, ctx, info) => {
      const { data } = args;

      //? if already exists throw error
      const existing = await service.getByWhere({ where: { name: data.name } });
      if (existing) {
        throw new Error('Office already exists please use another name');
      }
      const office = await service.post(data);
      return office;
    }
  })
);
