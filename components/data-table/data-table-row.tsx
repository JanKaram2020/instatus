import React, { useMemo } from "react";
import { FormattedEvent } from "@/lib/format-event";
import { formatDate, getRandomGradient } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const DataTableRow = (e: FormattedEvent) => {
  const gradientClass = useMemo(() => getRandomGradient(), []);

  return (
    <AccordionItem value={e.id + ""}>
      <AccordionTrigger asChild>
        <TableRow
          className={"bg-white hover:bg-muted/50 grid grid-cols-table group"}
        >
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
            <div className={"flex items-center justify-center size-6"}>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-aria-expanded:rotate-180" />
            </div>
          </TableCell>
        </TableRow>
      </AccordionTrigger>
      <AccordionContent>
        <TableRow
          className={`border-b-0 transition-opacity delay-100 duration-300 ease-in-out grid grid-cols-table`}
        >
          <TableCell>
            <p
              className={
                "text-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 mb-2"
              }
            >
              Actor
            </p>
            <div className="grid grid-cols-[12ch_1fr] odd:*:text-muted-foreground">
              <p>ID</p>
              <p>{e.actor_id}</p>
              <p>Name</p>
              <p>{e.actor_name}</p>
            </div>
          </TableCell>
          <TableCell>
            <p
              className={
                "text-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 mb-2"
              }
            >
              Action
            </p>
            <div className="grid grid-cols-[12ch_1fr] odd:*:text-muted-foreground">
              {Object.keys(e.action).map((k) => {
                return (
                  <>
                    <p className={"capitalize"}>
                      {k.length === 2 ? k.toUpperCase() : k}
                    </p>
                    <p>{e.action[k as keyof typeof e.action]}</p>
                  </>
                );
              })}
            </div>
          </TableCell>
          <TableCell colSpan={2}>
            <p
              className={
                "text-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 mb-2"
              }
            >
              Date
            </p>
            <div className="grid grid-cols-[12ch_1fr] odd:*:text-muted-foreground">
              <p>Readable</p>
              <p>{e.occurred_at}</p>
            </div>
          </TableCell>
        </TableRow>
        <TableRow
          className={`transform transition-opacity delay-100 duration-300 ease-in-out grid grid-cols-table`}
        >
          <TableCell>
            <p
              className={
                "text-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 mb-2"
              }
            >
              Metdata
            </p>
            <div className="grid grid-cols-[12ch_1fr] odd:*:text-muted-foreground">
              {Object.keys(e.metadata).map((k) => {
                return (
                  <>
                    <p className={"capitalize"}>
                      {k.length === 2 ? k.toUpperCase() : k}
                    </p>
                    <p>{e.metadata[k as keyof typeof e.metadata]}</p>
                  </>
                );
              })}
            </div>
          </TableCell>
          <TableCell colSpan={3}>
            <p
              className={
                "text-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 mb-2"
              }
            >
              Target
            </p>
            <div className="grid grid-cols-[12ch_1fr] odd:*:text-muted-foreground">
              <p className={"capitalize"}>ID</p>
              <p>{e.target_id}</p>
              <p className={"capitalize"}>Name</p>
              <p>{e.target_name}</p>
            </div>
          </TableCell>
        </TableRow>
      </AccordionContent>
    </AccordionItem>
  );
};
export default DataTableRow;
