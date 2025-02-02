import NewNoteFloatingButton from "@/components/new-note-floating-button";
import NotesList from "@/components/notes-list";
import { Separator } from "@/components/ui/separator";
import ViewNotesLink from "@/components/view-notes-link";
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

async function getSharedNotes(userId: string): Promise<Note[]> {
  const response = await api(`/users/${userId}/shared-notes`, {
    cache: "no-cache",
  });
  return await response.json();
}

export default async function Page() {
  const session = await auth();
  const notes = await getNotes(session?.user?.id || "");
  const sharedNotes = await getSharedNotes(session?.user?.id || "");

  return (
    <>
      <div className="px-6 py-2"></div>

      <div className="px-6 py-2">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-3xl font-bold">My notes</h2>
          <StickyNote size={30} />
        </div>

        <NotesList notes={notes} variant="limited" />
      </div>

      <div className="py-5 px-6">
        <Separator />
      </div>

      <div className="px-6">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-3xl font-bold">Shared notes</h2>
          <StickyNote size={30} />
        </div>

        <NotesList
          notes={sharedNotes}
          variant="limited"
          noItemsTitle="No notes shared with you!"
          noItemsMessage="It looks like no one has shared any notes with you yet. Check back later or ask your friends to share their notes!"
          showWriteNoteButton={false}
        />
      </div>

      {notes && notes.length > 0 && <NewNoteFloatingButton />}
    </>
  );
}
