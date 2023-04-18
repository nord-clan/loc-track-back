import { nodesTables, nodesTablesLayer1 } from './node';
import { faker } from '@faker-js/faker';

export const users = [
  ...[...new Array(10)].map(() => ({
    id: faker.datatype.uuid(),
    login: faker.name.firstName().toLowerCase(),
    password: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
    avatar: faker.image.abstract(500, 500, true),
    country: faker.address.country(),
    status: faker.lorem.lines(),
    city: faker.address.city(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    telegram: faker.internet.userName(),
    mobile: faker.phone.number(),
    emailPersonal: faker.internet.email(),
    emailSecondary: faker.internet.email(),
    birthDate: faker.date.past(),
    employmentDate: faker.date.past()
  })),
  {
    id: '1',
    login: faker.name.firstName().toLowerCase(),
    password: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
    avatar: faker.image.abstract(500, 500, true),
    country: faker.address.country(),
    status: faker.lorem.lines(),
    city: faker.address.city(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    telegram: faker.internet.userName(),
    mobile: faker.phone.number(),
    emailPersonal: faker.internet.email(),
    emailSecondary: faker.internet.email(),
    birthDate: faker.date.past(),
    employmentDate: faker.date.past()
  }
];

export const usersOnNode = [...new Array(10)].map(() => ({
  nodeId: faker.helpers.arrayElement(nodesTables.map(({ id }) => id)),
  userId: faker.helpers.arrayElement(users.map(({ id }) => id)),
  createdAt: faker.date.past(),
  activationAt: faker.date.past()
  // deactivationAt: faker.date.future()
}));

export const usersOnNodeFromNow = [
  ...[...new Array(100)].map(() => {
    const aAtDate = new Date();
    const dAtDate = new Date();

    const activationAt = faker.date.between(
      aAtDate,
      new Date(aAtDate.setDate(aAtDate.getDate() + (+faker.random.numeric(1) - 7)))
    );
    const deactivationAt = faker.date.between(
      dAtDate,
      new Date(dAtDate.setDate(aAtDate.getDate() + +faker.random.numeric(1)))
    );

    return {
      nodeId: faker.helpers.arrayElement(nodesTables.map(({ id }) => id)),
      userId: faker.helpers.arrayElement(users.map(({ id }) => id)),
      createdAt: faker.date.past(),
      activationAt,
      deactivationAt
    };
  }),
  {
    nodeId: faker.helpers.arrayElement(nodesTables.map(({ id }) => id)),
    userId: faker.helpers.arrayElement(users.map(({ id }) => id)),
    createdAt: faker.date.past(),
    activationAt: faker.date.past(),
    deactivationAt: null
  },
  {
    nodeId: faker.helpers.arrayElement(nodesTablesLayer1.map(({ id }) => id)),
    userId: faker.helpers.arrayElement(users.map(({ id }) => id)),
    createdAt: faker.date.past(),
    activationAt: faker.date.past(),
    deactivationAt: null
  },
  {
    nodeId: faker.helpers.arrayElement(nodesTablesLayer1.map(({ id }) => id)),
    userId: faker.helpers.arrayElement(users.map(({ id }) => id)),
    createdAt: faker.date.past(),
    activationAt: faker.date.past(),
    deactivationAt: faker.date.future()
  }
];
