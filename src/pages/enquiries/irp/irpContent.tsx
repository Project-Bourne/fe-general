import Link from "next/link";
import { ActivityCardModel } from "@/global/users.module";
import { TableRow, TableCell } from "@mui/material";

const IrpContent = ({
  time,
  actionText, 
  moduleName,
  userName
}: ActivityCardModel) => {
  return (
    <TableRow
      key={Date.parse(time)}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      className="bg-white !hover:bg-grey-600 !hover:text-white !transition-all !duration-3000 cursor-pointer"
    >
      <TableCell component="th" scope="row">
        {userName}
      </TableCell>
      <TableCell align="right">{actionText}</TableCell>
      <TableCell align="right">
        <h2 className="inline-block rounded-2xl border-[1px] border-gray-300 bg-white mb-2 px-2 py-1 text-[14px]">
          {moduleName}
        </h2>
      </TableCell>
      <TableCell align="right">{time}</TableCell>
    </TableRow>
  );
};

export default IrpContent;
