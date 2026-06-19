import type { SkillCategory } from '../types/resume'
import { CpuIcon } from './Icons'

interface Props {
  data: SkillCategory[]
}

export default function Skills({ data }: Props) {
  if (!data || data.length === 0) return null

  return (
    <section className="resume-section">
      <h2 className="resume-section-title">
        <CpuIcon /> 专业技能 SKILLS
      </h2>
      <div className="resume-skills-list">
        {data.map((cat, i) => (
          <div className="resume-skill-category" key={`skill-${i}`}>
            <span className="category-label">{cat.category}:</span>
            <span>{cat.items.join(', ')}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
