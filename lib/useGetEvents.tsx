import { GetEventsResponseType } from "@/lib/schemas/get-events";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";

const useGetEvents = () => {
  const { query } = useRouter();
  const searchQuery = "search=" + (query.search ?? "");
  const getKey = (
    pageIndex: number,
    previousPageData: GetEventsResponseType,
  ) => {
    if (
      previousPageData &&
      ("error" in previousPageData || !previousPageData.data)
    ) {
      return null;
    }

    if (pageIndex > 0 && previousPageData.data.events.length === 0) {
      return null;
    }
    if (pageIndex === 0) return `/api/events?` + searchQuery;

    return `/api/events?page=${pageIndex}&${searchQuery}`;
  };
  const { data, error, isLoading, setSize, isValidating, size } =
    useSWRInfinite<GetEventsResponseType>(getKey, fetcher);

  const list = data?.map((d) => ("error" in d ? [] : d.data.events)).flat();

  const errorMessage = error
    ? "Error happened.\n try again later."
    : data?.[0] && "error" in data?.[0]
      ? data[0].error
      : undefined;

  const loadMore = () => {
    setSize((p) => p + 1);
  };

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const currentLength = list?.length ?? 0;

  const isEmpty = currentLength === 0;

  const isReachingEnd =
    isEmpty ||
    (data && data[0] && "data" in data[0] && size === data[0].data.totalPages);

  const isRefreshing = isValidating && data && data.length === size;

  return {
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    list,
    errorMessage,
    isLoading,
    loadMore,
  };
};

export default useGetEvents;
