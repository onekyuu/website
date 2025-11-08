import { User } from "./user";

export interface Category {
  id: number;
  title: string;
  image: string;
}

export interface Translations {
  [key: string]: {
    title: string;
    description: string;
    is_ai_generated: boolean;
    content: string;
  };
}

export interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  avatar: string;
  user: User;
  category: Category;
  translations: Translations;
  slug: string;
  views: number;
}

export interface PostsResponse {
  results: Post[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PostsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}
