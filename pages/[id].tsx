import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  GetResponse,
  GetResponseScheme,
  SingleEventScheme,
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
  const validateParams = SingleEventScheme.safeParse(query);
  if (!validateParams.success) {
    return { props: { error: validateParams.error.toString() } };
  }
  try {
    const eventsRes = await fetch(
      "http://localhost:3000/api/events?id=" + validateParams.data.id,
    );
    const data = await eventsRes.json();
    const validateRes = GetResponseScheme.safeParse(data);
    if (!validateRes.success) {
      return { props: { error: validateRes.error.toString() } };
    }
    return { props: validateRes.data };
  } catch (e) {
    return { props: { error: JSON.stringify(e) } };
  }
}) satisfies GetServerSideProps<GetResponse>;
