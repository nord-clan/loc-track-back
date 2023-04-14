/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-promise-executor-return */
import { nodesCommon, nodesPoints, nodesTables, nodesTablesLayer1 } from './mock/node';
import { offices, layers, nodeTypes } from './mock/common';
import { users, usersOnNode, usersOnNodeFromNow } from './mock/user';
import prisma from '../src/prisma';
import { faker } from '@faker-js/faker';

async function run() {
  console.log('\x1B[34m%s', '✨ Run seeds');

  await Promise.all(
    users.map(
      (value) =>
        new Promise(async (r) => {
          await prisma.user.upsert({
            create: value,
            update: {},
            where: {
              id: value.id
            }
          });
          r(true);
        })
    )
  );
  console.log('\x1B[32m%s\x1B[0m', '✅ users');

  await Promise.all(
    offices.map(
      (value) =>
        new Promise(async (r) => {
          await prisma.office.upsert({
            create: value,
            update: {},
            where: {
              id: value.id
            }
          });
          r(true);
        })
    )
  );
  console.log('\x1B[32m%s\x1B[0m', '✅ offices');

  await Promise.all(
    layers.map(
      (value) =>
        new Promise(async (r) => {
          await prisma.layer.upsert({
            create: value,
            update: {},
            where: {
              id: value.id
            }
          });
          r(true);
        })
    )
  );
  console.log('\x1B[32m%s\x1B[0m', '✅ layers');

  await Promise.all(
    nodeTypes.map(
      (value) =>
        new Promise(async (r) => {
          await prisma.nodeType.upsert({
            create: value,
            update: {},
            where: {
              name: value.name
            }
          });
          r(true);
        })
    )
  );
  console.log('\x1B[32m%s\x1B[0m', '✅ node-types');

  await Promise.all([
    ...nodesTables.map(
      (value, index) =>
        new Promise(async (r) => {
          await prisma.node.upsert({
            create: value,
            update: {},
            where: {
              id: value.id
            }
          });
          await prisma.nodeData.upsert({
            create: {
              nodeId: value.id,
              backgroundSrc: faker.image.abstract(500, 900, true),
              index
            },
            update: {},
            where: {
              nodeId: value.id
            }
          });
          r(true);
        })
    ),
    ...nodesTablesLayer1.map(
      (value, index) =>
        new Promise(async (r) => {
          await prisma.node.upsert({
            create: value,
            update: {},
            where: {
              id: value.id
            }
          });
          await prisma.nodeData.upsert({
            create: {
              nodeId: value.id,
              backgroundSrc: faker.image.abstract(500, 900, true),
              index
            },
            update: {},
            where: {
              nodeId: value.id
            }
          });
          r(true);
        })
    )
  ]);
  console.log('\x1B[32m%s\x1B[0m', '✅ nodes-tables');

  await Promise.all(
    nodesCommon.map(
      (value, index) =>
        new Promise(async (r) => {
          await prisma.node.upsert({
            create: value,
            update: {},
            where: {
              id: value.id
            }
          });
          await prisma.nodeData.upsert({
            create: {
              nodeId: value.id,
              index
            },
            update: {},
            where: {
              nodeId: value.id
            }
          });
          r(true);
        })
    )
  );
  console.log('\x1B[32m%s\x1B[0m', '✅ nodes-common');

  await Promise.all(
    nodesPoints.map(
      (value, index) =>
        new Promise(async (r) => {
          await prisma.node.upsert({
            create: value,
            update: {},
            where: {
              id: value.id
            }
          });
          await prisma.nodeData.upsert({
            create: {
              nodeId: value.id,
              index
            },
            update: {},
            where: {
              nodeId: value.id
            }
          });
          r(true);
        })
    )
  );
  console.log('\x1B[32m%s\x1B[0m', '✅ nodes-points');

  await Promise.all([
    ...usersOnNode.map(
      (value) =>
        new Promise(async (r) => {
          await prisma.usersOnNode.create({ data: value });
          r(true);
        })
    ),
    ...usersOnNodeFromNow.map(
      (value) =>
        new Promise(async (r) => {
          await prisma.usersOnNode.create({ data: value });
          r(true);
        })
    )
  ]);
  console.log('\x1B[32m%s\x1B[0m', '✅ users on node');

  console.log('\x1B[34m%s', '✨ All seeds success');

  await prisma.$disconnect();
}

run().catch(() => {
  console.log('\x1b[31m%s\x1B[0m', '❌ Seed');
  process.exit(1);
});
