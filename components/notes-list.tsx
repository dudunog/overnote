"use client";

import { Note } from "@/types/note";
import { truncate } from "@/lib/truncate";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { formatDate } from "@/lib/format-date";
import { motion } from "framer-motion";
import ViewNotesLink from "./view-notes-link";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";

interface NotesListProps {
  notes: Note[];
  maxNotes?: number;
  variant?: "default" | "limited";
  noItemsTitle?: string;
  noItemsMessage?: string;
  showWriteNoteButton?: boolean;
}

export default function NotesList({
  notes,
  maxNotes = 5,
  variant = "default",
  noItemsTitle,
  noItemsMessage,
  showWriteNoteButton = true,
}: NotesListProps) {
  const router = useRouter();
  const displayedNotes =
    variant === "limited" ? notes.slice(0, maxNotes) : notes;
  const hasMoreNotes = notes.length > maxNotes;

  const handleGoToWriteNotePage = useCallback(() => {
    router.push("write-note");
  }, [router]);

  const handleGoToNotePage = useCallback(
    (noteId: string) => {
      router.push(`/write-note/${noteId}`);
    },
    [router]
  );

  if (displayedNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-lg font-semibold">
          {noItemsTitle ?? "No notes yet!"}
        </h2>
        <p className="text-muted-foreground">
          {noItemsMessage ??
            "It looks like you haven't created any notes. Start by clicking the Create Note button to jot down your thoughts and ideas!"}
        </p>
        {showWriteNoteButton && (
          <Button
            className="mt-4 px-4 py-5 flex items-center gap-2 bg-black text-white rounded-lg font-light text-sm cursor-pointer"
            onClick={handleGoToWriteNotePage}
          >
            <Pencil size={15} />
            Write your first note
          </Button>
        )}
      </div>
    );
  }

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
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ViewNotesLink linkText="See more notes" url="/my-notes" />
        </motion.div>
      )}
    </div>
  );
}
