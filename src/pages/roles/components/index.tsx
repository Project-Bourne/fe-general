import CustomTable from "./Table";
import { RolesTableHeaderData } from "../../../utils/RoleConstants";

const SourceList = () => {
  return (
    <>
      {/* <TopHeader /> */}
      <CustomTable tableHeaderData={RolesTableHeaderData} />
    </>
  );
};

export default SourceList;
