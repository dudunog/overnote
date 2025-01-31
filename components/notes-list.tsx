"use client";

import { Note } from "@/types/note";
import { truncate } from "@/utils/truncate";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface NotesListProps {
  notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
  const router = useRouter();

  const handleGoToNotePage = useCallback(
    (noteId: string) => {
      router.push(`/note/${noteId}`);
    },
    [router]
  );

  return (
    <div className="flex flex-wrap gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="flex flex-col justify-between w-56 h-40 p-5 rounded-lg cursor-pointer"
          onClick={() => handleGoToNotePage(note.id)}
          style={{
            backgroundColor: note.color,
          }}
        >
          <p>{truncate(note.content, 50)}</p>

          <span className="text-sm text-zinc-600">
            {note.updatedAt.toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
}
