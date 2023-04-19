import type { INodeType } from '#/models/node';
import { faker } from '@faker-js/faker';

export const offices = [
  {
    id: '1',
    name: 'Ульяновский офис',
    city: 'Ульяновск',
    address: faker.address.streetAddress(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future()
  }
];

export const layers = [
  {
    id: '1',
    index: 1,
    name: 'Первый этаж',
    img: null,
    officeId: '1'
  },
  {
    id: '2',
    index: 2,
    name: 'Второй этаж',
    img: '/assets/office.png',
    officeId: '1'
  },
  {
    id: '3',
    index: 3,
    name: 'Третий этаж',
    img: null,
    officeId: '1'
  },
  {
    id: '4',
    index: 4,
    name: 'Третий этаж',
    img: '/assets/office.svg',
    officeId: '1'
  }
];

export const nodeTypes = [
  {
    name: 'default',
    numberOfUsers: 1,
    size: [50, 50],
    createdAt: faker.date.past()
  },
  {
    name: 'table',
    numberOfUsers: 1,
    size: [50, 90],
    createdAt: faker.date.past()
  },
  {
    name: 'point',
    numberOfUsers: 0,
    size: [10, 10],
    createdAt: faker.date.past()
  },
  {
    name: 'area',
    numberOfUsers: 4,
    size: [100, 100],
    createdAt: faker.date.past()
  }
] as INodeType[];
