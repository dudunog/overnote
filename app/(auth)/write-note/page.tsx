import { WriteNoteProvider } from "@/contexts/write-note-context";
import { auth } from "@/lib/auth";
import WriteNotePageClient from "./page-client";
import { NoteWithUser } from "@/app/(auth)/actions/get-note";

export default async function Page() {
  const session = await auth();

  return (
    <WriteNoteProvider
      initialNote={
        {
          userId: session?.user?.id,
        } as NoteWithUser
      }
      user={session?.user}
    >
      <WriteNotePageClient />
    </WriteNoteProvider>
  );
}
