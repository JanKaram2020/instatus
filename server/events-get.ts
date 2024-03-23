import type { NextApiRequest, NextApiResponse } from "next";
import {
  defaultCount,
  defaultFrom,
  GetEventsParamsScheme,
  GetResponse,
} from "@/lib/schemas/get-events";
import prisma from "@/prisma";
import { formatEvent } from "@/lib/format-event";
export const GetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetResponse>,
) => {
  if (!req.query) {
    const events = await prisma.events.findMany({
      take: defaultCount,
      skip: defaultFrom,
    });
    const eventsCount = await prisma.events.count();

    return res
      .status(200)
      .json({ data: { events: events.map(formatEvent), total: eventsCount } });
  }
  const params = GetEventsParamsScheme.safeParse(req.query);
  if (params.success) {
    if ("id" in params.data) {
      const event = await prisma.events.findUnique({
        where: {
          id: params.data.id,
        },
      });
      if (!event) {
        return res
          .status(404)
          .json({ error: "No Event with matching id found" });
      }
      return res.status(200).json({ data: formatEvent(event) });
    } else {
      const whereCondition = {
        contains: params.data.search,
        mode: "insensitive" as unknown as undefined,
      };
      const where = {
        OR: [
          {
            actor_id: whereCondition,
          },
          {
            target_id: whereCondition,
          },
          {
            action_id: whereCondition,
          },
          {
            action_name: whereCondition,
          },
          {
            actor_name: whereCondition,
          },
        ],
      };

      const eventsCount = await prisma.events.count({
        where,
      });

      const events = await prisma.events.findMany({
        take: params.data.count,
        skip: params.data.from,
        where,
      });

      return res.status(200).json({
        data: { events: events.map(formatEvent), total: eventsCount },
      });
    }
  }
  return res.status(401).json({ error: params.error.toString() });
};
