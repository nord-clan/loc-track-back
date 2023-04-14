import type { Prisma } from '@prisma/client';
import prisma from '#/prisma';

type NodeCreateInput = Omit<
  Prisma.Without<Prisma.NodeCreateInput, Prisma.NodeUncheckedCreateInput> &
    Prisma.NodeUncheckedCreateInput,
  'nodeType'
>;

class NodeService {
  //* C
  post = async <TData>(data: TData) => prisma.node.create({ data: data as NodeCreateInput });

  //* R
  getAll = async <TQuery>(query?: TQuery) => {
    const data = await prisma.node.findMany({ ...query } as Prisma.NodeFindManyArgs);

    return data;
  };

  getAllByWhere = async <TQuery>(payload: IWherePayload<TQuery>) =>
    prisma.node.findMany({ ...payload.query, where: payload.where });

  getByWhere = async <TQuery>(payload: IWherePayload<TQuery>) =>
    prisma.node.findFirstOrThrow({ ...payload.query, where: payload.where });

  //* U
  updateByWhere = async (id: string, data: Partial<NodeCreateInput>) =>
    prisma.node.update({
      data,
      where: { id }
    });

  updateManyByWhere = async <TQuery>(payload: IWherePayload<TQuery>, data: NodeCreateInput[]) =>
    prisma.node.updateMany({ ...payload.query, where: payload.where, data });

  //* D
  deleteManyByWhere = async <TQuery>(payload: IWherePayload<TQuery>) =>
    prisma.node.deleteMany({ ...payload.query, where: payload.where });
}

export default NodeService;

//* ==== Interfaces ==================================================================== *//

interface IWherePayload<TQuery> {
  query?: TQuery;
  where?: Prisma.NodeWhereInput;
}
