// ============================================================
// CV-Maker — Content Loader
//
// Uses the Vite virtual module 'virtual:cv-data' which provides
// pre-parsed resume data and settings from the YAML files.
// The virtual module supports HMR, so editing YAML files
// instantly hot-reloads in the browser.
// ============================================================

// @ts-ignore — virtual module provided by Vite plugin
import { resumeData, settings } from 'virtual:cv-data'
import type { ResumeData, Settings } from '../types/resume'

export function loadResumeData(): ResumeData {
  return (resumeData as ResumeData) || {
    personal_info: { name: 'Your Name', email: '', phone: '' },
    education: [],
    internship: [],
    projects: [],
  }
}

export function loadSettings(): Settings {
  return (settings as Settings) || { color_scheme: 'navy' }
}
