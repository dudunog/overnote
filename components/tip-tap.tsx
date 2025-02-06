"use client";

import Highlight from "@tiptap/extension-highlight";
import { EditorContent, EditorEvents, useEditor } from "@tiptap/react";
import MenuBar from "./menu-bar";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import CharacterCount from "@tiptap/extension-character-count";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface TiptapProps {
  initialContent?: string;
  isEditorReady: boolean;
  editable?: boolean;
  editorBackgroundColor?: string;
  initialCursorPosition?: number;
  onEditorIsReady?: () => void;
  onChangeContent: (props: EditorEvents["update"]) => void;
}

const Tiptap = ({
  initialContent,
  isEditorReady,
  editable = true,
  editorBackgroundColor,
  initialCursorPosition = 1,
  onEditorIsReady,
  onChangeContent,
}: TiptapProps) => {
  const [editorIsReady, setEditorIsReady] = useState(false);
  const firstRender = useRef(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    autofocus: true,
    editable: editable,
    content: initialContent || undefined,
    onCreate: () => {
      onEditorIsReady?.();
      setEditorIsReady(true);
    },
    onUpdate: onChangeContent,
  });

  useEffect(() => {
    if (editorIsReady && firstRender?.current) {
      editor?.commands.focus(initialCursorPosition);

      firstRender.current = false;
    }
  }, [editorIsReady, initialCursorPosition, firstRender, editor?.commands]);

  if (!isEditorReady) {
    return (
      <div className="mt-6 flex flex-1 flex-col gap-4 pt-0">
        <div className="h-60 aspect-video rounded-xl bg-muted/50" />
      </div>
    );
  }

  return (
    <div
      className="editor p-4"
      style={{
        backgroundColor: editorBackgroundColor,
      }}
    >
      {editor && editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className={cn(editable && "mt-8")} />
    </div>
  );
};

export default Tiptap;
