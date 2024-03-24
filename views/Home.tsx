import useGetEvents from "@/lib/useGetEvents";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, getRandomGradient } from "@/lib/utils";
import NextLink from "next/link";
import TableSkeletonRow from "@/components/table-skeleton-row";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    list,
    errorMessage,
    isLoading,
    loadMore,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
  } = useGetEvents();

  if (isLoading) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-6 lg:p-24 overflow-x-scroll`}
      >
        <TableSkeleton />
      </main>
    );
  }

  if (errorMessage || !list) {
    return (
      <main
        className={`flex min-h-screen items-center justify-center flex-col p-6 gap-6 lg:p-24 overflow-x-scroll`}
      >
        <h1 className={"text-8xl"}>Instalog</h1>
        <h2 className={"text-xl whitespace-pre"}>{errorMessage}</h2>
        <Button onClick={() => window.location.reload()}>
          Reload the Page
        </Button>
      </main>
    );
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-6 lg:p-24 overflow-x-scroll`}
    >
      <Table className={"rounded-lg bg-gray-100"}>
        <TableHeader>
          <TableRow>
            <TableHead>Actor</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((e) => {
            return (
              <TableRow key={e.id} className={"bg-white"}>
                <TableCell className="font-medium">
                  <div className={"flex gap-4"}>
                    <div
                      className={`rounded-full size-6 flex justify-center items-center text-white ${getRandomGradient()}`}
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
                  <NextLink href={"/" + e.id}>={">"}</NextLink>
                </TableCell>
              </TableRow>
            );
          })}
          {isLoadingMore
            ? Array.from(Array(10).keys()).map((n) => (
                <TableSkeletonRow key={n} />
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
                {isLoadingMore
                  ? "loading..."
                  : isReachingEnd
                    ? "no more events"
                    : "load more"}
              </button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}
