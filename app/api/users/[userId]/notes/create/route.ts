import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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
    const { content, color, isPublic, userId } = z
      .object({
        content: z.string(),
        color: z.string(),
        isPublic: z.boolean(),
        userId: z.string(),
      })
      .parse({
        content: body.content,
        color: body.color,
        isPublic: body.public,
        userId: userIdParam,
      });

    const note = await prisma.note.create({
      data: {
        content,
        color,
        public: isPublic,
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
