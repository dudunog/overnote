"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { motion } from "framer-motion";

export default function NewNoteFloatingButton() {
  const router = useRouter();

  const handleGoToWriteNotePage = useCallback(() => {
    router.push("write-note");
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <div
        className="fixed bottom-7 right-7 transform p-4 flex items-center gap-2 bg-black text-white rounded-xl font-light text-sm cursor-pointer"
        onClick={handleGoToWriteNotePage}
      >
        <Pencil size={15} />
        Write note
      </div>
    </motion.div>
  );
}
