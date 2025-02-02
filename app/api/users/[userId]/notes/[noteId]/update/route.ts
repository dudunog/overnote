import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NoteVisibility } from "@/types/note";
import { z } from "zod";

type ParamsProps = {
  params: {
    noteId: string;
    userId: string;
  };
};

export async function PUT(req: Request, { params }: ParamsProps) {
  const session = await auth();
  const body = await req.json();
  const { noteId: noteIdParam, userId: userIdParam } = await params;

  if (!session?.user?.id) {
    return Response.json("Unauthorized", { status: 401 });
  }

  try {
    const { id, content, color, visibility, userId } = z
      .object({
        id: z.string(),
        content: z.string(),
        color: z.string(),
        visibility: z.enum(NoteVisibility),
        userId: z.string(),
      })
      .parse({
        id: noteIdParam,
        content: body.content,
        color: body.color,
        visibility: body.visibility,
        userId: userIdParam,
      });

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (note?.visibility === "PRIVATE" && note?.userId !== userId) {
      return Response.json("This note belongs to another user", {
        status: 400,
      });
    }

    const updatedNote = await prisma.note.update({
      data: {
        content,
        color,
        visibility,
      },
      where: {
        id,
      },
    });

    return Response.json(updatedNote);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: "Invalid Body" }, { status: 422 });
    }

    return Response.json({ error: "Error updating note" }, { status: 500 });
  }
}
