import { z } from "zod";

export const EventsErrors = z.object({
  error: z.string(),
});
