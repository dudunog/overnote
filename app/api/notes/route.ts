import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();

  try {
    const notes = await prisma.note.findMany({
      where: {
        userId: session?.user?.id,
      },
    });

    revalidatePath("/my-notes");

    return Response.json(notes);
  } catch (err) {
    console.error(err);
    return new Response("Error fetching notes", {
      status: 500,
    });
  }
}
