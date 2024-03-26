import type { NextApiRequest, NextApiResponse } from "next";
import { listEvents } from "@/lib/Instalog";
import {
  GetEventsParamsScheme,
  GetEventsResponseType,
} from "@/lib/schemas/get-events";

export const GetEventHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetEventsResponseType>,
) => {
  if (!req.query) {
    const eventsRes = await listEvents();
    if (typeof eventsRes === "string") {
      return res.status(400).json({ error: eventsRes });
    }
    const { events, totalPages } = eventsRes;
    return res.status(200).json({ data: { events, totalPages } });
  }

  const params = GetEventsParamsScheme.safeParse(req.query);

  if (params.success) {
    const eventsRes = await listEvents({
      search: params.data.search,
      count: params.data.count,
      page: params.data.page,
    });

    if (typeof eventsRes === "string") {
      return res.status(400).json({
        error: eventsRes,
      });
    }

    return res.status(200).json({
      data: eventsRes,
    });
  }

  return res.status(401).json({ error: params.error.toString() });
};
