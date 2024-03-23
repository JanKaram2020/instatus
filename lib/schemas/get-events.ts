import { z } from "zod";
import { FormattedEventScheme } from "@/lib/format-event";
import { EventsErrors } from "@/lib/schemas/common";
import { defaultCount, defaultFrom } from "@/lib/constants";

export const GetEventsParamsScheme = z.object({
  from: z.coerce.number().optional().default(defaultFrom),
  count: z.coerce.number().optional().default(defaultCount),
  search: z.string().optional().default(""),
});

export const GetEventsResponseScheme = z.union([
  EventsErrors,
  z.object({
    data: z.object({
      total: z.number(),
      events: z.array(FormattedEventScheme),
    }),
  }),
]);

export type GetEventsResponseType = z.infer<typeof GetEventsResponseScheme>;
