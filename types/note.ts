export interface Note {
  id: string;
  content: string;
  color: string;
  public: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
