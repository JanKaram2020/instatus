import React, { useMemo } from "react";
import { FormattedEvent } from "@/lib/format-event";
import { formatDate, getRandomGradient } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import NextLink from "next/link";
import Image from "next/image";

const DataTableRow = (e: FormattedEvent) => {
  const gradientClass = useMemo(() => getRandomGradient(), []);

  return (
    <TableRow className={"bg-white"}>
      <TableCell className="font-medium">
        <div className={"flex gap-4"}>
          <div
            className={`rounded-full size-6 flex justify-center items-center text-white ${gradientClass}`}
          >
            {e.actor_name.substring(0, 1)}
          </div>
          <p>{e.actor_name}</p>
        </div>
      </TableCell>
      <TableCell>{e.action.name}</TableCell>
      <TableCell suppressHydrationWarning>
        {formatDate(e.occurred_at)}
      </TableCell>
      <TableCell>
        <NextLink
          href={"/" + e.id}
          className={
            "flex items-center justify-center size-6 hover:filter hover:invert"
          }
        >
          <Image src={"/right-arrow.svg"} alt={"arrow"} width={7} height={7} />
        </NextLink>
      </TableCell>
    </TableRow>
  );
};
export default DataTableRow;
