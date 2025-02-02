import NotesList from "@/components/notes-list";
import { api } from "@/data/api";
import { Note } from "@/types/note";
import { StickyNote } from "lucide-react";

async function getNotes(): Promise<Note[]> {
  const response = await api("/notes", {
    cache: "no-cache",
  });
  return await response.json();
}

export default async function Page() {
  const notes = await getNotes();

  return (
    <div className="px-6 py-2">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-3xl font-bold">My notes</h2>
        <StickyNote size={30} />
      </div>

      <NotesList notes={notes} />
    </div>
  );
}
