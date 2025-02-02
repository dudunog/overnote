"use client";

import NoteEditor from "@/components/note-editor";
import { Lightbulb } from "lucide-react";
import { useWriteNote, WriteNoteProvider } from "@/contexts/write-note-context";
import { Note } from "@/types/note";

interface WriteNotePageClientProps {
  userId: string;
}

export default function WriteNotePageClient({
  userId,
}: WriteNotePageClientProps) {
  const { isEditorReady } = useWriteNote();

  return (
    <WriteNoteProvider
      initialNote={
        {
          userId: userId,
        } as Note
      }
    >
      <div className="px-6 py-2">
        {isEditorReady && (
          <div className="mb-5 flex items-center gap-2">
            <h2 className="text-4xl font-bold">Write your ideas</h2>
            <Lightbulb size={30} />
          </div>
        )}

        <NoteEditor />
      </div>
    </WriteNoteProvider>
  );
}
