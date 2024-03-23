import {
  GetSingleEventResponseType,
  GetSingleEventParamsScheme,
} from "@/lib/schemas/get-single-event";
import { z } from "zod";
import {
  GetEventsParamsScheme,
  GetEventsResponseType,
} from "@/lib/schemas/get-events";

export type GetResponse = GetEventsResponseType | GetSingleEventResponseType;
export const GetEventsApiParamsScheme = z.union([
  GetSingleEventParamsScheme,
  GetEventsParamsScheme,
]);
