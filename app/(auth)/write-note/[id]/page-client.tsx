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
import { useCallback, useMemo, useTransition } from "react";
import { motion } from "framer-motion";
import { useNotes } from "@/hooks/use-notes";
import { SelectColorPopover } from "@/components/select-color-popover";
import Loading from "@/components/loading";

function Skeleton() {
  return (
    <div>
      <div className="mb-7 flex flex-col gap-5 justify-between w-full md:flex-row md:gap-10">
        <div className="h-10 w-80 aspect-video rounded-xl bg-muted/50" />
        <div className="h-10 w-20 aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="mb-5">
        <div className="h-10 w-28 aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="mb-2 flex flex-col gap-2 justify-between md:flex-row md:items-center md:gap-5">
        <div className="h-10 w-60 aspect-video rounded-xl bg-muted/50" />
        <div className="h-10 w-40 aspect-video rounded-xl bg-muted/50" />
      </div>
      <div>
        <div className="h-72 w-full aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="mt-3 flex justify-end">
        <div className="h-10 w-28 aspect-video rounded-xl bg-muted/50" />
      </div>
    </div>
  );
}

interface UpdateNotePageClientProps {
  user: User | undefined;
}

export default function UpdateNotePageClient({
  user,
}: UpdateNotePageClientProps) {
  const { note, isFetchNoteError, isEditorReady, isLoading } = useWriteNote();
  const { deleteNote } = useNotes();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleGoHome = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const handleDeleteNote = useCallback(() => {
    startTransition(async () => {
      await deleteNote(note?.id || "");
    });

    router.push("/my-notes");
  }, [deleteNote, note?.id, router]);

  const name = note?.user?.name ?? note?.user?.email;

  const avatarFallback = getAvatarFallback(name || "");

  const isUserNoteOwner = useMemo(
    () => user?.id === note?.userId,
    [note?.userId, user?.id]
  );

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
          Go dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="px-6 py-2">
      {isEditorReady ? (
        <motion.div
          className="flex flex-col"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div
            className="mb-4 flex flex-col gap-5 justify-between w-full sm:flex-row sm:gap-10 sm:mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold">Write your ideas</h2>
              <Lightbulb size={30} />
            </div>

            {note?.canEdit && note.userId === user?.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ShareNotePopover />
              </motion.div>
            )}
          </motion.div>

          {note?.canEdit && (
            <motion.div
              className="mb-5 flex items-center gap-2 justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SelectColorPopover />

              {(isLoading || isPending) && <Loading size={20} />}
            </motion.div>
          )}

          <motion.div
            className="mb-2 flex flex-col gap-2 justify-between md:flex-row md:items-center md:gap-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <span>Created by</span>
              {!isUserNoteOwner && (
                <Avatar className="h-8 w-8 rounded-lg">
                  {user?.image && (
                    <AvatarImage
                      src={user?.image}
                      alt={name || "User avatar"}
                    />
                  )}
                  <AvatarFallback className="rounded-lg">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
              )}
              <span className="font-semibold">
                {isUserNoteOwner ? "you" : name}
              </span>
            </div>
            {note && (
              <div>
                <span className="text-sm text-zinc-600">
                  Updated {formatDate(note.updatedAt.toString())}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <Skeleton />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      >
        <NoteEditor />
      </motion.div>

      {isEditorReady && note?.userId === user?.id && (
        <motion.div
          className="mt-3 flex justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="mt-3 flex justify-end">
            <Button
              variant="destructive"
              onClick={handleDeleteNote}
              disabled={isPending}
              isLoading={isPending}
            >
              Delete note
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
