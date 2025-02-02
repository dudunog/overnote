import { prisma } from "@/lib/prisma";
import { z } from "zod";

type ParamsProps = {
  params: {
    noteId: string;
    userId: string;
  };
};

export async function GET(req: Request, { params }: ParamsProps) {
  const { noteId: noteIdParam, userId: userIdParam } = await params;

  try {
    const { noteId, userId } = z
      .object({
        noteId: z.string(),
        userId: z.string(),
      })
      .parse({
        noteId: noteIdParam,
        userId: userIdParam,
      });

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
      include: {
        user: true,
      },
    });

    if (!note) {
      return Response.json({ error: "Note not found." }, { status: 404 });
    }

    if (note?.visibility === "PRIVATE" && note?.userId !== userId) {
      return Response.json(
        { error: "Seems that you don't have access to this note." },
        { status: 403 }
      );
    }

    const { user, ...noteData } = note;

    const response = {
      ...noteData,
      user: {
        name: user.name,
        email: user.email,
      },
      canEdit: note.visibility === "PUBLIC" || note?.userId === userId,
    };

    return Response.json(response);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Error fetching note" }, { status: 500 });
  }
}
