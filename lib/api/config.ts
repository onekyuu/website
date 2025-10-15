export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  endpoints: {
    posts: {
      lists: "/post/lists",
      detail: (id: string) => `/post/${id}`,
    },
  },
};
