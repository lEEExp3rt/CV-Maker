// ============================================================
// CV-Maker Type Definitions
// ============================================================

// --- Personal Info ---

export interface CustomLink {
  label: string
  url: string
  icon?: string
}

export interface Contact {
  email: string
  phone: string
  homepage?: string
  github?: string
  customs?: CustomLink[]
}

export interface PersonalInfo {
  name: string
  photo?: string
  contact: Contact
}

// --- Education ---

export interface EducationEntry {
  school: string
  school_en?: string
  degree: string
  major: string
  start: string
  end: string
  gpa?: string
  ranking?: string
  courses?: string[]
}

// --- Internship ---

export interface InternshipEntry {
  company: string
  company_en?: string
  department?: string
  role: string
  start: string
  end: string
  details: string[]
}

// --- Project ---

export interface ProjectEntry {
  name: string
  name_en?: string
  role: string
  start: string
  end: string
  details: string[]
}

// --- Skills ---

export interface SkillCategory {
  category: string
  items: string[]
}

// --- Awards ---

export interface AwardEntry {
  name: string
  date: string
}

// --- Resume Data (root) ---

export interface ResumeData {
  personal_info: PersonalInfo
  education: EducationEntry[]
  internship: InternshipEntry[]
  projects: ProjectEntry[]
  skills?: SkillCategory[]
  awards?: AwardEntry[]
}

// --- Settings ---

export type ColorScheme = 'navy' | 'slate'

export interface FontConfig {
  chinese: string
  english: string
}

export interface Settings {
  color_scheme?: ColorScheme
  font?: FontConfig
}
