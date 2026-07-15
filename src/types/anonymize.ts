export interface AnonOptions {
  name: boolean
  photo: boolean
  contact: boolean
  socials: boolean
  education: boolean
  internship: boolean
  projects: boolean
}

export const DEFAULT_ANON: AnonOptions = {
  name: false,
  photo: false,
  contact: false,
  socials: false,
  education: false,
  internship: false,
  projects: false,
}
