"use client";

import { Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";

export default function NewNoteFloatingButton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <Link href="write-note">
        <Button className="fixed bottom-7 right-7 transform p-4 py-[26px] flex items-center gap-2 bg-black text-white rounded-xl font-light text-sm cursor-pointer">
          <Pencil size={15} />
          Write note
        </Button>
      </Link>
    </motion.div>
  );
}
