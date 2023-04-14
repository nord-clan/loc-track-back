export const departmentTypes = ['none', 'department', 'office', 'subdivision'] as const;
export type DepartmentType = (typeof departmentTypes)[number];

export interface IDepartment {
  id: string | number;
  name: string;
  type?: DepartmentType;
}
