import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "@/lib/api/posts";
import type { PostsParams } from "@/types/post";

export const POST_QUERY_KEYS = {
  all: ["posts"] as const,
  lists: () => [...POST_QUERY_KEYS.all, "list"] as const,
  list: (params: PostsParams) => [...POST_QUERY_KEYS.lists(), params] as const,
  details: () => [...POST_QUERY_KEYS.all, "detail"] as const,
  detail: (slug: string, locale?: string) =>
    [...POST_QUERY_KEYS.details(), slug, locale] as const,
};

export function usePosts(params: PostsParams = {}) {
  return useQuery({
    queryKey: POST_QUERY_KEYS.list(params),
    queryFn: () => postsApi.getLists(params),
    staleTime: 5 * 60 * 1000,
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

export function usePostDetail(slug: string) {
  return useQuery({
    queryKey: POST_QUERY_KEYS.detail(slug),
    queryFn: () => postsApi.getDetail(slug),
    staleTime: 10 * 60 * 1000,
    enabled: !!slug,
  });
}

export function usePrefetchPostDetail() {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: POST_QUERY_KEYS.detail(slug),
      queryFn: () => postsApi.getDetail(slug),
    });
  };
}
