import type { InternshipEntry } from '../types/resume'
import { BriefcaseIcon } from './Icons'
import MarkdownText from './MarkdownText'

interface Props {
  data: InternshipEntry[]
}

export default function Internship({ data }: Props) {
  if (!data || data.length === 0) return null

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">
        <BriefcaseIcon /> 实习经历 INTERNSHIPS
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
              {entry.start} ~ {entry.end || "至今"}
            </span>
          </div>
          <div className="resume-entry-meta">
            {[entry.department, entry.role].filter(Boolean).join(' · ')}
          </div>
          {entry.brief && (
            <div className="resume-entry-brief"><MarkdownText text={entry.brief} /></div>
          )}
          {entry.details && entry.details.length > 0 && (
            <ul className="resume-details">
              {entry.details.map((d, j) => (
                <li key={`intern-detail-${j}`}><MarkdownText text={d} /></li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  )
}
