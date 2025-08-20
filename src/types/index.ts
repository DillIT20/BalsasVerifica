export type UserRole = "citizen" | "company" | "admin";

export type PostStatus = "pending" | "resolved" | "in_progress";

export type PostCategory =
  | "saude"
  | "infraestrutura"
  | "atendimento"
  | "transporte"
  | "educacao"
  | "seguranca"
  | "meio_ambiente"
  | "outros";

export type PostType = "problema" | "elogio" | "sugestao";

export type InstitutionType = "empresa" | "prefeitura";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  institutionId?: string;
  createdAt: Date;
}

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  logo?: string;
  description?: string;
  verified: boolean;
  isPremium: boolean;
  responseRate?: number;
  averageResponseTime?: string;
  totalMentions?: number;
  createdAt: Date;
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  author: User;
  institutionId: string;
  institution: Institution;
  category: PostCategory;
  type: PostType;
  status: PostStatus;
  likes: number;
  dislikes: number;
  commentsCount: number;
  isLikedByUser?: boolean;
  isDislikedByUser?: boolean;
  hasOfficialResponse: boolean;
  location?: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  postId: string;
  parentId?: string;
  isOfficial: boolean;
  likes: number;
  dislikes: number;
  isLikedByUser?: boolean;
  isDislikedByUser?: boolean;
  createdAt: Date;
}

export interface Chat {
  id: string;
  postId: string;
  participants: User[];
  isActive: boolean;
  createdAt: Date;
  lastMessageAt?: Date;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  sender: User;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Report {
  id: string;
  reporterId: string;
  reporter: User;
  targetType: "post" | "comment";
  targetId: string;
  reason: string;
  description?: string;
  status: "pending" | "reviewed" | "dismissed";
  createdAt: Date;
}

export interface Filter {
  categories: PostCategory[];
  status: PostStatus[];
  institutionTypes: InstitutionType[];
  search?: string;
}
