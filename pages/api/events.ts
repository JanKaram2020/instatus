import type { NextApiRequest, NextApiResponse } from "next";
import { GetEventHandler } from "@/server/get-event-handler";
import { PostEventHandler, PostResponse } from "@/server/post-event-handler";
import { GetEventsResponseType } from "@/lib/schemas/get-events";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetEventsResponseType | PostResponse>,
) {
  try {
    if (req.method === "GET") {
      return GetEventHandler(req, res);
    }
    if (req.method === "POST") {
      return PostEventHandler(req, res);
    }
    return res.status(400).json({ error: "not allowed" });
  } catch (e) {
    res.status(401).json({ error: JSON.stringify(e) });
  }
}
