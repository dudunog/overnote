"use client";

import Highlight from "@tiptap/extension-highlight";
import { EditorContent, useEditor } from "@tiptap/react";
import MenuBar from "./menu-bar";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import CharacterCount from "@tiptap/extension-character-count";

const Tiptap = () => {
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
  });

  return (
    <div className="editor p-4">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="mt-8" />
    </div>
  );
};

export default Tiptap;
