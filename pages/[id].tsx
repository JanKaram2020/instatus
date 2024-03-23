import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  GetSingleEventParamsScheme,
  GetSingleEventResponseType,
} from "@/lib/schemas/get-single-event";
import { getSingleEvent } from "@/server/events-get";

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
  const validateParams = GetSingleEventParamsScheme.safeParse(query);
  if (!validateParams.success) {
    return { props: { error: validateParams.error.toString() } };
  }
  const { id } = validateParams.data;
  try {
    const event = await getSingleEvent(id);

    if (!event) {
      return {
        props: { error: `no event with id ${id} found` },
      };
    }
    return { props: { data: event } };
  } catch (e) {
    return { props: { error: JSON.stringify(e) } };
  }
}) satisfies GetServerSideProps<GetSingleEventResponseType>;
