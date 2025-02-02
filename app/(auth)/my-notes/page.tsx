import NotesList from "@/components/notes-list";
import { api } from "@/data/api";
import { auth } from "@/lib/auth";
import { Note } from "@/types/note";
import { StickyNote } from "lucide-react";

async function getNotes(userId: string): Promise<Note[]> {
  const response = await api(`/users/${userId}/notes`, {
    cache: "no-cache",
  });
  return await response.json();
}

export default async function Page() {
  const session = await auth();
  const notes = await getNotes(session?.user?.id || "");

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
