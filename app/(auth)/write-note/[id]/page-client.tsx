"use client";

import NoteEditor from "@/components/note-editor";
import { UpdateNoteDTO, useNotes } from "@/hooks/use-notes";
import { Note } from "@/types/note";
import { Lightbulb } from "lucide-react";
import { startTransition, useCallback, useState } from "react";

function Skeleton() {
  return <div className="h-10 w-80 aspect-video rounded-xl bg-muted/50" />;
}

interface PageProps {
  note: Note;
}

export default function UpdateNotePageClient({ note }: PageProps) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const { updateNote } = useNotes();

  const handleSaveNote = useCallback(
    (note: UpdateNoteDTO) => {
      startTransition(async () => {
        await updateNote({
          id: note.id,
          content: note.content,
          color: note.color,
          public: note.public,
        });
      });
    },
    [updateNote]
  );

  return (
    <div className="px-6 py-2">
      {isEditorReady ? (
        <div className="mb-5 flex items-center gap-2">
          <h2 className="text-3xl font-bold">Escreva suas ideias</h2>
          <Lightbulb size={30} />
        </div>
      ) : (
        <Skeleton />
      )}

      {note && (
        <NoteEditor
          note={note}
          onUpdateNote={handleSaveNote}
          onEditorIsReady={() => setIsEditorReady(true)}
        />
      )}
    </div>
  );
}
