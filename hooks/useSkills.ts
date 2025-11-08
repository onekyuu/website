import { useQuery, useQueryClient } from "@tanstack/react-query";
import { skillsApi } from "@/lib/api/skills";
import { SkillsParams } from "@/types/project";

export const SKILL_QUERY_KEYS = {
  all: ["skills"] as const,
  lists: () => [...SKILL_QUERY_KEYS.all, "list"] as const,
  list: (params: SkillsParams) =>
    [...SKILL_QUERY_KEYS.lists(), params] as const,
  details: () => [...SKILL_QUERY_KEYS.all, "detail"] as const,
  detail: (slug: string) => [...SKILL_QUERY_KEYS.details(), slug] as const,
};

export function useSkills(params: SkillsParams = {}) {
  return useQuery({
    queryKey: SKILL_QUERY_KEYS.list(params),
    queryFn: () => skillsApi.getLists(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePrefetchSkills() {
  const queryClient = useQueryClient();

  return (params: SkillsParams) => {
    queryClient.prefetchQuery({
      queryKey: SKILL_QUERY_KEYS.list(params),
      queryFn: () => skillsApi.getLists(params),
    });
  };
}

export function useSkillDetail(slug: string) {
  return useQuery({
    queryKey: SKILL_QUERY_KEYS.detail(slug),
    queryFn: () => skillsApi.getDetail(slug),
    staleTime: 10 * 60 * 1000,
    enabled: !!slug,
  });
}

export function usePrefetchSkillDetail() {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: SKILL_QUERY_KEYS.detail(slug),
      queryFn: () => skillsApi.getDetail(slug),
    });
  };
}
