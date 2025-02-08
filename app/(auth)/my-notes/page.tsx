import NewNoteFloatingButton from "@/components/new-note-floating-button";
import NotesList from "@/components/notes-list";
import { auth } from "@/lib/auth";
import { StickyNote } from "lucide-react";
import { getNotes } from "@/app/(auth)/actions/get-notes";

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

      {notes && notes.length > 0 && <NewNoteFloatingButton />}
    </div>
  );
}
