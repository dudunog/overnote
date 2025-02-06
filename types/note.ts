export enum NoteVisibilityEnum {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  READ_ONLY = "READ_ONLY",
}

export const NoteVisibility = ["PUBLIC", "PRIVATE", "READ_ONLY"] as const;

export interface Note {
  id: string;
  content: string;
  color: string;
  visibility: NoteVisibilityEnum;
  lastCursorPosition: number;
  userId: string;
  user: {
    name: string;
    email: string;
  };
  canEdit?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
