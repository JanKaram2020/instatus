import { z } from "zod";
import { FormattedEventScheme } from "@/lib/format-event";
export const defaultCount = 10;
export const defaultFrom = 0;

export const SingleEventScheme = z.object({
  id: z.coerce.number(),
});
export const GetEventsParamsScheme = SingleEventScheme.or(
  z.object({
    from: z.coerce.number().optional().default(defaultFrom),
    count: z.coerce.number().optional().default(defaultCount),
    search: z.string().optional().default(""),
  }),
);

export const GetResponseScheme = z.union([
  z.object({
    error: z.string(),
  }),
  z.object({
    data: z.object({
      total: z.number(),
      events: z.array(FormattedEventScheme),
    }),
  }),
  z.object({
    data: FormattedEventScheme,
  }),
]);

export type GetResponse = z.infer<typeof GetResponseScheme>;
