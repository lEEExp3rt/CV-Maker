import { useMemo } from 'react'
import type { ResumeData, Settings } from './types/resume'
import type { AnonOptions } from './types/anonymize'
import { buildCSSVariables } from './styles/theme'
import { applyAnonymization } from './utils/anonymize'
import PersonalInfo from './components/PersonalInfo'
import Education from './components/Education'
import Internship from './components/Internship'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Awards from './components/Awards'

interface Props {
  data: ResumeData
  settings: Settings
  anonEnabled?: boolean
  anonOpts?: AnonOptions
}

export default function Resume({ data, settings, anonEnabled, anonOpts }: Props) {
  const cssVars = useMemo(() => buildCSSVariables(settings), [settings])
  const lang = settings.language || 'zh'

  const displayData = useMemo(
    () => (anonEnabled && anonOpts ? applyAnonymization(data, anonOpts) : data),
    [data, anonEnabled, anonOpts]
  )

  return (
    <div className="resume-page" style={cssVars as React.CSSProperties}>
      <PersonalInfo data={displayData.personal_info} />
      <Education data={displayData.educations} lang={lang} />
      <Internship data={displayData.internships} lang={lang} />
      <Projects data={displayData.projects} lang={lang} />
      <Skills data={displayData.skills || []} lang={lang} />
      <Awards data={displayData.awards || []} lang={lang} />
    </div>
  )
}
