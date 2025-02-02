import { api } from "@/data/api";
import { Note } from "@/types/note";
import { WriteNoteProvider } from "@/contexts/write-note-context";
import UpdateNotePageClient from "./page-client";
import { auth } from "@/lib/auth";
import { ApiRequestError } from "@/types/api";

async function getNote(
  noteId: string,
  userId: string
): Promise<Note | ApiRequestError> {
  const response = await api(`/users/${userId}/notes/${noteId}`, {
    cache: "no-cache",
  });
  return await response.json();
}

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const session = await auth();
  const noteId = params.id;
  const note = await getNote(noteId, session?.user?.id || "");

  return (
    <WriteNoteProvider
      initialNote={"error" in note ? undefined : note}
      isFetchNoteError={"error" in note ? note : undefined}
    >
      <UpdateNotePageClient user={session?.user} />
    </WriteNoteProvider>
  );
}
