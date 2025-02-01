import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

type ParamsProps = {
  params: {
    noteId: string;
  };
};

export async function PUT(req: Request, { params }: ParamsProps) {
  const session = await auth();
  const body = await req.json();
  const { noteId: noteIdParam } = await params;

  if (!session?.user?.id) {
    return Response.json("Unauthorized", { status: 401 });
  }

  try {
    const { id, content, color, isPublic } = z
      .object({
        id: z.string(),
        content: z.string(),
        color: z.string(),
        isPublic: z.boolean(),
      })
      .parse({
        id: noteIdParam,
        content: body.content,
        color: body.color,
        isPublic: body.public,
      });

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (note?.userId !== session.user.id) {
      return Response.json("This note belogs to another user", { status: 400 });
    }

    const updatedNote = await prisma.note.update({
      data: {
        content,
        color,
        public: isPublic,
      },
      where: {
        id,
      },
    });

    return Response.json(updatedNote);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid Body", { status: 422 });
    }

    return new Response("Error updating note", {
      status: 500,
    });
  }
}
