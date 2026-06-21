import { useMemo } from 'react'
import type { ResumeData, Settings } from './types/resume'
import { buildCSSVariables } from './styles/theme'
import PersonalInfo from './components/PersonalInfo'
import Education from './components/Education'
import Internship from './components/Internship'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Awards from './components/Awards'

interface Props {
  data: ResumeData
  settings: Settings
  isPrintMode?: boolean
}

export default function Resume({ data, settings, isPrintMode }: Props) {
  const cssVars = useMemo(() => buildCSSVariables(settings), [settings])
  const lang = settings.language || 'zh'

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      {!isPrintMode && (
        <div className="resume-toolbar">
          <button className="primary" onClick={handlePrint}>
            Print to PDF
          </button>
        </div>
      )}

      <div className="resume-page" style={cssVars as React.CSSProperties}>
        <PersonalInfo data={data.personal_info} />
        <Education data={data.educations} lang={lang} />
        <Internship data={data.internships} lang={lang} />
        <Projects data={data.projects} lang={lang} />
        <Skills data={data.skills || []} lang={lang} />
        <Awards data={data.awards || []} lang={lang} />
      </div>
    </>
  )
}
