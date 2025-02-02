"use client";

import { Note } from "@/types/note";
import { truncate } from "@/lib/truncate";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { formatDate } from "@/lib/format-date";

interface NotesListProps {
  notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
  const router = useRouter();

  const handleGoToNotePage = useCallback(
    (noteId: string) => {
      router.push(`/write-note/${noteId}`);
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
          <div>
            <span
              dangerouslySetInnerHTML={{ __html: truncate(note.content, 50) }}
            ></span>
          </div>

          <span className="text-sm text-zinc-600">
            Updated {formatDate(note.updatedAt.toString())}
          </span>
        </div>
      ))}
    </div>
  );
}
