import type { Prisma } from '@prisma/client';
import type { IUserSignUpInput } from '#/graphql/models/user/mutation';
import bcrypt from 'bcryptjs';
import prisma from '#/prisma';

class UserService {
  //* C
  post = async (data: IUserSignUpInput) => {
    const payload = data;
    payload.password = bcrypt.hashSync(payload.password, 12);
    return prisma.user.create({ data: payload });
  };

  //* R
  getAll = async () => prisma.user.findMany();

  getAllByWhere = async <TQuery>(payload: IReadPayload<TQuery>) =>
    prisma.user.findMany({ ...payload.query, where: payload.where });

  getByWhere = async <TQuery>(payload: IReadPayload<TQuery>) =>
    prisma.user.findFirst({ ...payload.query, where: payload.where });

  //* U
  update = async <TQuery>(payload: IUpdatePayload<TQuery>) =>
    prisma.user.update({
      ...payload.query,
      where: payload.where,
      data: payload.data
    });

  //* D
}

export default UserService;

//* ==== Interfaces ==================================================================== *//

interface IReadPayload<TQuery> {
  query?: TQuery;
  where?: Prisma.UserWhereInput;
}

interface IUpdatePayload<TQuery> {
  query?: TQuery;
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}
