import { API_CONFIG } from "./config";
import { Project, ProjectsParams, ProjectsResponse } from "@/types/project";

export const projectsApi = {
  getLists: async (params: ProjectsParams = {}): Promise<Project[]> => {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.pageSize)
      queryParams.append("pageSize", params.pageSize.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.featured !== undefined)
      queryParams.append("featured", params.featured.toString());
    if (params.ordering) queryParams.append("ordering", params.ordering);

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

    const projects: Project[] = await response.json();

    if (params.featured === undefined) {
      return projects;
    }

    return projects.filter(
      (project) => project.is_featured === params.featured
    );
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
