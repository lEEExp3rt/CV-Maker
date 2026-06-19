import type { AwardEntry } from '../types/resume'
import { AwardIcon, TrophyIcon } from './Icons'

interface Props {
  data: AwardEntry[]
}

export default function Awards({ data }: Props) {
  if (!data || data.length === 0) return null

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">
        <AwardIcon /> 获奖情况 AWARDS
      </h2>
      <ul className="resume-awards-list">
        {data.map((award, i) => (
          <li key={`award-${i}`}>
            <span className="resume-awards-item">
              <TrophyIcon />
              <span>{award.name}</span>
            </span>
            <span className="award-date">{award.date}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
