import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma";
import { formatEvent } from "@/lib/format-event";
import {
  GetEventsApiParamsScheme,
  GetResponse,
} from "@/lib/schemas/get-events-api";
import { defaultCount, defaultFrom } from "@/lib/constants";
export const getEvents = async (params?: {
  search: string;
  count: number;
  from: number;
}) => {
  const search = params?.search ?? "";
  const count = params?.count ?? defaultCount;
  const from = params?.from ?? defaultFrom;

  const whereCondition = {
    contains: search,
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
    take: count,
    skip: from,
    where,
  });

  return { events: events.map(formatEvent), total: eventsCount };
};
export const getSingleEvent = async (id: number) => {
  const event = await prisma.events.findUnique({
    where: {
      id,
    },
  });

  if (!event) return undefined;
  return formatEvent(event);
};

export const GetHandler = async (
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
