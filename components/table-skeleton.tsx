import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonRow from "@/components/table-skeleton-row";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultCount } from "@/lib/constants";

const TableSkeleton = () => {
  return (
    <Table className={"rounded-lg bg-gray-100"}>
      <TableHeader>
        <TableRow>
          <TableHead>Actor</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from(Array(defaultCount).keys()).map((e) => {
          return <TableSkeletonRow key={e} />;
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className={"text-center"}>
            <Skeleton className={"h-5"} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableSkeleton;
