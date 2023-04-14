import type { IDepartment } from '#/models/department';
import type { IRole } from './role';

export interface IVacationUser {
  availableVacationDaysNow: number;
  availableVacationDaysEndYear: number;
  usedDaysVacationNow: number;
  usedDaysVacationThisYear: number;
}

export interface IUserSkill {
  id: string;
  name: string;
  level: string;
}

export interface IUserSkillGroup {
  id: number;
  name: string;
  isActive: boolean;
  userSkills: IUserSkill[];
}

export interface IChief {
  id: string | number;
  name: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  chiefs: IChief[];
  city: string;
  departments: IDepartment[];
  employmentDate: string;
  login: string;
  mobile: string;
  telegramUserName: string;
}

export interface IUser {
  id: string;
  password: string;
  login: string;
  city: string;

  avatar?: string;
  firstName?: string;
  lastName?: string;
  telegramUserName?: string;
  mobile?: string;
  personalMail?: string;

  birthDate?: Date;
  dismissalDate?: Date;
  employmentDate: Date;
  createdAt: Date;
  updatedAt: Date;

  chiefs: IChief[];
  vacationUser: IVacationUser;
  departments: IDepartment[];
  skills: IUserSkillGroup[];
  role: IRole;
}
