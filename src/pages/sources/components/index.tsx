import CustomTable from "./Table";
import { SourcesTableHeaderData } from "../../../utils/SourceConstants";

const SourceList = ({source}) => {
  return <CustomTable tableHeaderData={SourcesTableHeaderData} source={source} />;
};

export default SourceList;
