import { z } from "zod";
export const defaultCount = 10;
export const defaultFrom = 0;

export const GetEventsParamsScheme = z.object({
  from: z.coerce.number().optional().default(defaultFrom),
  count: z.coerce.number().optional().default(defaultCount),
  search: z.string().optional().default(""),
});
