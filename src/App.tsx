import { useState, useCallback } from 'react'
import type { ResumeData, Settings } from './types/resume'
import { loadResumeData, loadSettings } from './utils/loadContent'
import Resume from './Resume'

// Check if we're in print/export mode
const urlParams = new URLSearchParams(window.location.search)
const isPrintMode = urlParams.get('print') === 'true'

export default function App() {
  const [data, setData] = useState<ResumeData>(() => loadResumeData())
  const [settings, setSettings] = useState<Settings>(() => loadSettings())

  const refresh = useCallback(() => {
    setData(loadResumeData())
    setSettings(loadSettings())
  }, [])

  // Setup HMR for the virtual YAML module
  if (import.meta.hot) {
    import.meta.hot.accept('virtual:cv-data', () => {
      refresh()
    })
  }

  return <Resume data={data} settings={settings} isPrintMode={isPrintMode} />
}
