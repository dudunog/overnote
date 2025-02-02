import { WriteNoteProvider } from "@/contexts/write-note-context";
import { Note } from "@/types/note";
import { auth } from "@/lib/auth";
import WriteNotePageClient from "./page-client";

export default async function Page() {
  const session = await auth();

  return (
    <WriteNoteProvider
      initialNote={
        {
          userId: "",
        } as Note
      }
      user={session?.user}
    >
      <WriteNotePageClient user={session?.user ?? {}} />
    </WriteNoteProvider>
  );
}
