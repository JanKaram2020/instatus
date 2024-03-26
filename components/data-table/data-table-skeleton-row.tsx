import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { getRandomGradient } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const DataTableSkeletonRow = () => {
  return (
    <TableRow className={"bg-white grid grid-cols-table"}>
      <TableCell className="font-medium">
        <div className={"flex gap-4"}>
          <div
            className={`rounded-full size-6 flex justify-center items-center text-white ${getRandomGradient()}`}
          >
            <Skeleton className={"w-full h-full rounded-full"} />
          </div>
          <div>
            <Skeleton className={"w-full h-full min-h-6 min-w-20 max-w-36	"} />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className={"w-full h-full min-h-6 min-w-20 max-w-36	"} />
      </TableCell>
      <TableCell>
        <Skeleton className={"w-full h-full min-h-6 min-w-20 max-w-36"} />
      </TableCell>
      <TableCell>
        <Skeleton className={"w-full h-full min-h-6"} />
      </TableCell>
    </TableRow>
  );
};

export default DataTableSkeletonRow;
