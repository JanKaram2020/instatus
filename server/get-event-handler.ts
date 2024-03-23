import type { NextApiRequest, NextApiResponse } from "next";
import {
  GetEventsApiParamsScheme,
  GetResponse,
} from "@/lib/schemas/get-events-api";
import { getEvent, listEvents } from "@/lib/Instalog";

export const GetEventHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetResponse>,
) => {
  if (!req.query) {
    const eventsRes = await listEvents();
    if (typeof eventsRes === "string") {
      return res.status(400).json({ error: eventsRes });
    }
    const { events, total } = eventsRes;
    return res.status(200).json({ data: { events, total } });
  }

  const params = GetEventsApiParamsScheme.safeParse(req.query);

  if (params.success) {
    if ("id" in params.data) {
      const eventRes = await getEvent(params.data.id);

      if (typeof eventRes === "string") {
        return res.status(400).json({ error: eventRes });
      }

      return res.status(200).json({ data: eventRes });
    } else {
      const eventsRes = await listEvents({
        search: params.data.search,
        count: params.data.count,
        from: params.data.from,
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
  }

  return res.status(401).json({ error: params.error.toString() });
};
