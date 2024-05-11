export type UserRole = "user" | "contributor" | "author" | "admin" | "owner";
export type PostStatus = "draft" | "published";
export type PostVisibility = "public" | "member" | "paid_member";
export type CourseStatus = "draft" | "published";
export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseAccess = "free" | "premium";
export type LessonStatus = "draft" | "published";

export interface Page<T> {
  contents: T[];
  currentPage: number;
  totalPage: number;
  pageSize: number;
  totalElements: number;
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

export interface Tag {
  id: number;
  slug: string;
  name: string;
  postCount?: string;
  audit?: Audit;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  courseCount?: string;
  audit?: Audit;
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
  wordCount: number;
  authors?: User[];
  tags?: Tag[];
  publishedAt?: string;
  meta?: PostMeta;
  audit?: Audit;
}

export interface PostMeta {
  viewCount: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  cover?: string;
  excerpt?: string;
  featured: boolean;
  description?: string;
  level: CourseLevel;
  access: CourseAccess;
  status: CourseStatus;
  publishedAt?: string;
  category?: Category;
  authors?: User[];
  chapters?: Chapter[];
  meta?: CourseMeta;
  audit?: Audit;
}

export interface CourseMeta {
  rating: string;
  ratingCount: string;
  enrolledCount: string;
}

export interface CourseReview {
  rating: number;
  message?: string;
  user: User;
  audit: Audit;
}

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  sortOrder: number;
  course?: Course;
  lessons?: Lesson[];
  audit?: Audit;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  slug: string;
  trial: boolean;
  status: LessonStatus;
  lexical?: string;
  sortOrder: number;
  chapter?: Chapter;
  course?: Course;
  completed?: boolean;
  audit?: Audit;
}

export interface EnrolledCourse {
  course: Course;
  resumeLesson?: Lesson;
  completedLessons: string[];
  progress: number;
}

export interface DashboardSummary {
  courseCount: number;
  postCount: number;
  subscriberCount: number;
  userCount: number;
  monthlyEnrollments: { [key: string]: number };
  enrolledByLevel: { [key: string]: number };
}

export interface CourseReview {
  rating: number;
  message?: string;
  user: User;
  audit: Audit;
}

export interface AiPromptRequest {
  prompt: string;
  option: string;
  command: string;
}
