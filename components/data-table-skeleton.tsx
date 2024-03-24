import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import DataTableSkeletonRow from "@/components/data-table-skeleton-row";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultCount } from "@/lib/constants";
import DataTableHeader from "@/components/data-table-header";

const DataTableSkeleton = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) => {
  return (
    <Table className={"rounded-lg bg-gray-100"}>
      <DataTableHeader search={search} setSearch={setSearch} />
      <TableBody>
        {Array.from(Array(defaultCount).keys()).map((e) => {
          return <DataTableSkeletonRow key={e} />;
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

export default DataTableSkeleton;
