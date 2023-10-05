import CustomTable  from "./Table";
import { TableHeaderData } from "../../../utils/usersConstants";

const  UsersList = () => {
  return (
    <CustomTable
      tableHeaderData={TableHeaderData}
    />
  );
}

export default UsersList ;
