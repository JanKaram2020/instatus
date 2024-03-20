import { z } from "zod";

export const CreateEventScheme = z.object({
  object: z.string(),
  actor_id: z.string(),
  actor_name: z.string(),
  action: z.object({
    id: z.string(),
    object: z.string(),
    name: z.string(),
  }),
  metadata: z.object({
    redirect: z.string(),
    description: z.string(),
    x_request_id: z.string(),
  }),
  group: z.string(),
  target_id: z.string(),
  target_name: z.string(),
  location: z.string(),
  occurred_at: z.string().datetime(),
});

export type CreateEventType = z.infer<typeof CreateEventScheme>;
