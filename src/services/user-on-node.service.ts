import type { Prisma } from '@prisma/client';
import prisma from '#/prisma';

class UserOnNodeService {
  //* C
  create = async <TData>(data: TData) =>
    prisma.usersOnNode.create({ data: data as Prisma.UsersOnNodeCreateInput });

  //* R
  getAll = async () => prisma.usersOnNode.findMany();
  getByWhere = async <TQuery>(payload: IWherePayload<TQuery>) =>
    prisma.usersOnNode.findMany({ ...payload.query, where: payload.where });

  //* U

  //* D
}

export default UserOnNodeService;

//* ==== Interfaces ==================================================================== *//

interface IWherePayload<TQuery> {
  query?: TQuery;
  where?: Partial<Prisma.UsersOnNodeWhereInput>;
}
