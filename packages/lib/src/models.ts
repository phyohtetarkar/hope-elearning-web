export type UserRole = "user" | "contributor" | "author" | "admin" | "owner";
export type PostStatus = "draft" | "published";
export type PostVisibility = "public" | "member" | "paid_member";
export type CourseStatus = "draft" | "published";
export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseAccess = "free" | "premium";
export type LessonType = "text" | "video" | "quiz";
export type QuizType = "multiple_choice" | "single_choice" | "short_answer";

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
  emailVerified: boolean;
  image?: string;
  headline?: string;
  expiredAt: number;
}

export interface UserMeta {
  enrollmentCount: number;
  bookmarkCount: number;
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
  id: number;
  cover?: string;
  title?: string;
  slug: string;
  excerpt?: string;
  lexical?: string;
  html?: string;
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
  id: number;
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
  id: number;
  title: string;
  slug: string;
  sortOrder: number;
  course?: Course;
  lessons?: Lesson[];
  audit?: Audit;
}

export interface Lesson {
  id: number;
  title: string;
  slug: string;
  trial: boolean;
  type: LessonType;
  lexical?: string;
  html?: string;
  sortOrder: number;
  wordCount: number;
  chapter?: Chapter;
  quizzes?: Quiz[];
  completed?: boolean;
  audit?: Audit;
}

export interface Quiz {
  id: number;
  question: string;
  type: QuizType;
  feedback?: string;
  sortOrder: number;
  answers: QuizAnswer[];
  audit?: Audit;
}

export interface QuizAnswer {
  id: number;
  answer: string;
  correct: boolean;
  sortOrder: number;
  deleted?: boolean;
  audit?: Audit;
}

export interface QuizResponse {
  quizId: number;
  shortAnswer?: string;
  answer: QuizAnswer;
}

export interface EnrolledCourse {
  course: Course;
  resumeLesson?: Lesson;
  completedLessons: number[];
  progress: number;
}

export interface DashboardSummary {
  courseCount: number;
  postCount: number;
  subscriberCount: number;
  userCount: number;
  enrolledByLevel: { [key: string]: number };
}

export interface MonthlyEnrollmentDto {
  data: { [key: string]: number | undefined };
}

export interface SiteSetting {
  aboutUs?: string;
  privacyPolicy?: string;
  termsAndConditions?: string;
}

export interface AuditAction {
  resourceId: string;
  resourceType: string;
  actorId: string;
  actorType: string;
  actorName: string;
  actorImage?: string | null;
  event: string;
  context?: string;
  createdAt: string;
  count: number;
}

export interface AiPromptRequest {
  prompt: string;
  option: string;
  command: string;
  apiKey?: string;
}
