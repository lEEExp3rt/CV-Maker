import type { AwardEntry } from '../types/resume'

interface Props {
  data: AwardEntry[]
}

export default function Awards({ data }: Props) {
  if (!data || data.length === 0) return null

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">Awards & Honors</h2>
      <ul className="resume-awards-list">
        {data.map((award, i) => (
          <li key={`award-${i}`}>
            <span>{award.name}</span>
            <span className="award-date">{award.date}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
