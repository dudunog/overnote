"use server";

import { UpdateNoteDTO } from "@/hooks/use-notes";
import { prisma } from "@/lib/prisma";

export async function updateNote(note: UpdateNoteDTO, userId: string) {
  const updatedNote = await prisma.note.findUnique({
    where: {
      id: note.id,
    },
  });

  if (updatedNote?.visibility === "PRIVATE" && updatedNote?.userId !== userId) {
    throw new Error("This note belongs to another user");
  }

  return await prisma.note.update({
    data: {
      content: note.content,
      color: note.color,
      visibility: note.visibility,
      lastCursorPosition: note.lastCursorPosition,
    },
    where: {
      id: note.id,
    },
  });
}
