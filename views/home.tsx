import useGetEvents from "@/lib/use-get-events";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table/data-table";

export default function Home() {
  const {
    list,
    errorMessage,
    isLoading,
    loadMore,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    search,
    setSearch,
  } = useGetEvents();

  if (isLoading) {
    return <DataTableSkeleton search={search} setSearch={setSearch} />;
  }

  if (errorMessage || !list) {
    return (
      <>
        <h2 className={"text-xl whitespace-pre"}>{errorMessage}</h2>
        <Button onClick={() => window.location.reload()}>
          Reload the Page
        </Button>
      </>
    );
  }

  return (
    <DataTable
      {...{
        list,
        loadMore,
        isLoadingMore,
        isReachingEnd,
        isRefreshing,
        search,
        setSearch,
      }}
    />
  );
}
