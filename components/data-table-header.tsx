import React from "react";
import { Input } from "@/components/ui/input";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
const DataTableHeader = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) => {
  return (
    <TableHeader>
      <TableRow>
        <td colSpan={4}>
          <div className={"p-2"}>
            <Input
              autoFocus
              className={"w-full"}
              id="search"
              placeholder="Search name, email, or action..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value ?? "");
              }}
            />
          </div>
        </td>
      </TableRow>
      <TableRow>
        <TableHead>Actor</TableHead>
        <TableHead>Action</TableHead>
        <TableHead>Date</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default DataTableHeader;
