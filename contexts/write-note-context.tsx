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
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
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
  color: string;
  setColor: (color: string) => void;
  isLoading: boolean;
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
  const [visibility, setVisibility] = useState(
    initialNote?.visibility ?? NoteVisibilityEnum.PRIVATE
  );
  const [color, setColor] = useState(initialNote?.color || "");
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
            userId: initialNote?.userId || "",
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
    initialNote?.userId,
    updateNote,
    noteContent,
    color,
    user?.id,
    visibility,
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
      noteContent,
      setNoteContent,
      isEditorReady,
      setIsEditorReady,
      isFetchNoteError,
      note: initialNote,
      visibility,
      setVisibility,
      color,
      setColor,
      isLoading,
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
      color,
      setColor,
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
