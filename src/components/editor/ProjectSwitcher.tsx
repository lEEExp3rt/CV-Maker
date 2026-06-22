import { useState } from 'react'
import type { Project } from '../../types/project'

interface Props {
  projects: Project[]
  activeId: string
  onSwitch: (id: string) => void
  onCreate: (title: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, title: string) => void
}

export default function ProjectSwitcher({
  projects, activeId, onSwitch, onCreate, onDuplicate, onDelete, onRename,
}: Props) {
  const [showNew, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')

  const handleCreate = () => {
    const title = newTitle.trim() || '未命名简历'
    onCreate(title)
    setNewTitle('')
    setShowNew(false)
  }

  const handleRename = (id: string) => {
    const title = editTitle.trim()
    if (title) {
      onRename(id, title)
    }
    setEditingId(null)
    setEditTitle('')
  }

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
      {/* Project dropdown */}
      <select
        value={activeId}
        onChange={(e) => onSwitch(e.target.value)}
        style={{
          flex: 1, minWidth: 0, padding: '3px 6px', fontSize: 11,
          border: '1px solid #cbd5e0', borderRadius: 4, background: '#fff',
          color: '#1a202c', fontFamily: 'inherit', cursor: 'pointer',
        }}
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>

      {/* Create new */}
      {showNew ? (
        <div style={{ display: 'flex', gap: 2 }}>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="项目名称"
            style={{ width: 80, padding: '2px 4px', fontSize: 10, border: '1px solid #cbd5e0', borderRadius: 3 }}
            autoFocus
          />
          <button onClick={handleCreate} style={btnStyle}>✓</button>
          <button onClick={() => setShowNew(false)} style={btnStyle}>×</button>
        </div>
      ) : (
        <button onClick={() => setShowNew(true)} style={iconBtnStyle} title="新建">+</button>
      )}

      {/* Duplicate */}
      <button
        onClick={() => onDuplicate(activeId)}
        style={iconBtnStyle}
        title="复制当前"
      >
        ⧉
      </button>

      {/* Delete */}
      <button
        onClick={() => {
          if (projects.length <= 1) return
          if (confirm('确定删除该项目？此操作不可撤销。')) {
            onDelete(activeId)
          }
        }}
        style={{ ...iconBtnStyle, opacity: projects.length <= 1 ? 0.3 : 1 }}
        title={projects.length <= 1 ? '至少保留一个项目' : '删除当前'}
        disabled={projects.length <= 1}
      >
        🗑
      </button>

      {/* Rename inline */}
      {editingId ? (
        <div style={{ display: 'flex', gap: 2 }}>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRename(editingId)}
            onBlur={() => handleRename(editingId)}
            style={{ width: 80, padding: '2px 4px', fontSize: 10, border: '1px solid #cbd5e0', borderRadius: 3 }}
            autoFocus
          />
        </div>
      ) : (
        <button
          onClick={() => {
            const p = projects.find((x) => x.id === activeId)
            if (p) { setEditingId(p.id); setEditTitle(p.title) }
          }}
          style={iconBtnStyle}
          title="重命名"
        >
          ✎
        </button>
      )}
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  padding: '2px 6px', fontSize: 10, border: '1px solid #cbd5e0',
  borderRadius: 3, background: '#fff', cursor: 'pointer', color: '#4a5568',
}

const iconBtnStyle: React.CSSProperties = {
  ...btnStyle, padding: '2px 6px', fontSize: 12, lineHeight: '14px',
  flexShrink: 0,
}
