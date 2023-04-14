import { nodesTables, nodesTablesLayer1 } from './node';
import { faker } from '@faker-js/faker';

export const users = [
  ...[...new Array(10)].map(() => ({
    id: faker.datatype.uuid(),
    login: faker.name.firstName().toLowerCase(),
    password: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
    avatar: faker.image.abstract(500, 500, true)

    // skills: [],
    // city: faker.address.city(),
    // employmentDate: faker.date.past(),
    // dismissalDate: faker.date.past(),
    // departments: [],
    // login: faker.internet.userName(),
    // vacationUser: {
    //   availableVacationDaysNow: faker.datatype.number(100),
    //   availableVacationDaysEndYear: faker.datatype.number(100),
    //   usedDaysVacationNow: faker.datatype.number(100),
    //   usedDaysVacationThisYear: faker.datatype.number(100)
    // },
    // firstName: faker.name.firstName(),
    // lastName: faker.name.lastName(),
    // birthDate: faker.date.past(),
    // telegramUserName: faker.internet.userName(),
    // mobile: faker.phone.number(),
    // chiefs: [],
    // chiefsIds: [],
    // departmentsIds: [],
    // role: UserRoles.ROLE_USER,
    // personalMail: faker.internet.email()
  })),
  {
    id: '1',
    login: faker.name.firstName().toLowerCase(),
    password: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
    avatar: faker.image.abstract(500, 500, true)
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
