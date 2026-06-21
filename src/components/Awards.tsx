import type { AwardEntry } from '../types/resume'
import { AwardIcon, TrophyIcon } from './Icons'

interface Props {
  data: AwardEntry[]
  lang?: string
}

export default function Awards({ data, lang = 'zh' }: Props) {
  if (!data || data.length === 0) return null

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">
        <TrophyIcon /> {lang === 'zh' ? '获奖情况 AWARDS' : 'AWARDS'}
      </h2>
      <ul className="resume-awards-list">
        {data.map((award, i) => (
          <li key={`award-${i}`}>
            <span className="resume-awards-item">
              <AwardIcon size={10} />
              <span>{award.name}</span>
            </span>
            <span className="award-date">{award.date}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
