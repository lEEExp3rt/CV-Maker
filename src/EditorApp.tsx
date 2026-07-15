import { useState, useCallback, useRef } from 'react'
import { useProjectManager } from './hooks/useProjectManager'
import { useLocalStorage } from './hooks/useLocalStorage'
import { DEFAULT_RESUME_DATA } from './data/defaults'
import { validate, formatIssues } from './utils/validate'
import { wrapEnvelope, parseImport } from './utils/envelope'
import AnonSwitcher from './components/editor/AnonSwitcher'
import JsonEditor, { highlightJson } from './components/editor/JsonEditor'
import { DEFAULT_ANON, type AnonOptions } from './types/anonymize'
import type { ColorScheme, Language } from './types/resume'
import Resume from './Resume'
import Layout from './components/Layout'
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
  const [showExport, setShowExport] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [importText, setImportText] = useState('')
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'warning' | 'error' } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const data = activeProject?.data ?? DEFAULT_RESUME_DATA

  const setData = useCallback(
    (newData: typeof data) => updateActiveData(newData),
    [updateActiveData]
  )

  const jsonString = JSON.stringify(wrapEnvelope(data), null, 2)

  const handleExport = useCallback(() => setShowExport(true), [])
  const handleImport = useCallback(() => {
    setShowImport(true); setImportText('')
  }, [])

  const handleCopyJSON = useCallback(() => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [jsonString])

  const handleDownloadJSON = useCallback(() => {
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeProject?.title || 'resume'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [jsonString, activeProject])

  const showToast = useCallback((msg: string, type: 'success' | 'warning' | 'error' = 'success') => {
    setToast({ msg, type })
    const duration = type === 'warning' ? 5000 : type === 'error' ? 3000 : 2000
    setTimeout(() => setToast(null), duration)
  }, [])

  const doImport = useCallback((raw: string) => {
    let result: { data: any; warning?: string }
    try {
      result = parseImport(raw)
    } catch (e: any) {
      setShowImport(false)
      showToast(e.message, 'error')
      return
    }

    const issues = validate(result.data)
    updateActiveData(result.data)
    setShowImport(false)

    const warnings: string[] = []
    if (issues.length > 0) warnings.push(`${issues.length} 个字段问题：\n${formatIssues(issues)}`)
    // Envelope warnings go last (show at top of toast)
    if (result.warning) warnings.unshift(result.warning)

    if (warnings.length > 0) {
      showToast(`导入成功\n${warnings.join('\n')}`, 'warning')
    } else {
      showToast('导入成功')
    }
  }, [updateActiveData, showToast])

  const handleImportText = useCallback(() => { doImport(importText) }, [importText, doImport])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => { doImport(reader.result as string) }
    reader.readAsText(file)
    e.target.value = ''
  }, [doImport])

  const handleReset = useCallback(() => {
    setShowReset(true)
  }, [])

  const confirmReset = useCallback(() => {
    updateActiveData(DEFAULT_RESUME_DATA)
    setShowReset(false)
  }, [updateActiveData])

  const handlePrint = useCallback(() => {
    const prevTitle = document.title
    document.title = activeProject?.title || 'resume'
    const restore = () => { document.title = prevTitle }
    window.addEventListener('afterprint', restore, { once: true })
    window.print()
  }, [activeProject])

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>('cv-editor-color', 'navy')
  const [language, setLanguage] = useLocalStorage<Language>('cv-editor-lang', 'zh')
  const [panelCollapsed, setPanelCollapsed] = useState(false)
  const [anonEnabled, setAnonEnabled] = useState(false)
  const [anonOpts, setAnonOpts] = useLocalStorage<AnonOptions>('cv-anon', DEFAULT_ANON)
  const settings = { color_scheme: colorScheme, language }

  const handlePanelResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const panel = document.querySelector('.editor-panel') as HTMLElement
    if (!panel) return
    const startX = e.clientX
    const startW = panel.offsetWidth
    const onMove = (ev: MouseEvent) => {
      const w = Math.max(280, Math.min(560, startW + (ev.clientX - startX)))
      panel.style.flex = `0 0 ${w}px`
      panel.style.maxWidth = 'none'
    }
    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [])

  return (
    <Layout>
    <div className="editor-layout">
      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed', top: 56, left: '50%', transform: 'translateX(-50%)',
          zIndex: 2000, padding: '10px 20px', fontSize: 12, fontWeight: 500,
          maxWidth: 500, whiteSpace: 'pre-line', lineHeight: 1.6,
          background: toast.type === 'error' ? '#dc2626' : toast.type === 'warning' ? '#d97706' : '#16a34a',
          color: '#fff', borderRadius: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          animation: 'toastIn 0.25s ease',
        }}>
          {toast.type === 'error' ? '❌' : toast.type === 'warning' ? '⚠️' : '✓'} {toast.msg}
        </div>
      )}

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
      <div className={`editor-panel ${panelCollapsed ? 'editor-panel-collapsed' : ''}`}>
        {/* Collapsed toggle */}
        {panelCollapsed && (
          <button
            className="editor-panel-toggle"
            onClick={() => setPanelCollapsed(false)}
            title="展开编辑面板"
          >
            ☰
          </button>
        )}

        <div className="editor-panel-header">
          <button
            onClick={() => setPanelCollapsed(true)}
            className="editor-panel-collapse-btn"
            title="收起编辑面板"
          >◀</button>
          <h2>{activeProject?.title || 'CV-Maker'}</h2>
          <div className="editor-actions">
            <button onClick={handleExport}>导出 JSON</button>
            <button onClick={handleImport}>导入 JSON</button>
            <button onClick={handleReset}>清空</button>
            <button className="accent" onClick={handlePrint}>打印 PDF</button>
          </div>
        </div>

        {/* Settings bar */}
        <div style={{
          padding: '6px 16px', borderBottom: '1px solid #e2e8f0',
          display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0,
        }}>
          <label style={{ fontSize: 10, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
            配色方案
            <select
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
              style={{
                height: 24, padding: '0 6px', fontSize: 10,
                border: '1px solid #e2e8f0', borderRadius: 4, background: '#fff',
                color: '#475569', fontFamily: 'inherit', cursor: 'pointer',
              }}
            >
              <option value="navy">深蓝</option>
              <option value="slate">石板灰</option>
              <option value="forest">森林绿</option>
              <option value="burgundy">勃艮第红</option>
              <option value="teal">青墨</option>
              <option value="charcoal">炭黑</option>
            </select>
          </label>
          <label style={{ fontSize: 10, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
            语言模式
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              style={{
                height: 24, padding: '0 6px', fontSize: 10,
                border: '1px solid #e2e8f0', borderRadius: 4, background: '#fff',
                color: '#475569', fontFamily: 'inherit', cursor: 'pointer',
              }}
            >
              <option value="zh">中文</option>
              <option value="en">English</option>
            </select>
          </label>
          <AnonSwitcher
            options={anonOpts}
            onChange={setAnonOpts}
            enabled={anonEnabled}
            onToggle={setAnonEnabled}
          />
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

      {/* Panel resize handle */}
      <div
        onMouseDown={handlePanelResize}
        className="editor-panel-resize-h"
        title="拖拽调整宽度"
      />

      {/* Vertical resize handle (small screens) */}
      <div className="editor-panel-resize"
        onMouseDown={(e) => {
          e.preventDefault()
          const panel = (e.target as HTMLElement).previousElementSibling as HTMLElement
          const startY = e.clientY
          const startH = panel.offsetHeight
          const onMove = (ev: MouseEvent) => {
            panel.style.height = Math.max(100, startH + (ev.clientY - startY)) + 'px'
          }
          const onUp = () => {
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseup', onUp)
            document.body.style.cursor = ''
            document.body.style.userSelect = ''
          }
          document.body.style.cursor = 'row-resize'
          document.body.style.userSelect = 'none'
          document.addEventListener('mousemove', onMove)
          document.addEventListener('mouseup', onUp)
        }}
      />

      {/* Right Preview */}
      <div className="editor-preview">
        <Resume data={data} settings={settings} anonEnabled={anonEnabled} anonOpts={anonOpts} />
      </div>

      {/* Export modal */}
      <Modal
        open={showExport}
        title="导出 JSON"
        confirmLabel="下载文件"
        cancelLabel="关闭"
        onConfirm={() => { handleDownloadJSON(); setShowExport(false) }}
        onCancel={() => { setShowExport(false); setCopied(false) }}
      >
        <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleCopyJSON}
            style={{
              padding: '4px 12px', fontSize: 10, border: '1px solid #cbd5e0',
              borderRadius: 4, background: copied ? '#f0fdf4' : '#fff', cursor: 'pointer',
              color: copied ? '#16a34a' : '#64748b', fontFamily: 'inherit',
            }}
          >
            {copied ? '✓ 已复制' : '📋 复制'}
          </button>
        </div>
        <pre
          dangerouslySetInnerHTML={{ __html: highlightJson(jsonString) }}
          style={{
            width: '100%', height: 260, padding: 8, fontSize: 10,
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            border: '1px solid #e2e8f0', borderRadius: 6, background: '#f8fafc',
            color: '#334155', lineHeight: 1.5, whiteSpace: 'pre', overflow: 'auto',
            margin: 0, userSelect: 'all',
          }}
        />
      </Modal>

      {/* Import modal */}
      <Modal
        open={showImport}
        title="导入 JSON"
        confirmLabel="导入"
        cancelLabel="取消"
        onConfirm={handleImportText}
        onCancel={() => setShowImport(false)}
      >
        <JsonEditor
          value={importText}
          onChange={setImportText}
          onKeyDown={(e) => {
            const t = e.target as HTMLTextAreaElement
            if (e.key === 'Tab') {
              e.preventDefault()
              const start = t.selectionStart; const end = t.selectionEnd
              const val = importText
              setImportText(val.slice(0, start) + '  ' + val.slice(end))
              requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = start + 2 })
            }
            if (e.key === '"') {
              e.preventDefault()
              const val = importText
              const pos = t.selectionStart
              // Already on a closing quote → skip over it
              if (val[pos] === '"') {
                t.selectionStart = t.selectionEnd = pos + 1
                return
              }
              // Only auto-pair when cursor is at end, whitespace, or newline follows
              const after = val.slice(pos)
              if (after === '' || after.startsWith('\n') || after.trim() === '') {
                setImportText(val.slice(0, pos) + '""' + val.slice(t.selectionEnd))
                requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = pos + 1 })
              } else {
                setImportText(val.slice(0, pos) + '"' + val.slice(t.selectionEnd))
                requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = pos + 1 })
              }
            }
            if (e.key === 'Enter') {
              e.preventDefault()
              const t = e.target as HTMLTextAreaElement
              const val = importText
              const pos = t.selectionStart
              // Find leading whitespace of current line
              const lineStart = val.lastIndexOf('\n', pos - 1) + 1
              const indent = val.slice(lineStart).match(/^(\s*)/)?.[1] ?? ''
              // Auto-increase indent after { or [
              const prevChar = val[pos - 1]
              const extra = (prevChar === '{' || prevChar === '[') ? '  ' : ''
              const inserted = '\n' + indent + extra
              setImportText(val.slice(0, pos) + inserted + val.slice(t.selectionEnd))
              requestAnimationFrame(() => {
                t.selectionStart = t.selectionEnd = pos + inserted.length
              })
            }
          }}
        />
        <div style={{ marginTop: 8, textAlign: 'center' }}>
          <span style={{ fontSize: 10, color: '#94a3b8' }}>或 </span>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              fontSize: 10, color: '#3b82f6', background: 'none', border: 'none',
              cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit',
            }}
          >
            从文件导入
          </button>
          <input ref={fileInputRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleFileChange} />
        </div>
      </Modal>

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
    </Layout>
  )
}
