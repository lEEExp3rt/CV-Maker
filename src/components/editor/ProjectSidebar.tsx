import { useState, useRef, useCallback, useEffect } from 'react'
import type { Project } from '../../types/project'
import Modal from './Modal'

interface Props {
  projects: Project[]
  activeId: string
  onSwitch: (id: string) => void
  onCreate: (title: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, title: string) => void
}

export default function ProjectSidebar({
  projects, activeId, onSwitch, onCreate, onDuplicate, onDelete, onRename,
}: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const [width, setWidth] = useState(220)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const resizing = useRef(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleRename = (id: string) => {
    const t = editTitle.trim()
    if (t) onRename(id, t)
    setEditingId(null)
    setEditTitle('')
  }

  const handleCreate = () => {
    const t = newTitle.trim() || '未命名简历'
    onCreate(t)
    setNewTitle('')
    setShowNew(false)
  }

  // Resize logic
  const startResize = useCallback(() => {
    resizing.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!resizing.current) return
      const w = Math.max(160, Math.min(400, e.clientX))
      setWidth(w)
    }
    const onUp = () => {
      resizing.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const activeProject = projects.find((p) => p.id === activeId)

  return (
    <>
      <div
        ref={sidebarRef}
        className={`project-sidebar ${collapsed ? 'collapsed' : ''}`}
        style={{ width: collapsed ? undefined : width }}
      >
      {/* Collapsed toggle */}
      {collapsed && (
        <button
          className="sidebar-toggle sidebar-collapsed-toggle"
          onClick={() => setCollapsed(false)}
          title="展开项目列表"
          style={{ width: '100%', height: 36, border: 'none', background: 'none',
            cursor: 'pointer', fontSize: 14, color: '#64748b',
            alignItems: 'center', justifyContent: 'center' }}
        >
          ☰
        </button>
      )}

      <div className="sidebar-header">
        <span className="sidebar-title">简历项目</span>
        <button className="sidebar-toggle" onClick={() => setCollapsed(true)} title="收起">◀</button>
      </div>

            <div className="sidebar-body">
              {/* Project list */}
              {projects.map((p) => (
                <div
                  key={p.id}
                  className={`sidebar-project ${p.id === activeId ? 'active' : ''}`}
                  onClick={() => onSwitch(p.id)}
                >
                  <div className="sidebar-project-info">
                    {editingId === p.id ? (
                      <input
                        className="sidebar-rename-input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRename(p.id)
                          if (e.key === 'Escape') { setEditingId(null); setEditTitle('') }
                        }}
                        onBlur={() => handleRename(p.id)}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                      />
                    ) : (
                      <span className="sidebar-project-name">{p.title}</span>
                    )}
                    <span className="sidebar-project-time">
                      {new Date(p.updatedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="sidebar-project-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="sidebar-action-btn"
                      onClick={() => { setEditingId(p.id); setEditTitle(p.title) }}
                      title="重命名"
                    >✎</button>
                    <button
                      className="sidebar-action-btn"
                      onClick={() => onDuplicate(p.id)}
                      title="复制"
                    >⧉</button>
                    {projects.length > 1 && (
                      <button
                        className="sidebar-action-btn sidebar-action-delete"
                        onClick={() => { setDeleteTarget(p.id) }}
                        title="删除"
                      >×</button>
                    )}
                  </div>
                </div>
              ))}

              {/* New project input */}
              {showNew ? (
                <div className="sidebar-new-form">
                  <input
                    className="sidebar-rename-input"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreate()
                      if (e.key === 'Escape') { setShowNew(false); setNewTitle('') }
                    }}
                    placeholder="项目名称"
                    autoFocus
                  />
                  <button className="sidebar-action-btn" onClick={handleCreate}>✓</button>
                  <button className="sidebar-action-btn" onClick={() => { setShowNew(false); setNewTitle('') }}>×</button>
                </div>
              ) : (
                <button className="sidebar-add-btn" onClick={() => setShowNew(true)}>
                  + 新建项目
                </button>
              )}
            </div>

        {/* Resize handle */}
        <div className="sidebar-resize-handle" onMouseDown={startResize} />
        </div>

      {/* Delete confirmation modal */}
      <Modal
        open={!!deleteTarget}
        title="删除项目"
        confirmLabel="删除"
        danger
        onConfirm={() => {
          if (deleteTarget) { onDelete(deleteTarget); setDeleteTarget(null) }
        }}
        onCancel={() => setDeleteTarget(null)}
      >
        确定要删除「{projects.find((p) => p.id === deleteTarget)?.title}」吗？此操作不可撤销。
      </Modal>
    </>
  )
}
