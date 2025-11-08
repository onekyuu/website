import { API_CONFIG } from "./config";
import { Project, ProjectsParams, ProjectsResponse } from "@/types/project";

export const projectsApi = {
  getLists: async (params: ProjectsParams = {}): Promise<Project[]> => {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.pageSize)
      queryParams.append("pageSize", params.pageSize.toString());
    if (params.search) queryParams.append("search", params.search);

    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.projects.lists}${
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
  getDetail: async (slug: string): Promise<Project> => {
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.projects.detail(
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
};
