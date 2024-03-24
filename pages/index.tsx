import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SWRConfig } from "swr";
import {
  GetEventsParamsScheme,
  GetEventsResponseType,
} from "@/lib/schemas/get-events";
import { listEvents } from "@/lib/Instalog";
import { useRouter } from "next/router";
import Home from "@/views/Home";

export default function HomeSwrWrapper(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const search = useRouter().query.search;
  const searchQuery = search ? String(search) : "";

  return (
    <SWRConfig
      value={{
        fallback: {
          ["api/events?page=0" + searchQuery]: data,
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
