export type User = {
  _id: string;
  username: string;
  favorites: number[];
  role: string;
  company?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  following: User[];
  __v: number;
};
