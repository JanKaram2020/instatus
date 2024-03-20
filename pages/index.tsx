import { Inter } from "next/font/google";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FormattedEvent } from "@/lib/format-event";

const inter = Inter({ subsets: ["latin"] });

export default function Home(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <pre className={"overflow-x-scroll max-w-full break-words"}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}

export const getServerSideProps = (async () => {
  try {
    const eventsRes = await fetch("http://localhost:3000/api/events");
    const data: { events: FormattedEvent[]; length: number } =
      await eventsRes.json();
    console.log(data);
    return { props: data };
  } catch (e) {
    return { props: { events: null, length: null } };
  }
}) satisfies GetServerSideProps<
  { events: FormattedEvent[]; length: number } | { events: null; length: null }
>;
