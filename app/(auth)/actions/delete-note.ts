"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function deleteNote(noteId: string) {
  const session = await auth();

  const updatedNote = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (
    updatedNote?.visibility === "PRIVATE" &&
    updatedNote?.userId !== session?.user?.id
  ) {
    throw new Error("This note belongs to another user");
  }

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (note?.visibility === "PRIVATE" && note?.userId !== session?.user?.id) {
    throw new Error("This note belongs to another user");
  }

  return await prisma.note.delete({
    where: {
      id: noteId,
    },
  });
}
