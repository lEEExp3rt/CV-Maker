// Validate imported ResumeData. Returns an array of human-readable issues.
// Empty array = valid.

import type { ResumeData } from '../types/resume'

type Issue = { path: string; message: string }

type Rule = {
  path: (string | number)[]
  required?: boolean
  type?: 'string' | 'array' | 'object'
  check?: (val: any) => string | null
}

function get(obj: any, path: (string | number)[]): any {
  let cur = obj
  for (const seg of path) {
    if (cur == null) return undefined
    cur = cur[seg]
  }
  return cur
}

const RULES: Rule[] = [
  // personal_info
  { path: ['personal_info'], required: true, type: 'object' },
  { path: ['personal_info', 'name'], required: true, type: 'string' },
  { path: ['personal_info', 'contact'], required: true, type: 'object' },
  { path: ['personal_info', 'contact', 'email'], required: true, type: 'string' },
  { path: ['personal_info', 'contact', 'phone'], required: true, type: 'string' },
  // educations
  { path: ['educations'], required: true, type: 'array' },
  // internships (optional array but items must be valid)
  { path: ['internships'], type: 'array' },
  // projects
  { path: ['projects'], required: true, type: 'array' },
]

function label(path: (string | number)[]): string {
  return path.join('.')
}

export function validate(data: any): Issue[] {
  const issues: Issue[] = []

  // Top-level must be an object
  if (!data || typeof data !== 'object') {
    issues.push({ path: '(root)', message: 'JSON 必须是对象' })
    return issues
  }

  for (const rule of RULES) {
    const val = get(data, rule.path)
    const p = label(rule.path)

    if (rule.required && (val === undefined || val === null || val === '')) {
      issues.push({ path: p, message: `必填字段缺失` })
      continue
    }

    if (val != null && rule.type) {
      const t = Array.isArray(val) ? 'array' : typeof val
      if (t !== rule.type) {
        issues.push({ path: p, message: `应为 ${rule.type}，实际为 ${t}` })
      }
    }
  }

  // Validate array items for educations
  if (Array.isArray(data.educations)) {
    data.educations.forEach((e: any, i: number) => {
      if (!e.school) issues.push({ path: `educations[${i}].school`, message: '必填字段缺失' })
      if (!e.degree) issues.push({ path: `educations[${i}].degree`, message: '必填字段缺失' })
      if (!e.major)  issues.push({ path: `educations[${i}].major`, message: '必填字段缺失' })
    })
  }

  // Validate internships array items
  if (Array.isArray(data.internships)) {
    data.internships.forEach((e: any, i: number) => {
      if (!e.company) issues.push({ path: `internships[${i}].company`, message: '必填字段缺失' })
      if (!e.role)    issues.push({ path: `internships[${i}].role`, message: '必填字段缺失' })
    })
  }

  // Validate projects array items
  if (Array.isArray(data.projects)) {
    data.projects.forEach((e: any, i: number) => {
      if (!e.title) issues.push({ path: `projects[${i}].title`, message: '必填字段缺失' })
    })
  }

  return issues
}

export function formatIssues(issues: Issue[]): string {
  if (issues.length === 0) return ''
  return issues.map((i) => `• ${i.path}: ${i.message}`).join('\n')
}
