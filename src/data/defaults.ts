import type { ResumeData } from '../types/resume'

export const DEFAULT_RESUME_DATA: ResumeData = {
  personal_info: {
    name: '',
    contact: {
      email: '',
      phone: '',
      socials: [],
      customs: [],
    },
  },
  educations: [],
  internships: [],
  projects: [],
  skills: [],
  awards: [],
}
