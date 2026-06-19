import type { ProjectEntry } from '../types/resume'

interface Props {
  data: ProjectEntry[]
}

export default function Projects({ data }: Props) {
  if (!data || data.length === 0) return null

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">Projects</h2>
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
              {entry.start} – {entry.end}
            </span>
          </div>
          <div className="resume-entry-meta">{entry.role}</div>
          {entry.details && entry.details.length > 0 && (
            <ul className="resume-details">
              {entry.details.map((d, j) => (
                <li key={`proj-detail-${j}`}>{d}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  )
}
