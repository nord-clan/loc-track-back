/* eslint-disable no-unused-vars */
import type { IDepartment } from '#/models/department';

export interface IAdministrator {
  email: string;
  enabled: boolean;
  login: string;
  id: number;
  name: string;
  role: IRole;
  groupDepartments: IGroupDepartment[];
}

export interface IGroupDepartment {
  groupsDepartments: IDepartment[];
}

export interface ICreateAdministration {
  email: string;
  name?: string;
  roleId?: number;
  groupsDepartments: number[][];
}

export type UpdateAdministration = Pick<ICreateAdministration, 'roleId' | 'groupsDepartments'>;

export interface IRole {
  id: number;
  name: UserRoles;
  privileges: IAdministrationRoles[];
}

export interface IAdministrationRoles {
  id: number;
  name: string;
}

export const userAvailableRoles = [
  'ROLE_ADMIN',
  'ROLE_HR',
  'ROLE_ACCOUNT',
  'ROLE_USER',
  'ROLE_HEAD'
];

export enum UserRoles {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_HR = 'ROLE_HR',
  ROLE_ACCOUNT = 'ROLE_ACCOUNT',
  ROLE_USER = 'ROLE_USER',
  ROLE_HEAD = 'ROLE_HEAD'
}
