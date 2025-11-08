import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GalleryParams } from "@/types/gallery";
import { galleryApi } from "@/lib/api/gallery";

export const GALLERY_QUERY_KEYS = {
  all: ["gallery"] as const,
  lists: () => [...GALLERY_QUERY_KEYS.all, "list"] as const,
  list: (params: GalleryParams) =>
    [...GALLERY_QUERY_KEYS.lists(), params] as const,
  details: () => [...GALLERY_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...GALLERY_QUERY_KEYS.details(), id] as const,
};

export function useGallery(params: GalleryParams = {}) {
  return useQuery({
    queryKey: GALLERY_QUERY_KEYS.list(params),
    queryFn: () => galleryApi.getLists(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePrefetchGallery() {
  const queryClient = useQueryClient();

  return (params: GalleryParams) => {
    queryClient.prefetchQuery({
      queryKey: GALLERY_QUERY_KEYS.list(params),
      queryFn: () => galleryApi.getLists(params),
    });
  };
}

export function useGalleryDetail(id: string) {
  return useQuery({
    queryKey: GALLERY_QUERY_KEYS.detail(id),
    queryFn: () => galleryApi.getDetail(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}

export function usePrefetchGalleryDetail() {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: GALLERY_QUERY_KEYS.detail(id),
      queryFn: () => galleryApi.getDetail(id),
    });
  };
}
