"use client";

import { Note } from "@prisma/client";
import { truncate } from "@/lib/truncate";
import { formatDate } from "@/lib/format-date";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

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
  const displayedNotes =
    variant === "limited" ? notes.slice(0, maxNotes) : notes;
  const hasMoreNotes = notes.length > maxNotes;

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
          <Link href="write-note">
            <Button className="mt-4 px-4 py-5 flex items-center gap-2 bg-black text-white rounded-lg font-light text-sm cursor-pointer">
              <Pencil size={15} />
              Write your first note
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {displayedNotes.map((note, index) => (
        <Link key={note.id} href={`/write-note/${note.id}`}>
          <motion.div
            className="flex flex-col justify-between w-56 h-40 rounded-lg cursor-pointer"
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
              style={{
                backgroundColor: note.color,
              }}
            >
              <div>
                <span
                  dangerouslySetInnerHTML={{
                    __html: truncate(note.content, 50),
                  }}
                ></span>
              </div>

              <span className="text-sm text-zinc-600">
                Updated {formatDate(note.updatedAt.toString())}
              </span>
            </div>
          </motion.div>
        </Link>
      ))}

      {variant === "limited" && hasMoreNotes && (
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/my-notes">
            <Button variant="link" size="icon" className="w-fit h-fit">
              See more notes
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
