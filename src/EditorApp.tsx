import { useState, useCallback, useRef } from 'react'
import { useProjectManager } from './hooks/useProjectManager'
import { DEFAULT_RESUME_DATA } from './data/defaults'
import Resume from './Resume'
import ProjectSidebar from './components/editor/ProjectSidebar'
import Modal from './components/editor/Modal'
import PersonalInfoEditor from './components/editor/PersonalInfoEditor'
import EducationEditor from './components/editor/EducationEditor'
import InternshipEditor from './components/editor/InternshipEditor'
import ProjectEditor from './components/editor/ProjectEditor'
import SkillsEditor from './components/editor/SkillsEditor'
import AwardsEditor from './components/editor/AwardsEditor'
import './styles/editor.css'

const TABS: { key: string; label: string }[] = [
  { key: 'personal', label: '个人信息' },
  { key: 'education', label: '教育背景' },
  { key: 'internship', label: '实习经历' },
  { key: 'projects', label: '项目经历' },
  { key: 'skills', label: '专业技能' },
  { key: 'awards', label: '获奖情况' },
]

export default function EditorApp() {
  const {
    projects, activeProject,
    switchProject, createProject, duplicateProject, deleteProject, renameProject,
    updateActiveData,
  } = useProjectManager()

  const [activeTab, setActiveTab] = useState('personal')
  const [showReset, setShowReset] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const data = activeProject?.data ?? DEFAULT_RESUME_DATA

  const setData = useCallback(
    (newData: typeof data) => updateActiveData(newData),
    [updateActiveData]
  )

  const handleExport = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeProject?.title || 'resume'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [data, activeProject])

  const handleImport = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string)
        updateActiveData(parsed)
      } catch { alert('Invalid JSON file') }
    }
    reader.readAsText(file)
    e.target.value = ''
  }, [updateActiveData])

  const handleReset = useCallback(() => {
    setShowReset(true)
  }, [])

  const confirmReset = useCallback(() => {
    updateActiveData(DEFAULT_RESUME_DATA)
    setShowReset(false)
  }, [updateActiveData])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const settings = { color_scheme: 'navy' as const, language: 'zh' as const }

  return (
    <div className="editor-layout">
      {/* Project Sidebar */}
      <ProjectSidebar
        projects={projects}
        activeId={activeProject?.id ?? ''}
        onSwitch={switchProject}
        onCreate={createProject}
        onDuplicate={duplicateProject}
        onDelete={deleteProject}
        onRename={renameProject}
      />

      {/* Left Editor Panel */}
      <div className="editor-panel">
        <div className="editor-panel-header">
          <h2>{activeProject?.title || 'CV-Maker'}</h2>
          <div className="editor-actions">
            <button onClick={handleExport}>导出 JSON</button>
            <button onClick={handleImport}>导入 JSON</button>
            <input ref={fileInputRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleFileChange} />
            <button onClick={handleReset}>清空</button>
            <button className="accent" onClick={handlePrint}>打印 PDF</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="editor-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`editor-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="editor-form">
          {activeTab === 'personal' && (
            <PersonalInfoEditor data={data.personal_info} onChange={(v) => setData({ ...data, personal_info: v })} />
          )}
          {activeTab === 'education' && (
            <EducationEditor data={data.educations} onChange={(v) => setData({ ...data, educations: v })} />
          )}
          {activeTab === 'internship' && (
            <InternshipEditor data={data.internships} onChange={(v) => setData({ ...data, internships: v })} />
          )}
          {activeTab === 'projects' && (
            <ProjectEditor data={data.projects} onChange={(v) => setData({ ...data, projects: v })} />
          )}
          {activeTab === 'skills' && (
            <SkillsEditor data={data.skills || []} onChange={(v) => setData({ ...data, skills: v })} />
          )}
          {activeTab === 'awards' && (
            <AwardsEditor data={data.awards || []} onChange={(v) => setData({ ...data, awards: v })} />
          )}
        </div>
      </div>

      {/* Right Preview */}
      <div className="editor-preview">
        <Resume data={data} settings={settings} />
      </div>

      {/* Reset confirmation modal */}
      <Modal
        open={showReset}
        title="清空项目"
        confirmLabel="清空"
        danger
        onConfirm={confirmReset}
        onCancel={() => setShowReset(false)}
      >
        确定要清空「{activeProject?.title}」的所有数据吗？此操作不可撤销。
      </Modal>
    </div>
  )
}
