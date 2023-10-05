import { CustomTable } from "../components";
import { SourcesTableHeaderData } from "../utils/constants";

function SourceList({ tableData, usertype }) {
  return (
    <CustomTable
      tableHeaderData={SourcesTableHeaderData}
      tableBodyData={tableData}
      rowsPerPage={10}
      usertype={usertype}
    />
  );
}

export { SourceList };
