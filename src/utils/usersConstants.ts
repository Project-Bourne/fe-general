import { LogDataModel, TableBodyDataModel } from "./mainUsers.module";
interface TabHeaderModel {
  id: number;
  icon?: string;
  title: string;
}

export const TabHeaderData: TabHeaderModel[] = [
  {
    id: 0,
    title: "Pending Users",
  },
  {
    id: 1,
    title: "All Users",
  },
  {
    id: 2,
    title: "Station Officers",
  },
  {
    id: 3,
    title: "Desk Officers",
  },
  {
    id: 4,
    title: "Admin",
  },
  {
    id: 5,
    title: "Supervisor",
  },
];

export const TableHeaderData: string[] = [
  "User name",
  "Roles",
  "Designation",
  "Status",
  "Action",
];

// export const TableBodyData: TableBodyDataModel[] = [
// ];


export const LogsData = [
  {
    date: "12/12/2020",
    data: [
      {
        id: 0,
        docId: "0qw",
        action: "Uploaded documents to SIRP",
        activity:
          "Redesigned Naira: CBN launches Cash Swap Programme for rural",
        time: "9:00PM",
      },
      {
        id: 1,
        docId: "0qw",
        action: "Uploaded documents to SIRP",
        activity:
          "Redesigned Naira: CBN launches Cash Swap Programme for rural",
        time: "9:00PM",
      },
    ],
  },
  {
    date: "12/12/2020",
    data: [
      {
        id: 2,
        docId: "0qw",
        action: "Uploaded documents to SIRP",
        activity:
          "Redesigned Naira: CBN launches Cash Swap Programme for rural",
        time: "9:00PM",
      },
      {
        id: 3,
        docId: "0qw",
        action: "Uploaded documents to SIRP",
        activity:
          "Redesigned Naira: CBN launches Cash Swap Programme for rural",
        time: "9:00PM",
      },
    ],
  },
  {
    date: "12/12/2020",
    data: [
      {
        id: 4,
        docId: "0qw",
        action: "Uploaded documents to SIRP",
        activity:
          "Redesigned Naira: CBN launches Cash Swap Programme for rural",
        time: "9:00PM",
      },
      {
        id: 5,
        docId: "0qw",
        action: "Uploaded documents to SIRP",
        activity:
          "Redesigned Naira: CBN launches Cash Swap Programme for rural",
        time: "9:00PM",
      },
    ],
  },
];
