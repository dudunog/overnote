import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NoteVisibility } from "@/types/note";
import { z } from "zod";

type ParamsProps = {
  params: {
    userId: string;
  };
};

export async function POST(req: Request, { params }: ParamsProps) {
  const session = await auth();
  const body = await req.json();
  const { userId: userIdParam } = await params;

  if (!session?.user?.id) {
    return Response.json("Unauthorized", { status: 401 });
  }

  try {
    const { content, color, visibility, userId } = z
      .object({
        content: z.string(),
        color: z.string(),
        visibility: z.enum(NoteVisibility),
        userId: z.string(),
      })
      .parse({
        content: body.content,
        color: body.color,
        visibility: body.visibility,
        userId: userIdParam,
      });

    const note = await prisma.note.create({
      data: {
        content,
        color,
        visibility,
        userId,
      },
    });

    return Response.json(note);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: "Invalid Body" }, { status: 500 });
    }

    return Response.json({ error: "Error creating note" }, { status: 500 });
  }
}
