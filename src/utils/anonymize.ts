import type { ResumeData } from '../types/resume'
import type { AnonOptions } from '../types/anonymize'

/** Replace text with asterisks, preserving length */
function mask(text: string): string {
  if (!text) return text
  const len = text.replace(/[一-鿿]/g, '**').length
  return '•'.repeat(Math.max(1, Math.min(len, 6)))
}

export function applyAnonymization(data: ResumeData, opts: AnonOptions): ResumeData {
  const d = JSON.parse(JSON.stringify(data)) as ResumeData

  // Name
  if (opts.name) {
    d.personal_info.name = mask(d.personal_info.name)
  }

  // Photo
  if (opts.photo) {
    d.personal_info.photo = ''
  }

  // Contact (email + phone)
  if (opts.contact) {
    d.personal_info.contact.email = mask(d.personal_info.contact.email)
    d.personal_info.contact.phone = mask(d.personal_info.contact.phone)
  }

  // Socials + customs
  if (opts.socials) {
    d.personal_info.contact.socials = d.personal_info.contact.socials?.map((s) => ({
      ...s, url: s.url ? mask(s.url) : '',
    }))
    d.personal_info.contact.customs = d.personal_info.contact.customs?.map((c) => ({
      ...c, url: c.url ? mask(c.url) : '', label: c.label ? mask(c.label) : '',
    }))
  }

  // Education — school name + subtitle
  if (opts.education) {
    d.educations = d.educations.map((e) => ({
      ...e, school: mask(e.school), school_subtitle: e.school_subtitle ? mask(e.school_subtitle) : undefined,
    }))
  }

  // Internship — company + subtitle + department
  if (opts.internship) {
    d.internships = d.internships.map((e) => ({
      ...e,
      company: mask(e.company),
      company_subtitle: e.company_subtitle ? mask(e.company_subtitle) : undefined,
      department: e.department ? mask(e.department) : undefined,
    }))
  }

  // Projects — URL only
  if (opts.projects) {
    d.projects = d.projects.map((p) => ({
      ...p, url: p.url ? mask(p.url) : undefined,
    }))
  }

  return d
}
