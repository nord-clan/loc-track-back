import { builder } from '#/graphql/builder';
import './query';
import './mutation';

builder.prismaObject('Layer', {
  name: 'Layer',
  description: 'Layer model',
  fields: (t) => ({
    id: t.exposeID('id'),
    index: t.exposeInt('index'),
    name: t.exposeString('name'),
    img: t.string({ nullable: true, resolve: (v) => v.img }),
    officeId: t.exposeString('officeId'),

    office: t.relation('Office'),
    nodes: t.relation('Nodes')
  })
});
