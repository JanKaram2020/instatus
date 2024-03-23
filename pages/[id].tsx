import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  GetSingleEventParamsScheme,
  GetSingleEventResponseType,
} from "@/lib/schemas/get-single-event";
import { getEvent } from "@/lib/Instalog";

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
    const event = await getEvent(id);
    if (typeof event === "string") {
      return {
        props: { error: event },
      };
    }
    return { props: { data: event } };
  } catch (e) {
    return { props: { error: JSON.stringify(e) } };
  }
}) satisfies GetServerSideProps<GetSingleEventResponseType>;
