import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function POST(req: Request) {
  const session = await auth();
  const body = await req.json();

  if (!session?.user?.id) {
    return Response.json("Unauthorized", { status: 401 });
  }

  try {
    const { content, color, isPublic } = z
      .object({
        content: z.string(),
        color: z.string(),
        isPublic: z.boolean(),
      })
      .parse({
        content: body.content,
        color: body.color,
        isPublic: body.public,
      });

    const note = prisma.note.create({
      data: {
        content,
        color,
        public: isPublic,
        userId: session.user?.id,
      },
    });

    return Response.json(note);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid Body", { status: 422 });
    }

    return new Response("Error creating note", {
      status: 500,
    });
  }
}
