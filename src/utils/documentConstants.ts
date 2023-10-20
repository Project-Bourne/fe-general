import { LogDataModel, TableBodyDataModel } from "./users.module";
interface TabHeaderModel {
  id: number;
  icon?: string;
  title: string;
}

export const SourcesTableHeaderData: string[] = [
  "Document Name",
  "Document Type",
  "Uploaded By",
  "Time Stamp",
  "Action"
];
