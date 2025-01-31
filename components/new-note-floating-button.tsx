"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

export default function NewNoteFloatingButton() {
  const router = useRouter();

  const handleGoToWriteNotePage = useCallback(() => {
    router.push("write-note");
  }, [router]);

  return (
    <div
      className="fixed bottom-7 right-7 transform p-4 flex items-center gap-2 bg-black text-white rounded-xl font-light text-sm cursor-pointer"
      onClick={handleGoToWriteNotePage}
    >
      <Pencil size={15} />
      Write note
    </div>
  );
}
