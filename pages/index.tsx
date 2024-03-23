import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  GetEventsParamsScheme,
  GetEventsResponseScheme,
  GetEventsResponseType,
} from "@/lib/schemas/get-events";

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
    const queryParams = new URLSearchParams(
      verifyParams.data as unknown as Record<string, string>,
    ).toString();

    const eventsRes = await fetch(
      "http://localhost:3000/api/events?" + queryParams,
    );
    const data = await eventsRes.json();

    const validateRes = GetEventsResponseScheme.safeParse(data);

    if (!validateRes.success) {
      return { props: { error: validateRes.error.toString() } };
    }

    return { props: validateRes.data };
  } catch (e) {
    return { props: { error: JSON.stringify(e) } };
  }
}) satisfies GetServerSideProps<GetEventsResponseType>;
