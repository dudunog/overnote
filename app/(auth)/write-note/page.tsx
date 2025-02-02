"use client";

import NoteEditor from "@/components/note-editor";
import { getRandomColor } from "@/lib/colors";
import { UpdateNoteDTO, useNotes } from "@/hooks/use-notes";
import { Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useCallback, useState } from "react";

export default function Page() {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const { createNote, updateNote } = useNotes();
  const router = useRouter();

  const handleSaveNote = useCallback(
    (note: UpdateNoteDTO) => {
      const noteExists = note.id;

      startTransition(async () => {
        if (noteExists) {
          await updateNote({
            id: note.id,
            content: note.content,
            color: getRandomColor(),
            public: note.public,
          });
        } else {
          const createdNote = await createNote({
            content: note.content,
            color: getRandomColor(),
            public: note.public,
          });

          router.push(`/write-note/${createdNote?.id}`);
        }
      });
    },
    [createNote, router, updateNote]
  );

  return (
    <div className="px-6 py-2">
      {isEditorReady && (
        <div className="mb-5 flex items-center gap-2">
          <h2 className="text-3xl font-bold">Escreva suas ideias</h2>
          <Lightbulb size={30} />
        </div>
      )}

      <NoteEditor
        note={undefined}
        onUpdateNote={handleSaveNote}
        onEditorIsReady={() => setIsEditorReady(true)}
      />
    </div>
  );
}
