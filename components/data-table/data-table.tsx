import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableRow from "@/components/data-table/data-table-row";
import DataTableSkeletonRow from "@/components/data-table/data-table-skeleton-row";
import { type UseGetEventsReturnType } from "@/lib/use-get-events";
import { defaultCount } from "@/lib/constants";

const DataTable = (props: DataTableProps) => {
  const {
    list,
    loadMore,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    search,
    setSearch,
  } = props;

  return (
    <Table className={"rounded-lg bg-gray-100"}>
      <DataTableHeader search={search} setSearch={setSearch} list={list} />
      <TableBody>
        {list.map((e) => {
          return <DataTableRow {...e} key={e.id} />;
        })}
        {isLoadingMore
          ? Array.from(Array(defaultCount).keys()).map((n) => (
              <DataTableSkeletonRow key={n} />
            ))
          : null}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className={"text-center"}>
            <button
              className={"w-full"}
              disabled={isLoadingMore || isReachingEnd || isRefreshing}
              onClick={() => {
                loadMore();
              }}
            >
              {list.length === 0
                ? "No events found"
                : isLoadingMore
                  ? "loading..."
                  : isReachingEnd
                    ? "no more events"
                    : "load more"}
            </button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DataTable;

type Props = Omit<
  UseGetEventsReturnType,
  "errorMessage" | "isLoading" | "isEmpty"
>;
type List = Exclude<Props["list"], undefined>;
type DataTableProps = Omit<Props, "list"> & { list: List };
