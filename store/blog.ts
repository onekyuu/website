import { Post } from "@/types/post";
import { create } from "zustand";

interface BlogStore {
  blogList: Post[];
  updateBlogList: (newBlogs: Post[]) => void;
}

const useBlogStore = create<BlogStore>((set) => ({
  blogList: [],
  updateBlogList: (newBlogs) => set({ blogList: newBlogs }),
}));

export default useBlogStore;
