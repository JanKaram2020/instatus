import { z } from "zod";
import { FormattedEventScheme } from "@/lib/format-event";
import { defaultCount, defaultPage } from "@/lib/constants";

export const GetEventsParamsScheme = z.object({
  page: z.coerce.number().optional().default(defaultPage),
  count: z.coerce.number().optional().default(defaultCount),
  search: z.string().optional().default(""),
});

export const GetEventsResponseScheme = z.union([
  z.object({
    error: z.string(),
  }),
  z.object({
    data: z.object({
      totalPages: z.number(),
      events: z.array(FormattedEventScheme),
    }),
  }),
]);

export type GetEventsResponseType = z.infer<typeof GetEventsResponseScheme>;
