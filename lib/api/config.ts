export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  endpoints: {
    posts: {
      lists: "/post/lists",
      detail: (slug: string) => `/post/detail/${slug}`,
    },
  },
};
