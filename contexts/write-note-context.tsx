"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { useNotes } from "@/hooks/use-notes";
import { getRandomColor } from "@/lib/colors";
import { ApiRequestError } from "@/types/api";
import { Note, NoteVisibilityEnum } from "@/types/note";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IWriteNoteContext {
  noteContent: string;
  setNoteContent: (noteContent: string) => void;
  isEditorReady: boolean;
  setIsEditorReady: (isEditorReady: boolean) => void;
  isFetchNoteError: ApiRequestError | undefined;
  note: Note | undefined;
  visibility: NoteVisibilityEnum;
  setVisibility: (visibility: NoteVisibilityEnum) => void;
}

const WriteNoteContext = createContext<IWriteNoteContext>(
  {} as IWriteNoteContext
);

interface WriteNoteProviderProps {
  initialNote: Note | undefined;
  isFetchNoteError?: ApiRequestError;
  user?: User;
  children: ReactNode;
}

export function WriteNoteProvider({
  initialNote,
  isFetchNoteError,
  user,
  children,
}: WriteNoteProviderProps) {
  const [noteContent, setNoteContent] = useState(initialNote?.content || "");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [visibility, setVisibility] = useState(
    initialNote?.visibility ?? NoteVisibilityEnum.PRIVATE
  );
  const debounceContent = useDebounce(noteContent, 700);
  const debounceVisibility = useDebounce(visibility, 700);
  const { createNote, updateNote } = useNotes();

  const [hasMounted, setHasMounted] = useState(false);

  const router = useRouter();

  const handleUpdateNoteContent = useCallback(() => {
    startTransition(async () => {
      const noteExists = initialNote?.id;

      if (noteExists) {
        await updateNote(
          {
            id: initialNote?.id || "",
            content: noteContent,
            color: initialNote?.color || "",
            visibility: visibility,
            userId: initialNote.userId,
          },
          user?.id || ""
        );
      } else {
        const createdNote = await createNote({
          content: noteContent,
          color: getRandomColor(),
          visibility: visibility as NoteVisibilityEnum,
          userId: initialNote?.userId || "",
        });

        if (createdNote) {
          router.push(`/write-note/${createdNote?.id}`);
        }
      }
    });
  }, [
    initialNote?.id,
    initialNote?.color,
    initialNote?.userId,
    updateNote,
    noteContent,
    visibility,
    createNote,
    router,
  ]);

  useEffect(() => {
    if (debounceContent && noteContent !== initialNote?.content) {
      handleUpdateNoteContent();
    }
  }, [debounceContent]);

  useEffect(() => {
    if (!hasMounted) return;

    if (debounceVisibility !== initialNote?.visibility || debounceVisibility) {
      handleUpdateNoteContent();
    }
  }, [debounceVisibility]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const contextValue: IWriteNoteContext = useMemo(
    () => ({
      noteContent,
      setNoteContent,
      isEditorReady,
      setIsEditorReady,
      isFetchNoteError,
      note: initialNote,
      visibility,
      setVisibility,
    }),
    [
      noteContent,
      setNoteContent,
      isEditorReady,
      setIsEditorReady,
      isFetchNoteError,
      initialNote,
      visibility,
      setVisibility,
    ]
  );

  return (
    <WriteNoteContext.Provider value={contextValue}>
      {children}
    </WriteNoteContext.Provider>
  );
}

export const useWriteNote = () => useContext(WriteNoteContext);
