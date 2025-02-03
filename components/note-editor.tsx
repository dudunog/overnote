"use client";

import Tiptap from "@/components/tip-tap";
import { useWriteNote } from "@/contexts/write-note-context";
import { EditorEvents } from "@tiptap/react";
import { useCallback } from "react";

export default function NoteEditor() {
  const {
    note,
    color,
    noteContent,
    setNoteContent,
    isEditorReady,
    setIsEditorReady,
  } = useWriteNote();

  const handleUpdateContent = useCallback(
    (props: EditorEvents["update"]) => {
      setNoteContent(props.editor.getHTML());
    },
    [setNoteContent]
  );

  return (
    <Tiptap
      initialContent={noteContent}
      isEditorReady={isEditorReady}
      editable={note?.canEdit}
      editorBackgroundColor={color}
      onEditorIsReady={() => setIsEditorReady(true)}
      onUpdateContent={handleUpdateContent}
    />
  );
}
