import { builder } from '#/graphql/builder';
import './query';
import './mutation';

builder.prismaObject('Office', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    city: t.string({ nullable: true, resolve: () => 'city' }),
    address: t.string({ nullable: true, resolve: () => 'address' }),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),

    layers: t.relation('Layers')
  })
});
