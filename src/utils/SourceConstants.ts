import { LogDataModel, TableBodyDataModel } from "./source.module";
interface TabHeaderModel {
  id: number;
  icon?: string;
  title: string;
}

export const SourcesTableHeaderData: string[] = [
  "Source name",
  "Source URL",
  "Weight",
  "Crawl",
  "Actions"
];
