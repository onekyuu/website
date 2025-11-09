import { Post } from "@/types/post";
import { Project } from "@/types/project";
import { create } from "zustand";

interface ProjectStore {
  projectList: Project[];
  updateProjectList: (newProjects: Project[]) => void;
}

const useProjectStore = create<ProjectStore>((set) => ({
  projectList: [],
  updateProjectList: (newProjects) => set({ projectList: newProjects }),
}));

export default useProjectStore;
