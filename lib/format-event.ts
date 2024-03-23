import type { Event } from "@/prisma";
import { CreateEventScheme, CreateEventType } from "@/lib/schemas/create-event";
import { z } from "zod";

export const FormattedEventScheme = CreateEventScheme.extend({
  id: z.number(),
});

export type FormattedEvent = z.infer<typeof FormattedEventScheme>;
export const formatEvent = (event: Event): FormattedEvent => ({
  id: event.id,
  object: event.object,
  actor_id: event.actor_id,
  actor_name: event.actor_name,
  action: {
    id: event.action_id,
    object: event.action_object,
    name: event.action_name,
  },
  metadata: {
    x_request_id: event.metadata_x_request_id,
    description: event.metadata_description,
    redirect: event.metadata_redirect,
  },
  group: event.group,
  target_id: event.target_id,
  target_name: event.target_name,
  location: event.location,
  occurred_at: event.occurred_at.toISOString(),
});
