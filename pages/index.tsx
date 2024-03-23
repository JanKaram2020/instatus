import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  GetEventsParamsScheme,
  GetEventsResponseType,
} from "@/lib/schemas/get-events";
import { listEvents } from "@/lib/Instalog";

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
