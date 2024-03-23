import { z } from "zod";
import { FormattedEventScheme } from "@/lib/format-event";
import { EventsErrors } from "@/lib/schemas/common";

export const GetSingleEventParamsScheme = z.object({
  id: z.coerce.number(),
});

export const GetSingleEventResponseScheme = z.union([
  EventsErrors,
  z.object({
    data: FormattedEventScheme,
  }),
]);

export type GetSingleEventResponseType = z.infer<
  typeof GetSingleEventResponseScheme
>;
