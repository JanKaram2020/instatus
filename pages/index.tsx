import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import {
  GetEventsParamsScheme,
  GetEventsResponseType,
} from "@/lib/schemas/get-events";
import { listEvents } from "@/lib/Instalog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, getRandomGradient } from "@/lib/utils";

export default function Home(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  if (data.error) {
    return <p>{data.error}</p>;
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <Table className={"rounded-lg bg-gray-100"}>
        <TableHeader>
          <TableRow>
            <TableHead>Actor</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data?.events.map((e) => {
            return (
              <TableRow key={e.id} className={"bg-white"}>
                <TableCell className="font-medium">
                  <div className={"flex gap-4"}>
                    <div
                      className={`rounded-full size-6 flex justify-center items-center text-white ${getRandomGradient()}`}
                    >
                      {e.actor_name.substring(0, 1)}
                    </div>
                    <p>{e.actor_name}</p>
                  </div>
                </TableCell>
                <TableCell>{e.action.name}</TableCell>
                <TableCell suppressHydrationWarning>
                  {formatDate(e.occurred_at)}
                </TableCell>
                <TableCell>
                  <NextLink href={"/" + e.id}>={">"}</NextLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className={"text-center"}>
              <button className={"w-full"} onClick={() => alert("load")}>
                Load More
              </button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
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
