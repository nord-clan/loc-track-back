import type { Prisma } from '@prisma/client';
import prisma from '#/prisma';

class LayerService {
  //* C
  //* R
  getAll = async <T>(payload?: T) =>
    prisma.layer.findMany({ ...payload } as Prisma.LayerFindManyArgs);

  getAllByWhere = async <T>(payload: IWherePayload<T>) =>
    prisma.layer.findMany({ ...payload.query, where: payload.where });

  getByWhere = async <T>(payload: IWherePayload<T>) =>
    prisma.layer.findFirstOrThrow({ ...payload.query, where: payload.where });

  //* U
  //* D
}

export default LayerService;

//* ==== Interfaces ==================================================================== *//
interface IWherePayload<T> {
  query?: T;
  where?: Prisma.LayerWhereInput;
}
