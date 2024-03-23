import { ZodError } from "zod";
import { Event } from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { createEvent } from "@/lib/Instalog";

export type PostResponse =
  | { error: string | ZodError }
  | { data: { event: Event } };
export const PostEventHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>,
) => {
  const newEvent = await createEvent(req.body);
  if (typeof newEvent === "string") {
    return res.status(400).json({ error: newEvent });
  }
  res.status(200).json({ data: { event: newEvent } });
};
