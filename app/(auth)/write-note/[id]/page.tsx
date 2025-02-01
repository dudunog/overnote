import { api } from "@/data/api";
import { Note } from "@/types/note";
import UpdateNotePageClient from "./page-client";

async function getNote(noteId: string): Promise<Note> {
  const response = await api(`/notes/${noteId}`, {
    cache: "no-cache",
  });
  return await response.json();
}

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const noteId = params.id;
  const note = await getNote(noteId);

  return <UpdateNotePageClient note={note} />;
}
