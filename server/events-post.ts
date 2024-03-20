import { ZodError } from "zod";
import prisma, { Event } from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { CreateEventScheme } from "@/lib/schemas/create-event";

export type PostResponse =
  | { error: string | ZodError }
  | { data: { event: Event } };

export const PostHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>,
) => {
  const body = req.body;
  const validatedBody = CreateEventScheme.safeParse(body);
  if (!validatedBody.success) {
    res.status(422).json({ error: validatedBody.error });
    return;
  }

  const data = validatedBody.data;

  const newEvent = await prisma.events.create({
    data: {
      object: data.object,
      actor_id: data.actor_id,
      actor_name: data.actor_name,
      action_id: data.action.id,
      action_object: data.action.object,
      action_name: data.action.name,
      metadata_description: data.metadata.description,
      metadata_redirect: data.metadata.redirect,
      metadata_x_request_id: data.metadata.x_request_id,
      group: data.group,
      target_id: data.target_id,
      target_name: data.target_name,
      location: data.location,
      occurred_at: data.occurred_at,
    },
  });

  res.status(200).json({ data: { event: newEvent } });
};
