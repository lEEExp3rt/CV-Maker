import type { InternshipEntry } from '../types/resume'
import { BriefcaseIcon } from './Icons'

interface Props {
  data: InternshipEntry[]
}

export default function Internship({ data }: Props) {
  if (!data || data.length === 0) return null

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">
        <BriefcaseIcon /> 实习经历 INTERNSHIP EXPERIENCE
      </h2>
      {data.map((entry, i) => (
        <div className="resume-entry" key={`intern-${i}`}>
          <div className="resume-entry-header">
            <span>
              <span className="resume-entry-title">
                {entry.company}
                {entry.company_en && (
                  <span className="resume-entry-subtitle">{entry.company_en}</span>
                )}
              </span>
            </span>
            <span className="resume-entry-date">
              {entry.start} – {entry.end}
            </span>
          </div>
          <div className="resume-entry-meta">{entry.role}</div>
          {entry.details && entry.details.length > 0 && (
            <ul className="resume-details">
              {entry.details.map((d, j) => (
                <li key={`intern-detail-${j}`}>{d}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  )
}
