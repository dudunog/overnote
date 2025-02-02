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
        userId: {
          not: userId,
        },
        visibility: {
          in: ["PUBLIC", "READ_ONLY"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    revalidatePath("/shared-notes");

    return Response.json(notes);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Error fetching shared notes" },
      { status: 500 }
    );
  }
}
