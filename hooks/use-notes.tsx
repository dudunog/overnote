"use client";

import { api } from "@/data/api";
import { useToast } from "@/hooks/use-toast";
import { Note } from "@/types/note";

type CreateNoteDTO = Omit<Note, "id" | "user" | "createdAt" | "updatedAt">;

export type UpdateNoteDTO = Omit<Note, "user" | "createdAt" | "updatedAt">;

export function useNotes() {
  const { toast } = useToast();

  async function createNote(
    noteData: CreateNoteDTO
  ): Promise<Note | undefined> {
    try {
      const response = await api(`/users/${noteData.userId}/notes/create`, {
        method: "POST",
        body: JSON.stringify(noteData),
      });

      toast({
        variant: "primary",
        description: "Note created successfully!",
        duration: 3000,
      });

      return await response.json();
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
    noteData: UpdateNoteDTO
  ): Promise<Note | undefined> {
    try {
      const response = await api(
        `/users/${noteData.userId}/notes/${noteData.id}/update`,
        {
          method: "PUT",
          body: JSON.stringify(noteData),
        }
      );

      toast({
        variant: "primary",
        description: "Note updated successfully!",
        duration: 3000,
      });

      return await response.json();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error updating note",
        duration: 3000,
      });

      console.error(error);
    }
  }

  async function deleteNote(noteId: string, userId: string): Promise<void> {
    try {
      const response = await api(`/users/${userId}/notes/${noteId}/delete`, {
        method: "DELETE",
      });

      toast({
        variant: "primary",
        description: "Note deleted successfully!",
        duration: 3000,
      });

      return await response.json();
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
