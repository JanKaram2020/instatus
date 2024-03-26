import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SWRConfig } from "swr";
import {
  GetEventsParamsScheme,
  GetEventsResponseType,
} from "@/lib/schemas/get-events";
import { listEvents } from "@/lib/Instalog";
import { useRouter } from "next/router";
import useGetEvents from "@/lib/use-get-events";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table/data-table";

function Home() {
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

export default function HomeSwrWrapper(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const search = useRouter().query.search;
  const searchQuery = search ? String(search) : "";

  return (
    <SWRConfig
      value={{
        fallback: {
          ["api/events?page=0&search=" + searchQuery]: data,
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
}
export const getServerSideProps = (async ({ query }) => {
  const verifyParams = GetEventsParamsScheme.safeParse(query);

  if (!verifyParams.success) {
    return { props: { error: "wrong params provided" } };
  }
  const { count, search } = verifyParams.data;
  try {
    const events = await listEvents({ count, search });
    if (typeof events === "string") {
      return { props: { error: events } };
    }
    return { props: { data: events } };
  } catch (e) {
    return { props: { error: JSON.stringify(e) } };
  }
}) satisfies GetServerSideProps<GetEventsResponseType>;
