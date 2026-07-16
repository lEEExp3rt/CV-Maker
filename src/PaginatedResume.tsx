import { useMemo } from 'react'
import type { ResumeData, Settings } from './types/resume'
import type { AnonOptions } from './types/anonymize'
import { buildCSSVariables } from './styles/theme'
import { applyAnonymization } from './utils/anonymize'
import { usePagination } from './hooks/usePagination'
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

/**
 * Multi-page resume with Word-style automatic pagination.
 *
 * Renders a hidden measurement pass first, computes page breaks
 * so that no entry is split across pages, then renders visible
 * A4 pages stacked vertically with gaps.
 */
export default function PaginatedResume({ data, settings, anonEnabled, anonOpts }: Props) {
  const cssVars = useMemo(() => buildCSSVariables(settings), [settings])
  const lang = settings.language || 'zh'

  const displayData = useMemo(
    () => (anonEnabled && anonOpts ? applyAnonymization(data, anonOpts) : data),
    [data, anonEnabled, anonOpts],
  )

  const { pageMap, totalPages, measureRef } = usePagination(displayData)

  /** Return only the entries that belong to `pageIndex`. */
  function filterByPage<T>(entries: T[], prefix: string, pageIndex: number): T[] {
    return entries.filter((_, i) => (pageMap.get(`${prefix}-${i}`) ?? 0) === pageIndex)
  }

  function renderSections(pageIdx: number) {
    return (
      <>
        {pageIdx === 0 && <PersonalInfo data={displayData.personal_info} />}
        <Education
          data={filterByPage(displayData.educations, 'edu', pageIdx)}
          lang={lang}
        />
        <Internship
          data={filterByPage(displayData.internships, 'intern', pageIdx)}
          lang={lang}
        />
        <Projects
          data={filterByPage(displayData.projects, 'proj', pageIdx)}
          lang={lang}
        />
        <Skills
          data={filterByPage(displayData.skills || [], 'skill', pageIdx)}
          lang={lang}
        />
        <Awards
          data={filterByPage(displayData.awards || [], 'award', pageIdx)}
          lang={lang}
        />
        {totalPages > 1 && (
          <div className="resume-page-number">{pageIdx + 1} / {totalPages}</div>
        )}
      </>
    )
  }

  return (
    <>
      {/* Hidden measurement layer — renders ALL entries for DOM measurement */}
      <div
        ref={measureRef}
        className="resume-measure"
        style={cssVars as React.CSSProperties}
        aria-hidden="true"
      >
        <PersonalInfo data={displayData.personal_info} />
        <Education data={displayData.educations} lang={lang} />
        <Internship data={displayData.internships} lang={lang} />
        <Projects data={displayData.projects} lang={lang} />
        <Skills data={displayData.skills || []} lang={lang} />
        <Awards data={displayData.awards || []} lang={lang} />
      </div>

      {/* Visible pages */}
      <div className="resume-pages-container">
        {Array.from({ length: totalPages }, (_, pageIdx) => (
          <div
            className="resume-page"
            key={pageIdx}
            style={cssVars as React.CSSProperties}
          >
            {renderSections(pageIdx)}
          </div>
        ))}
      </div>
    </>
  )
}
