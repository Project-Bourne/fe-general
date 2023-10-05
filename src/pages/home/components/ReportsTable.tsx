import { useTruncate } from "@/components/custom-hooks";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import refresh from "../../../assets/icons/refresh.svg";
import down from "../../../assets/icons/down.svg";

function ReportsTable({ tableBodyData, showReportDetails }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    // make refresh request to APi
    setIsRefreshing(true);
  };

  const handleShowDetails = () => {
    // show report details modal when useOnClickOutside
    showReportDetails();
  };

  return (
    <TableContainer component={Paper} className="shadow-sm border-r-0">
      <Table sx={{ minWidth: 650 }}>
        <TableHead className="bg-gray-50">
          <TableRow>
            <TableCell>
              <div className="flex gap-x-5">
                <Image
                  src={refresh}
                  alt="refresh"
                  onClick={handleRefresh}
                  className={`${isRefreshing && "animate-spin"}`}
                />
              </div>
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <div className="flex gap-x-3 justify-end">
                <p>{`${`1 - 50`} of ${1000}`} &nbsp;</p>
                <div className="flex gap-x-3">
                  <Image
                    src={down}
                    alt=""
                    className="transform rotate-90"
                    height={20}
                    width={20}
                  />
                  <Image
                    src={down}
                    alt=""
                    className="transform -rotate-90"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        {tableBodyData?.length > 0 ? (
          <>
            <TableBody>
              {tableBodyData?.map((item) => (
                <TableRow
                  onClick={handleShowDetails}
                  key={item?.id}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="text-xs capitalize hover:cursor-pointer">
                    <Link href={`users/${item?.id}`}>{item?.name}</Link>
                  </TableCell>
                  <TableCell className="text-xs capitalize">
                    <span className="flex justify-center">
                      Highlights:&nbsp;
                      {item?.highlight && useTruncate(item?.highlight, 30)}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs capitalize">
                    <span className="flex justify-center">{item?.date}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="p-5">
                No data available
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export default ReportsTable;
