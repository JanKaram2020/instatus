import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  GetSingleEventParamsScheme,
  GetSingleEventResponseType,
} from "@/lib/schemas/get-single-event";
import { getEvent } from "@/lib/Instalog";
import Event from "@/views/events";
export default Event;

export type IdPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
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
