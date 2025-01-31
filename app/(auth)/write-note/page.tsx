"use client";

import Tiptap from "@/components/tip-tap";
import { Switch } from "@/components/ui/switch";
import { getRandomColor } from "@/constants/colors";
import { useDebounce } from "@/hooks/use-debounce";
import { useNotes } from "@/hooks/use-notes";
import { EditorEvents } from "@tiptap/react";
import { Lightbulb } from "lucide-react";
import { startTransition, useCallback, useEffect, useState } from "react";

export default function Page() {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const { createNote } = useNotes();
  const [noteContent, setNoteContent] = useState("");
  const [isPublicNote, setIsPublicNote] = useState(false);
  const debounceContent = useDebounce(noteContent, 700);

  const handleUpdateContent = useCallback((props: EditorEvents["update"]) => {
    setNoteContent(props.editor.getHTML());
  }, []);

  const handleSaveNoteContent = useCallback(
    (noteContentToSave: string) => {
      startTransition(async () => {
        await createNote({
          content: noteContentToSave,
          color: getRandomColor(),
          public: isPublicNote,
        });
      });
    },
    [createNote, getRandomColor, isPublicNote]
  );

  useEffect(() => {
    if (debounceContent) {
      handleSaveNoteContent(noteContent);
    }
  }, [debounceContent]);

  return (
    <div className="px-6 py-2">
      {isEditorReady && (
        <div className="mb-5 flex items-center gap-2">
          <h2 className="text-3xl font-bold">Escreva suas ideias</h2>
          <Lightbulb size={30} />
        </div>
      )}

      <div className="mb-5 flex items-center gap-2 justify-end">
        Public{" "}
        <Switch
          checked={isPublicNote}
          onCheckedChange={(checked) => setIsPublicNote(checked)}
        />
      </div>

      <Tiptap
        isEditorReady={isEditorReady}
        onEditorIsReady={() => setIsEditorReady(true)}
        onUpdateContent={handleUpdateContent}
      />
    </div>
  );
}
