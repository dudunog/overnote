import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

type ParamsProps = {
  params: {
    noteId: string;
    userId: string;
  };
};

export async function DELETE(req: Request, { params }: ParamsProps) {
  const session = await auth();
  const { noteId: noteIdParam, userId: userIdParam } = await params;

  if (!session?.user?.id) {
    return Response.json("Unauthorized", { status: 401 });
  }

  try {
    const { id, userId } = z
      .object({
        id: z.string(),
        userId: z.string(),
      })
      .parse({
        id: noteIdParam,
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

    const response = await prisma.note.delete({
      where: {
        id,
      },
    });

    return Response.json(response);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: "Invalid Body" }, { status: 422 });
    }

    return Response.json({ error: "Error deleting note" }, { status: 500 });
  }
}
