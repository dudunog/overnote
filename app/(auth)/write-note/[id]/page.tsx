import { WriteNoteProvider } from "@/contexts/write-note-context";
import UpdateNotePageClient from "./page-client";
import { auth } from "@/lib/auth";
import { getNote } from "@/app/(auth)/actions/get-note";

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
      user={session?.user}
    >
      <UpdateNotePageClient user={session?.user} />
    </WriteNoteProvider>
  );
}
