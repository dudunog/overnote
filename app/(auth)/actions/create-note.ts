"use server";

import { CreateNoteDTO } from "@/hooks/use-notes";
import { prisma } from "@/lib/prisma";

export async function createNote(note: CreateNoteDTO) {
  return await prisma.note.create({
    data: {
      content: note.content,
      color: note.color,
      visibility: note.visibility,
      lastCursorPosition: note.lastCursorPosition,
      userId: note.userId,
    },
  });
}
