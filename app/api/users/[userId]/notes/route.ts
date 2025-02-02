import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ParamsProps = {
  params: {
    userId: string;
  };
};

export async function GET(req: Request, { params }: ParamsProps) {
  const { userId: userIdParam } = await params;

  try {
    const { userId } = z
      .object({
        userId: z.string(),
      })
      .parse({
        userId: userIdParam,
      });

    const notes = await prisma.note.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    revalidatePath("/my-notes");

    return Response.json(notes);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Error fetching notes" }, { status: 500 });
  }
}
