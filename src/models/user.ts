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
  telegram: string;
}

export interface IUser {
  id: string;
  password: string;
  login: string;
  city: string;

  avatar?: string;
  firstName?: string;
  lastName?: string;
  telegram?: string;
  mobile?: string;
  emailPersonal?: string;
  emailSecondary?: string;
  country?: string;
  status?: string;
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

export interface IUserTrack {
  fullNameRu: string;
  fullNameEn: string;
  id: number;
  firstNameRu: string;
  lastNameRu: string;
  middleNameRu: string;
  lastNameEn: string;
  firstNameEn: string;
  middleNameEn: string;
  telegram: string;
  skype: string;
  supervisorId: string;
  birthDate: Date;
  city: string;
  company: string;
  emailPrimary: string;
  emailSecondary: string;
  employmentDate: Date;
  phone: string;
  mobile: string;
  photo: string;
  psId: string;
  deletedAt: Date;
  globalRole: string;
  expiredDate: Date;
  isActive: boolean;
  active: number;
  allowVPN: boolean;
  deleteDate: Date;
  externalUserType: string;
  password: string;
  isTest: boolean;
  createdAt: Date;
}
