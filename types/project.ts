import { LanguageCode } from "./common";

export enum SkillType {
  FRONTEND = "Frontend",
  BACKEND = "Backend",
  DEVOPS = "DevOps",
}

export const SKILL_TYPE_LABELS: Record<SkillType, string> = {
  [SkillType.FRONTEND]: "Frontend",
  [SkillType.BACKEND]: "Backend",
  [SkillType.DEVOPS]: "DevOps",
};

export interface SkillsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface SkillsResponse {
  results: Skill[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Skill {
  id: number;
  name: string;
  image_url: string;
  type: SkillType;
}

export interface ProjectTranslationBase {
  title: string;
  description: string;
  info: string[];
}

export interface ProjectBase {
  id: number;
  slug: string;
  date: string;
  images: string[];
  skills: Skill[];
  is_featured: boolean;
  created_at: string;
}

export type ProjectTranslation = {
  [K in LanguageCode]?: ProjectTranslationBase;
};

export type Project = ProjectBase & { translations: ProjectTranslation };

export interface ProjectsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface ProjectsResponse {
  results: Project[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
