import type { Prisma } from '@prisma/client';
import prisma from '#/prisma';

class OfficeService {
  //* C
  post = async (data: Prisma.OfficeCreateInput) => prisma.office.create({ data });

  //* R
  getAllByWhere = async <TQuery>(payload: IReadPayload<TQuery>) =>
    prisma.office.findMany({ ...payload.query, where: payload.where });

  getByWhere = async <TQuery>(payload: IReadPayload<TQuery>) =>
    prisma.office.findFirstOrThrow({ ...payload.query, where: payload.where });

  //* U
  //* D
}

export default OfficeService;

//* ==== Interfaces ==================================================================== *//
//TODO
interface IReadPayload<TQuery> {
  query?: TQuery;
  where?: Prisma.OfficeWhereInput;
}
