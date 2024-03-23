import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FormattedEvent } from "@/lib/format-event";
import { SingleEventScheme } from "@/lib/schemas/get-events";

export default function Home(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <pre className={"overflow-x-scroll max-w-full break-words"}>
        {JSON.stringify(data.data, null, 2)}
      </pre>
    </main>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const validateParams = SingleEventScheme.safeParse(query);
  if (!validateParams.success) {
    return { props: { data: null } };
  }
  try {
    const eventsRes = await fetch(
      "http://localhost:3000/api/events?id=" + validateParams.data.id,
    );
    const data: FormattedEvent = await eventsRes.json();
    return { props: { data } };
  } catch (e) {
    return { props: { data: null } };
  }
}) satisfies GetServerSideProps<{ data: FormattedEvent | null }>;
