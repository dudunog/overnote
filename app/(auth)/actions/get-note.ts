import { prisma } from "@/lib/prisma";
import { ActionError } from "@/types/api";
import { Note, User } from "@prisma/client";

export interface NoteWithUser extends Note {
  user: User;
  canEdit: boolean;
}

export async function getNote(
  noteId: string,
  userId: string
): Promise<Note | ActionError> {
  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    include: {
      user: true,
    },
  });

  if (!note) {
    return { error: "Note not found." };
  }

  if (note?.visibility === "PRIVATE" && note?.userId !== userId) {
    return { error: "Seems that you don't have access to this note." };
  }

  const { user, ...noteData } = note;

  const response = {
    ...noteData,
    user: {
      name: user.name,
      email: user.email,
    },
    canEdit: note.visibility === "PUBLIC" || note?.userId === userId,
  };

  return response;
}
