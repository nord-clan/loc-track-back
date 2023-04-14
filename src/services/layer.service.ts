import type { Prisma } from '@prisma/client';
import prisma from '#/prisma';

class LayerService {
  //* C
  //* R
  getAll = async <TQuery>(payload?: TQuery) =>
    prisma.layer.findMany({ ...payload } as Prisma.LayerFindManyArgs);

  getAllByWhere = async <TQuery>(payload: IReadPayload<TQuery>) =>
    prisma.layer.findMany({ ...payload.query, where: payload.where });

  getByWhere = async <TQuery>(payload: IReadPayload<TQuery>) =>
    prisma.layer.findFirstOrThrow({ ...payload.query, where: payload.where });

  //* U
  //* D
}

export default LayerService;

//* ==== Interfaces ==================================================================== *//
interface IReadPayload<TQuery> {
  query?: TQuery;
  where?: Prisma.LayerWhereInput;
}
