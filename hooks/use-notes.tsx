"use client";

import { api } from "@/data/api";
import { useToast } from "@/hooks/use-toast";
import { Note } from "@/types/note";

type CreateNoteDTO = Omit<Note, "id" | "createdAt" | "updatedAt">;

export function useNotes() {
  const { toast } = useToast();

  async function createNote(
    noteData: CreateNoteDTO
  ): Promise<Note | undefined> {
    try {
      const response = await api("/notes/create", {
        method: "POST",
        body: JSON.stringify(noteData),
      });

      console.log("response:", response);

      return await response.json();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Erro ao criar nota",
        duration: 3000,
      });

      console.error(error);
    }
  }

  return {
    createNote,
  };
}
