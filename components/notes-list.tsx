"use client";

import { Note } from "@/types/note";
import { truncate } from "@/lib/truncate";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { formatDate } from "@/lib/format-date";
import { motion } from "framer-motion";
import ViewNotesLink from "./view-notes-link";

interface NotesListProps {
  notes: Note[];
  maxNotes?: number;
  variant?: "default" | "limited";
}

export default function NotesList({
  notes,
  maxNotes = 5,
  variant = "default",
}: NotesListProps) {
  const router = useRouter();
  const displayedNotes =
    variant === "limited" ? notes.slice(0, maxNotes) : notes;
  const hasMoreNotes = notes.length > maxNotes;

  const handleGoToNotePage = useCallback(
    (noteId: string) => {
      router.push(`/write-note/${noteId}`);
    },
    [router]
  );

  return (
    <div className="flex flex-wrap gap-4">
      {displayedNotes.map((note, index) => (
        <motion.div
          key={note.id}
          className="flex flex-col justify-between w-56 h-40 rounded-lg cursor-pointer"
          onClick={() => handleGoToNotePage(note.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
          }}
        >
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
        </motion.div>
      ))}

      {variant === "limited" && hasMoreNotes && (
        <div className="w-full text-center">
          <ViewNotesLink linkText="See more notes" url="/my-notes" />
        </div>
      )}
    </div>
  );
}
