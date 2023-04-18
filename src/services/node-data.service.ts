import type { Prisma } from '@prisma/client';
import prisma from '#/prisma';

class NodeDataService {
  //* C
  post = async <T>(data: T) => prisma.nodeData.create({ data: data as Prisma.NodeDataCreateInput });

  //* R

  //* U

  //* D
}

export default NodeDataService;

//* ==== Interfaces ==================================================================== *//
interface IWherePayload<TQuery> {
  query?: TQuery;
  where?: Prisma.NodeWhereInput;
}
