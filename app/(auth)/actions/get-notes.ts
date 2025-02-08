import { prisma } from "@/lib/prisma";
import { Note } from "@prisma/client";

export async function getNotes(userId: string): Promise<Note[]> {
  return await prisma.note.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
