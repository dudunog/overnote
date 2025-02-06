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
    lastCursorPosition,
    setLastCursorPosition,
  } = useWriteNote();

  const handleUpdateContent = useCallback(
    (props: EditorEvents["update"]) => {
      setNoteContent(props.editor.getHTML());
      setLastCursorPosition(props.editor.state.selection.anchor);
    },
    [setNoteContent, setLastCursorPosition]
  );

  return (
    <Tiptap
      initialContent={noteContent}
      isEditorReady={isEditorReady}
      editable={note?.canEdit}
      editorBackgroundColor={color}
      initialCursorPosition={lastCursorPosition}
      onEditorIsReady={() => setIsEditorReady(true)}
      onChangeContent={handleUpdateContent}
    />
  );
}
