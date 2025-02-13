"use client";

import NoteEditor from "@/components/note-editor";
import { Lightbulb } from "lucide-react";
import { useWriteNote } from "@/contexts/write-note-context";
import { motion } from "framer-motion";

export default function WriteNotePageClient() {
  const { isEditorReady } = useWriteNote();

  return (
    <div className="px-6 py-2">
      {isEditorReady && (
        <motion.div
          className="mb-5 flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold">Write your ideas</h2>
          <Lightbulb size={30} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <NoteEditor />
      </motion.div>
    </div>
  );
}
