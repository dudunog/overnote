"use client";

import Tiptap from "@/components/tip-tap";
import { Switch } from "@/components/ui/switch";
import { useDebounce } from "@/hooks/use-debounce";
import { UpdateNoteDTO } from "@/hooks/use-notes";
import { Note } from "@/types/note";
import { EditorEvents } from "@tiptap/react";
import { startTransition, useCallback, useEffect, useState } from "react";

interface NoteEditorProps {
  note: Note | undefined;
  onUpdateNote: (note: UpdateNoteDTO) => void;
  onEditorIsReady: () => void;
}

export default function NoteEditor({
  note,
  onUpdateNote,
  onEditorIsReady,
}: NoteEditorProps) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [noteContent, setNoteContent] = useState(note?.content || "");
  const [isPublicNote, setIsPublicNote] = useState(note?.public || false);
  const debounceContent = useDebounce(noteContent, 700);
  const debounceIsPublic = useDebounce(isPublicNote, 700);

  const handleUpdateContent = useCallback(
    (props: EditorEvents["update"]) => {
      setNoteContent(props.editor.getHTML());
    },
    [setNoteContent]
  );

  const handleUpdateNoteContent = useCallback(() => {
    startTransition(async () => {
      onUpdateNote({
        id: note?.id || "",
        content: noteContent,
        color: note?.color || "",
        public: isPublicNote,
      });
    });
  }, [onUpdateNote, note?.id, note?.color, noteContent, isPublicNote]);

  useEffect(() => {
    if (debounceContent && noteContent !== note?.content) {
      handleUpdateNoteContent();
    }
  }, [debounceContent]);

  useEffect(() => {
    if (debounceIsPublic !== note?.public) {
      handleUpdateNoteContent();
    }
  }, [debounceIsPublic]);

  return (
    <div>
      {isEditorReady && (
        <div className="mb-5 flex items-center gap-2 justify-end">
          Public{" "}
          <Switch
            checked={isPublicNote}
            onCheckedChange={(checked) => setIsPublicNote(checked)}
          />
        </div>
      )}

      <Tiptap
        initialContent={noteContent}
        isEditorReady={isEditorReady}
        onEditorIsReady={() => {
          setIsEditorReady(true);
          onEditorIsReady();
        }}
        onUpdateContent={handleUpdateContent}
      />
    </div>
  );
}
