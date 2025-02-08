"use client";

import { NoteWithUser } from "@/app/(auth)/actions/get-note";
import { useDebounce } from "@/hooks/use-debounce";
import { useNotes } from "@/hooks/use-notes";
import { getRandomColor } from "@/lib/colors";
import { ActionError } from "@/types/api";
import { Visibility } from "@prisma/client";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

interface IWriteNoteContext {
  note: NoteWithUser | undefined;
  noteContent: string;
  setNoteContent: (noteContent: string) => void;
  color: string;
  setColor: (color: string) => void;
  visibility: Visibility;
  setVisibility: (visibility: Visibility) => void;
  lastCursorPosition: number;
  setLastCursorPosition: (lastCursorPosition: number) => void;
  isEditorReady: boolean;
  setIsEditorReady: (isEditorReady: boolean) => void;
  isFetchNoteError: ActionError | undefined;
  isLoading: boolean;
}

const WriteNoteContext = createContext<IWriteNoteContext>(
  {} as IWriteNoteContext
);

interface WriteNoteProviderProps {
  initialNote: NoteWithUser | undefined;
  isFetchNoteError?: ActionError;
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
  const [color, setColor] = useState(initialNote?.color || "");
  const [visibility, setVisibility] = useState<Visibility>(
    initialNote?.visibility ?? Visibility.PRIVATE
  );
  const [lastCursorPosition, setLastCursorPosition] = useState(
    initialNote?.lastCursorPosition || 1
  );
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const debounceContent = useDebounce(noteContent, 700);
  const debounceVisibility = useDebounce(visibility, 700);
  const debounceColor = useDebounce(color, 700);

  const router = useRouter();
  const { createNote, updateNote } = useNotes();
  const [isLoading, startTransition] = useTransition();

  const saveNoteContent = useCallback(() => {
    startTransition(async () => {
      const noteExists = initialNote?.id;

      if (noteExists) {
        await updateNote(
          {
            id: initialNote?.id || "",
            content: noteContent,
            color: color || "",
            visibility: visibility,
            lastCursorPosition,
            userId: initialNote?.userId || "",
          },
          user?.id || ""
        );
      } else {
        const createdNote = await createNote({
          content: noteContent,
          color: getRandomColor(),
          visibility,
          lastCursorPosition,
          userId: initialNote?.userId || "",
        });

        if (createdNote) {
          router.push(`/write-note/${createdNote?.id}`);
        }
      }
    });
  }, [
    initialNote?.id,
    initialNote?.userId,
    updateNote,
    noteContent,
    color,
    user?.id,
    visibility,
    lastCursorPosition,
    createNote,
    router,
  ]);

  useEffect(() => {
    if (debounceContent && noteContent !== initialNote?.content) {
      saveNoteContent();
    }
  }, [debounceContent]);

  useEffect(() => {
    if (!hasMounted) return;

    if (debounceVisibility !== initialNote?.visibility || debounceVisibility) {
      saveNoteContent();
    }
  }, [debounceVisibility]);

  useEffect(() => {
    if (!hasMounted) return;

    if (debounceColor !== initialNote?.visibility || debounceColor) {
      saveNoteContent();
    }
  }, [debounceColor]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const contextValue: IWriteNoteContext = useMemo(
    () => ({
      note: initialNote,
      noteContent,
      setNoteContent,
      color,
      setColor,
      visibility,
      setVisibility,
      lastCursorPosition,
      setLastCursorPosition,
      isEditorReady,
      setIsEditorReady,
      isFetchNoteError,
      isLoading,
    }),
    [
      initialNote,
      noteContent,
      setNoteContent,
      color,
      setColor,
      visibility,
      setVisibility,
      lastCursorPosition,
      setLastCursorPosition,
      isEditorReady,
      setIsEditorReady,
      isFetchNoteError,
      isLoading,
    ]
  );

  return (
    <WriteNoteContext.Provider value={contextValue}>
      {children}
    </WriteNoteContext.Provider>
  );
}

export const useWriteNote = () => useContext(WriteNoteContext);
