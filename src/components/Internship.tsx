import type { InternshipEntry } from '../types/resume'
import { BriefcaseIcon } from './Icons'
import HeaderLeft from './HeaderLeft'
import MarkdownText from './MarkdownText'

interface Props {
  data: InternshipEntry[]
  lang?: string
}

export default function Internship({ data, lang = 'zh' }: Props) {
  if (!data || data.length === 0) return null

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">
        <BriefcaseIcon /> {lang === 'zh' ? '实习经历 INTERNSHIPS' : 'INTERNSHIPS'}
      </h2>
      {data.map((entry, i) => {
        const meta = [entry.department, entry.role].filter(Boolean).join(' · ')

        return (
          <div className="resume-entry" key={`intern-${i}`}>
            <div className="resume-entry-header">
              <HeaderLeft
                title={
                  <span className="resume-entry-title">
                    {entry.company}
                    {entry.company_en && (
                      <span className="resume-entry-subtitle">{entry.company_en}</span>
                    )}
                  </span>
                }
                meta={<>{meta}</>}
                showMeta={!!meta}
              />
              <span className="resume-entry-date">
                {entry.start} ~ {entry.end || (lang === "zh" ? "至今" : "Present")}
              </span>
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
        )
      })}
    </section>
  )
}
