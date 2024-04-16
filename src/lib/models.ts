export type UserRole = "user" | "contributor" | "author" | "admin" | "owner";

export interface User {
  id: string;
  nickname: string;
  username: string;
  role: UserRole;
  email?: string;
  image?: string;
}