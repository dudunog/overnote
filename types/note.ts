export interface Note {
  id: string;
  content: string;
  color: string;
  public: boolean;
  userId: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
