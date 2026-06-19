import type { ProjectEntry } from '../types/resume'
import { CodeIcon } from './Icons'
import MarkdownText from './MarkdownText'

interface Props {
  data: ProjectEntry[]
}

export default function Projects({ data }: Props) {
  if (!data || data.length === 0) return null

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">
        <CodeIcon /> 项目经历 PROJECTS
      </h2>
      {data.map((entry, i) => (
        <div className="resume-entry" key={`proj-${i}`}>
          <div className="resume-entry-header">
            <span>
              <span className="resume-entry-title">
                {entry.name}
                {entry.name_en && (
                  <span className="resume-entry-subtitle">{entry.name_en}</span>
                )}
              </span>
            </span>
            <span className="resume-entry-date">
              {entry.start} ~ {entry.end || "至今"}
            </span>
          </div>
          {entry.brief && (
            <div className="resume-entry-brief"><MarkdownText text={entry.brief} /></div>
          )}
          {entry.details && entry.details.length > 0 && (
            <ul className="resume-details">
              {entry.details.map((d, j) => (
                <li key={`proj-detail-${j}`}><MarkdownText text={d} /></li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  )
}
