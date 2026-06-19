import type { ProjectEntry } from '../types/resume'
import { CodeIcon, LinkIcon } from './Icons'
import HeaderLeft from './HeaderLeft'
import MarkdownText from './MarkdownText'

interface Props {
  data: ProjectEntry[]
}

export default function Projects({ data }: Props) {
  if (!data || data.length === 0) return null

  const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">
        <CodeIcon /> 项目经历 PROJECTS
      </h2>
      {data.map((entry, i) => (
        <div className="resume-entry" key={`proj-${i}`}>
          <div className="resume-entry-header">
            <HeaderLeft
              title={
                <span className="resume-entry-title">
                  {entry.name}
                  {entry.name_en && (
                    <span className="resume-entry-subtitle">{entry.name_en}</span>
                  )}
                </span>
              }
              meta={
                entry.url ? (
                  <>
                    <LinkIcon size={10} />
                    <a href={entry.url} target="_blank" rel="noopener noreferrer">
                      {displayUrl(entry.url)}
                    </a>
                  </>
                ) : null
              }
              showMeta={!!entry.url}
            />
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
