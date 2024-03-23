import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  GetEventsParamsScheme,
  GetEventsResponseType,
} from "@/lib/schemas/get-events";
import { getEvents } from "@/server/get-events-fns";

export default function Home(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <pre className={"overflow-x-scroll max-w-full break-words"}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const verifyParams = GetEventsParamsScheme.safeParse(query);

  if (!verifyParams.success) {
    return { props: { error: "wrong params provided" } };
  }

  try {
    const events = await getEvents(verifyParams.data);

    return { props: { data: events } };
  } catch (e) {
    return { props: { error: JSON.stringify(e) } };
  }
}) satisfies GetServerSideProps<GetEventsResponseType>;
