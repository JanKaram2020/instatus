import type { NextApiRequest, NextApiResponse } from "next";
import {
  GetEventsApiParamsScheme,
  GetResponse,
} from "@/lib/schemas/get-events-api";
import { getEvents, getSingleEvent } from "@/server/get-events-fns";

export const GetEventHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetResponse>,
) => {
  if (!req.query) {
    const { events, total } = await getEvents();

    return res.status(200).json({ data: { events, total } });
  }

  const params = GetEventsApiParamsScheme.safeParse(req.query);

  if (params.success) {
    if ("id" in params.data) {
      const event = await getSingleEvent(params.data.id);

      if (!event) {
        return res
          .status(404)
          .json({ error: "No Event with matching id found" });
      }

      return res.status(200).json({ data: event });
    } else {
      const { events, total } = await getEvents({
        search: params.data.search,
        count: params.data.count,
        from: params.data.from,
      });

      return res.status(200).json({
        data: { events, total },
      });
    }
  }

  return res.status(401).json({ error: params.error.toString() });
};
