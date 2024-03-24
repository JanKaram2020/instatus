import React from "react";
import { Input } from "@/components/ui/input";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FormattedEvent } from "@/lib/format-event";
import { downloadCSV } from "@/lib/download-csv";

const DataTableHeader = ({
  search,
  setSearch,
  list,
}: {
  search: string;
  setSearch: (v: string) => void;
  list?: FormattedEvent[];
}) => {
  return (
    <TableHeader>
      <TableRow>
        <td colSpan={4}>
          <div className={"p-2 flex flex-row gap-2"}>
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
            <Button
              disabled={!list}
              variant={"outline"}
              className={"flex flex-row items-center justify-center gap-1"}
              onClick={() => {
                if (list) {
                  downloadCSV(list);
                }
              }}
            >
              <Image
                src={"/download.png"}
                alt={"download"}
                width={20}
                height={20}
                className={"mb-1"}
              />
              <p>Export</p>
            </Button>
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
