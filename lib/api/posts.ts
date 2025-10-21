import { API_CONFIG } from "./config";
import type { PostsResponse, PostsParams, Post } from "@/types/post";

export const postsApi = {
  getLists: async (params: PostsParams = {}): Promise<PostsResponse> => {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.pageSize)
      queryParams.append("page_size", params.pageSize.toString());
    if (params.search) queryParams.append("search", params.search);

    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.posts.lists}${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    return response.json();
  },
  getDetail: async (slug: string): Promise<Post> => {
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.posts.detail(
      slug
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    return response.json();
  },
};
