"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { useNotes } from "@/hooks/use-notes";
import { getRandomColor } from "@/lib/colors";
import { ApiRequestError } from "@/types/api";
import { Note } from "@/types/note";
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
  isPublicNote: boolean;
  setIsPublicNote: (isPublicNote: boolean) => void;
  noteContent: string;
  setNoteContent: (noteContent: string) => void;
  isEditorReady: boolean;
  setIsEditorReady: (isEditorReady: boolean) => void;
  isFetchNoteError: ApiRequestError | undefined;
  note: Note | undefined;
}

const WriteNoteContext = createContext<IWriteNoteContext>(
  {} as IWriteNoteContext
);

interface WriteNoteProviderProps {
  initialNote: Note | undefined;
  isFetchNoteError?: ApiRequestError;
  children: ReactNode;
}

export function WriteNoteProvider({
  initialNote,
  isFetchNoteError,
  children,
}: WriteNoteProviderProps) {
  const [noteContent, setNoteContent] = useState(initialNote?.content || "");
  const [isPublicNote, setIsPublicNote] = useState(
    initialNote?.public || false
  );
  const [isEditorReady, setIsEditorReady] = useState(false);
  const debounceContent = useDebounce(noteContent, 700);
  const debounceIsPublic = useDebounce(isPublicNote, 700);
  const { createNote, updateNote } = useNotes();

  const [hasMounted, setHasMounted] = useState(false);

  const router = useRouter();

  const handleUpdateNoteContent = useCallback(() => {
    startTransition(async () => {
      const noteExists = initialNote?.id;

      if (noteExists) {
        await updateNote({
          id: initialNote?.id || "",
          content: noteContent,
          color: initialNote?.color || "",
          public: isPublicNote,
          userId: initialNote.userId,
        });
      } else {
        const createdNote = await createNote({
          content: noteContent,
          color: getRandomColor(),
          public: isPublicNote,
          userId: initialNote?.userId || "",
        });

        router.push(`/write-note/${createdNote?.id}`);
      }
    });
  }, [
    initialNote?.id,
    initialNote?.color,
    initialNote?.userId,
    updateNote,
    noteContent,
    isPublicNote,
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

    if (debounceIsPublic !== initialNote?.public || !debounceIsPublic) {
      handleUpdateNoteContent();
    }
  }, [debounceIsPublic]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const contextValue: IWriteNoteContext = useMemo(
    () => ({
      noteContent,
      setNoteContent,
      isPublicNote,
      setIsPublicNote,
      isEditorReady,
      setIsEditorReady,
      isFetchNoteError,
      note: initialNote,
    }),
    [
      noteContent,
      setNoteContent,
      isPublicNote,
      setIsPublicNote,
      isEditorReady,
      setIsEditorReady,
      isFetchNoteError,
      initialNote,
    ]
  );

  return (
    <WriteNoteContext.Provider value={contextValue}>
      {children}
    </WriteNoteContext.Provider>
  );
}

export const useWriteNote = () => useContext(WriteNoteContext);
