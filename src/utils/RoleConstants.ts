import { LogDataModel, TableBodyDataModel } from "./source.module";
interface TabHeaderModel {
  id: number;
  icon?: string;
  title: string;
}

export const RolesTableHeaderData: string[] = [
  "Role name",
  "Permissions",
  "Level",
  "Actions"
];
