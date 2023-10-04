import { LogDataModel, TableBodyDataModel } from "../models/users.module";
interface TabHeaderModel {
  id: number;
  icon?: string;
  title: string;
}

export const SourcesTableHeaderData: string[] = [
  "Source name",
  "Source URL",
  "Weight",
];
