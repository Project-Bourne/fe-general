import { CustomTable } from "../components";
import { SourcesTableHeaderData } from "../utils/constants";

function UsersList({ tableData, usertype }) {
  return (
    <CustomTable
      tableHeaderData={SourcesTableHeaderData}
      tableBodyData={tableData}
      rowsPerPage={10}
      usertype={usertype}
    />
  );
}

export { UsersList };
