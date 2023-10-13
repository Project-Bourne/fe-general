import { LogDataModel, TableBodyDataModel } from "./users.module";
interface TabHeaderModel {
  id: number;
  icon?: string;
  title: string;
}

export const SourcesTableHeaderData: string[] = [
  "Document name",
  "Document type",
  "Classified",
  "Date",
  "Action"
];
