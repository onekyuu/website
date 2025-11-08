import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProjectsParams } from "@/types/project";
import { projectsApi } from "@/lib/api/projects";

export const PROJECT_QUERY_KEYS = {
  all: ["projects"] as const,
  lists: () => [...PROJECT_QUERY_KEYS.all, "list"] as const,
  list: (params: ProjectsParams) =>
    [...PROJECT_QUERY_KEYS.lists(), params] as const,
  details: () => [...PROJECT_QUERY_KEYS.all, "detail"] as const,
  detail: (slug: string) => [...PROJECT_QUERY_KEYS.details(), slug] as const,
};

export function useProjects(params: ProjectsParams = {}) {
  return useQuery({
    queryKey: PROJECT_QUERY_KEYS.list(params),
    queryFn: () => projectsApi.getLists(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePrefetchProjects() {
  const queryClient = useQueryClient();

  return (params: ProjectsParams) => {
    queryClient.prefetchQuery({
      queryKey: PROJECT_QUERY_KEYS.list(params),
      queryFn: () => projectsApi.getLists(params),
    });
  };
}

export function useProjectDetail(slug: string) {
  return useQuery({
    queryKey: PROJECT_QUERY_KEYS.detail(slug),
    queryFn: () => projectsApi.getDetail(slug),
    staleTime: 10 * 60 * 1000,
    enabled: !!slug,
  });
}

export function usePrefetchProjectDetail() {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: PROJECT_QUERY_KEYS.detail(slug),
      queryFn: () => projectsApi.getDetail(slug),
    });
  };
}
