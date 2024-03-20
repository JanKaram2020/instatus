import type { NextApiRequest, NextApiResponse } from "next";
import {
  defaultCount,
  defaultFrom,
  GetEventsParamsScheme,
} from "@/lib/schemas/get-events";
import prisma from "@/prisma";
import { ZodError } from "zod";
import { formatEvent, FormattedEvent } from "@/lib/format-event";

export type GetResponse =
  | { error: string | ZodError }
  | {
      data: {
        events: FormattedEvent[];
        length: number;
      };
    };

export const GetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetResponse>,
) => {
  const params = GetEventsParamsScheme.safeParse(req.query);
  if (params.success) {
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

    res
      .status(200)
      .json({ data: { events: events.map(formatEvent), length: eventsCount } });
    return;
  }

  const events = await prisma.events.findMany({
    take: defaultCount,
    skip: defaultFrom,
  });
  const eventsCount = await prisma.events.count();

  res
    .status(200)
    .json({ data: { events: events.map(formatEvent), length: eventsCount } });
};
