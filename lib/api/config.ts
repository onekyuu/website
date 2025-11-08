export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  endpoints: {
    posts: {
      lists: "/post/lists",
      detail: (slug: string) => `/post/detail/${slug}`,
    },
    projects: {
      lists: "/projects/list",
      detail: (slug: string) => `/projects/detail/${slug}`,
    },
    skills: {
      lists: "/projects/skill/list",
      detail: (slug: string) => `/projects/skill/${slug}`,
    },
  },
};
