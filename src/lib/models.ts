export type UserRole = "user" | "contributor" | "author" | "admin" | "owner";
export type PostStatus = "draft" | "published" | "disabled";
export type PostVisibility = "public" | "member" | "paid_member";

export interface Page<T> {
  contents: T[];
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface Audit {
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  nickname: string;
  username: string;
  role: UserRole;
  email?: string;
  image?: string;
}

export interface Post {
  id: string;
  cover?: string;
  title?: string;
  slug: string;
  excerpt?: string;
  lexical?: string;
  status: PostStatus;
  visibility: PostVisibility;
  featured: boolean;
  authors: User[];
  tags: Tag[];
  audit?: Audit;
}

export interface Tag {
  id: number;
  slug: string;
  name: string;
  audit?: Audit;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  audit?: Audit;
}

export interface Skill {
  id: number;
  slug: string;
  name: string;
  audit?: Audit;
}
