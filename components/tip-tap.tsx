"use client";

import Highlight from "@tiptap/extension-highlight";
import { EditorContent, useEditor } from "@tiptap/react";
import MenuBar from "./menu-bar";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import CharacterCount from "@tiptap/extension-character-count";

interface TiptapProps {
  isEditorReady: boolean;
  onEditorIsReady: () => void;
}

const Tiptap = ({ isEditorReady, onEditorIsReady }: TiptapProps) => {
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
    onCreate: onEditorIsReady,
  });

  if (!isEditorReady) {
    return (
      <div className="flex flex-1 flex-col gap-4 pt-0">
        <div className="h-10 w-80 aspect-video rounded-xl bg-muted/50" />
        <div className="h-60 aspect-video rounded-xl bg-muted/50" />
      </div>
    );
  }

  return (
    <div className="editor p-4">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="mt-8" />
    </div>
  );
};

export default Tiptap;
