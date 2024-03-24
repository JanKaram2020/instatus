import { defaultCount, defaultPage } from "@/lib/constants";
import prisma from "@/prisma";
import { formatEvent } from "@/lib/format-event";
import { CreateEventScheme, CreateEventType } from "@/lib/schemas/create-event";

export class Instalog {
  SECRET_KEY: string;
  constructor(secretKey: string) {
    // set it and don't use it later for now
    this.SECRET_KEY = secretKey;
  }
  async listEvents(params?: { search: string; count: number; page?: number }) {
    const search = params?.search ?? "";
    const count = params?.count ?? defaultCount;
    const page = params?.page ?? defaultPage;

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
          target_name: whereCondition,
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

    try {
      const [eventsCount, events] = await Promise.all([
        prisma.events.count({
          where,
        }),
        prisma.events.findMany({
          take: count,
          skip: page * count,
          where,
        }),
      ]);
      return {
        events: events.map(formatEvent),
        totalPages: Math.ceil(eventsCount / count),
      };
    } catch (e) {
      return "error happened while getting events: " + JSON.stringify(e);
    }
  }

  async getEvent(id: number) {
    try {
      const event = await prisma.events.findUnique({
        where: {
          id,
        },
      });

      if (!event) return `no event with matching ${id} found`;
      return formatEvent(event);
    } catch (e) {
      return `error happened while getting event with ${id}: ${JSON.stringify(e)}`;
    }
  }

  async createEvent(event: CreateEventType) {
    const validateEvent = CreateEventScheme.safeParse(event);
    if (!validateEvent.success) {
      return validateEvent.error.toString();
    }
    const data = validateEvent.data;
    try {
      const newEvent = await prisma.events.create({
        data: {
          object: data.object,
          actor_id: data.actor_id,
          actor_name: data.actor_name,
          action_id: data.action.id,
          action_object: data.action.object,
          action_name: data.action.name,
          metadata_description: data.metadata.description,
          metadata_redirect: data.metadata.redirect,
          metadata_x_request_id: data.metadata.x_request_id,
          group: data.group,
          target_id: data.target_id,
          target_name: data.target_name,
          location: data.location,
          occurred_at: data.occurred_at,
        },
      });

      return newEvent;
    } catch (e) {
      return "error happened while creating event " + JSON.stringify(e);
    }
  }
}

export const { listEvents, createEvent, getEvent } = new Instalog("");
