import { Skill, SkillsParams, SkillsResponse } from "@/types/project";
import { API_CONFIG } from "./config";

export const skillsApi = {
  getLists: async (params: SkillsParams = {}): Promise<SkillsResponse> => {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.pageSize)
      queryParams.append("page_size", params.pageSize.toString());
    if (params.search) queryParams.append("search", params.search);

    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.skills.lists}${
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
      throw new Error(`Failed to fetch skills: ${response.statusText}`);
    }

    return response.json();
  },
  getDetail: async (slug: string): Promise<Skill> => {
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.skills.detail(
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
      throw new Error(`Failed to fetch skill detail: ${response.statusText}`);
    }

    return response.json();
  },
};
