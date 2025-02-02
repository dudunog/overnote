"use client";

import NoteEditor from "@/components/note-editor";
import { ShareNotePopover } from "@/components/share-note-popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useWriteNote } from "@/contexts/write-note-context";
import { formatDate } from "@/lib/format-date";
import { getAvatarFallback } from "@/lib/get-avatar-fallback";
import { Lightbulb } from "lucide-react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

function Skeleton() {
  return <div className="h-10 w-80 aspect-video rounded-xl bg-muted/50" />;
}

interface UpdateNotePageClientProps {
  user: User | undefined;
}

export default function UpdateNotePageClient({
  user,
}: UpdateNotePageClientProps) {
  const { note, isFetchNoteError, isEditorReady } = useWriteNote();
  const router = useRouter();

  const handleGoHome = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  if (isFetchNoteError?.error) {
    return (
      <div className="px-6 py-2">
        <div>
          <h2 className="text-xl font-bold">Permission denied</h2>
          <span>
            Ops... Seems that you don&apos;t have access to this note.
          </span>
        </div>

        <Button className="mt-5" onClick={handleGoHome}>
          Go home
        </Button>
      </div>
    );
  }

  const name = user?.name ?? user?.email;

  const avatarFallback = getAvatarFallback(name || "");

  return (
    <div className="px-6 py-2">
      {isEditorReady ? (
        <div className="flex flex-col">
          <div className="mb-7 flex flex-col gap-5 justify-between w-full md:flex-row md:gap-10">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold">Write your ideas</h2>
              <Lightbulb size={30} />
            </div>

            <ShareNotePopover />
          </div>
          <div className="mb-2 flex flex-col gap-2 justify-between md:flex-row md:items-center md:gap-5">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Created by:</span>
              <Avatar className="h-8 w-8 rounded-lg">
                {user?.image && (
                  <AvatarImage src={user?.image} alt={name || "User avatar"} />
                )}
                <AvatarFallback className="rounded-lg">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">
                {user?.id === note?.userId ? "Você" : name}
              </span>
            </div>
            {note && (
              <div>
                <span className="text-sm text-zinc-600">
                  Updated {formatDate(note.updatedAt.toString())}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Skeleton />
      )}

      <NoteEditor />
    </div>
  );
}
