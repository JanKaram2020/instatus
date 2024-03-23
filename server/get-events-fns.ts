import { defaultCount, defaultFrom } from "@/lib/constants";
import prisma from "@/prisma";
import { formatEvent } from "@/lib/format-event";

export const getEvents = async (params?: {
  search: string;
  count: number;
  from?: number;
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
