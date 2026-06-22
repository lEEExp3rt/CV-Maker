import type { ResumeData } from './resume'

export interface Project {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  data: ResumeData
}

export interface ProjectStore {
  active: string
  projects: Project[]
}
