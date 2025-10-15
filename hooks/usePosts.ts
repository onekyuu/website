import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "@/lib/api/posts";
import type { PostsParams } from "@/types/post";

export const POST_QUERY_KEYS = {
  all: ["posts"] as const,
  lists: () => [...POST_QUERY_KEYS.all, "list"] as const,
  list: (params: PostsParams) => [...POST_QUERY_KEYS.lists(), params] as const,
};

export function usePosts(params: PostsParams = {}) {
  return useQuery({
    queryKey: POST_QUERY_KEYS.list(params),
    queryFn: () => postsApi.getLists(params),
    staleTime: 5 * 60 * 1000, // 5 分钟
  });
}

export function usePrefetchPosts() {
  const queryClient = useQueryClient();

  return (params: PostsParams) => {
    queryClient.prefetchQuery({
      queryKey: POST_QUERY_KEYS.list(params),
      queryFn: () => postsApi.getLists(params),
    });
  };
}