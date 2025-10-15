export interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  avatar: string;
  author: string;
  tags: string[];
}

export interface PostsResponse {
  data: Post[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PostsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  tags?: string[];
}