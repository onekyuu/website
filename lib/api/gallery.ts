import {
  GalleryPhoto,
  GalleryParams,
  GalleryResponse,
  GalleryTimelineResponse,
} from "@/types/gallery";
import { API_CONFIG } from "./config";

export const galleryApi = {
  getLists: async (params: GalleryParams = {}): Promise<GalleryResponse> => {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.pageSize)
      queryParams.append("pageSize", params.pageSize.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.featured !== undefined)
      queryParams.append("featured", params.featured.toString());

    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.gallery.lists}${
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
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    return response.json();
  },
  getDetail: async (slug: string): Promise<GalleryPhoto> => {
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.gallery.detail(
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
      throw new Error(`Failed to fetch project detail: ${response.statusText}`);
    }

    return response.json();
  },
  timeline: async (): Promise<GalleryTimelineResponse> => {
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.gallery.timeline}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch gallery timeline: ${response.statusText}`
      );
    }

    return response.json();
  },
};
