import type { Prisma } from '@prisma/client';
import type { IUserSignUpInput } from '#/graphql/models/user/mutation';
import type { IUser } from '#/models/user';
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

  getAllByWhere = async <T>(payload: IWherePayload<T>) =>
    prisma.user.findMany({ ...payload.query, where: payload.where });

  getByWhere = async <T>(payload: IWherePayload<T>) =>
    prisma.user.findFirst({ ...payload.query, where: payload.where });

  //* U
  update = async <T>(payload: IUpdatePayload<T>) =>
    prisma.user.update({
      ...payload.query,
      where: payload.where,
      data: payload.data
    });

  //* D
}

export default UserService;

//* ==== Interfaces ==================================================================== *//

interface IWherePayload<T> {
  query?: T;
  where?: Prisma.UserWhereInput;
}

interface IUpdatePayload<T> extends Pick<IWherePayload<T>, 'query'> {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}
