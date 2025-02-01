import { prisma } from "@/lib/prisma";
import { z } from "zod";

type ParamsProps = {
  params: {
    noteId: string;
  };
};

export async function GET(req: Request, { params }: ParamsProps) {
  const { noteId: noteIdParam } = await params;

  try {
    const { noteId } = z
      .object({
        noteId: z.string(),
      })
      .parse({
        noteId: noteIdParam,
      });

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    return Response.json(note);
  } catch (err) {
    console.error(err);
    return new Response("Error fetching note", {
      status: 500,
    });
  }
}
