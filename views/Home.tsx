import useGetEvents from "@/lib/useGetEvents";
import DataTableSkeleton from "@/components/data-table-skeleton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";

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
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-6 lg:p-24 overflow-x-scroll`}
      >
        <DataTableSkeleton search={search} setSearch={setSearch} />
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
    </main>
  );
}
