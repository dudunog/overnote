"use client";

import { useToast } from "@/hooks/use-toast";
import { Note } from "@prisma/client";
import { createNote as createNoteAction } from "@/app/(auth)/actions/create-note";
import { updateNote as updateNoteAction } from "@/app/(auth)/actions/update-note";
import { deleteNote as deleteNoteAction } from "@/app/(auth)/actions/delete-note";

export type CreateNoteDTO = Omit<
  Note,
  "id" | "user" | "createdAt" | "updatedAt"
>;

export type UpdateNoteDTO = Omit<Note, "user" | "createdAt" | "updatedAt">;

export function useNotes() {
  const { toast } = useToast();

  async function createNote(
    noteData: CreateNoteDTO
  ): Promise<Note | undefined> {
    try {
      const response = await createNoteAction(noteData);

      if (response) {
        toast({
          variant: "primary",
          description: "Note created successfully!",
          duration: 3000,
        });
      }

      return response;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Erro creating note",
        duration: 3000,
      });

      console.error(error);
    }
  }

  async function updateNote(
    noteData: UpdateNoteDTO,
    userId: string
  ): Promise<Note | undefined> {
    try {
      const response = await updateNoteAction(noteData, userId);

      if (!response) {
        throw new Error("Error updating note");
      }

      return response;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error updating note",
        duration: 3000,
      });

      console.error(error);
    }
  }

  async function deleteNote(noteId: string): Promise<void> {
    try {
      const response = await deleteNoteAction(noteId);

      if (response) {
        toast({
          variant: "primary",
          description: "Note deleted successfully!",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error deleting note",
        duration: 3000,
      });

      console.error(error);
    }
  }

  return {
    createNote,
    updateNote,
    deleteNote,
  };
}
