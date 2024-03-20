import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { GetHandler, GetResponse } from "@/server/events-get";
import { PostHandler, PostResponse } from "@/server/events-post";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse | PostResponse>,
) {
  try {
    if (req.method === "GET") {
      return GetHandler(req, res);
    }
    if (req.method === "POST") {
      return PostHandler(req, res);
    }
    return res.status(400).json({ error: "not allowed" });
  } catch (e) {
    res.status(401).json({ error: e as string | ZodError });
  }
}
