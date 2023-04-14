import type { INode } from './node';
import type { IUser } from './user';

export interface IUsersOnNode {
  id: string;

  nodeId: string;
  userId: string;

  createdAt?: Date;
  activationAt: Date;
  deactivationAt?: Date;

  node: INode;
  user: IUser;
}
