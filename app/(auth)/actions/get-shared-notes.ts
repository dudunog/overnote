import { prisma } from "@/lib/prisma";
import { Note } from "@prisma/client";

export async function getSharedNotes(userId: string): Promise<Note[]> {
  return await prisma.note.findMany({
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
}
