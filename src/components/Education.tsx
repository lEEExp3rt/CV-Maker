import type { EducationEntry } from '../types/resume'
import { GraduationCapIcon } from './Icons'

interface Props {
  data: EducationEntry[]
}

export default function Education({ data }: Props) {
  if (!data || data.length === 0) return null

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">
        <GraduationCapIcon /> 教育背景 EDUCATION
      </h2>
      {data.map((entry, i) => (
        <div className="resume-entry" key={`edu-${i}`}>
          <div className="resume-entry-header">
            <span>
              <span className="resume-entry-title">
                {entry.school}
                {entry.school_en && (
                  <span className="resume-entry-subtitle">{entry.school_en}</span>
                )}
              </span>
            </span>
            <span className="resume-entry-date">
              {entry.start} ~ {entry.end || "至今"}
            </span>
          </div>
          <div className="resume-entry-meta">
            {entry.degree} · {entry.major}
            {entry.gpa && ` · GPA ${entry.gpa}`}
            {entry.ranking && ` · Rank ${entry.ranking}`}
          </div>
          {entry.courses && entry.courses.length > 0 && (
            <div className="resume-courses">
              Core Courses: {entry.courses.join(', ')}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
