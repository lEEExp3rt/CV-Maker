import type { ProjectEntry } from '../../types/resume'

interface Props {
  data: ProjectEntry[]
  onChange: (data: ProjectEntry[]) => void
}

function empty(): ProjectEntry {
  return { name: '', start: '', end: '', details: [] }
}

export default function ProjectEditor({ data, onChange }: Props) {
  const update = (i: number, field: string, value: unknown) => {
    const arr = [...data]
    arr[i] = { ...arr[i], [field]: value }
    onChange(arr)
  }

  return (
    <div className="editor-form-section">
      {data.map((entry, i) => (
        <div className="editor-entry-card" key={i}>
          <div className="card-header">
            <span className="card-title">项目经历 #{i + 1}</span>
            <button className="card-remove" onClick={() => onChange(data.filter((_, j) => j !== i))}>×</button>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>项目名 *</label>
              <input value={entry.name} onChange={(e) => update(i, 'name', e.target.value)} placeholder="分布式KV存储引擎" />
            </div>
            <div className="editor-field">
              <label>英文名</label>
              <input value={entry.name_en || ''} onChange={(e) => update(i, 'name_en', e.target.value)} placeholder="Distributed KV Store" />
            </div>
          </div>
          <div className="editor-field">
            <label>项目链接</label>
            <input value={entry.url || ''} onChange={(e) => update(i, 'url', e.target.value)} placeholder="https://github.com/user/repo" />
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>开始 *</label>
              <input value={entry.start} onChange={(e) => update(i, 'start', e.target.value)} placeholder="2023-10" />
            </div>
            <div className="editor-field">
              <label>结束</label>
              <input value={entry.end} onChange={(e) => update(i, 'end', e.target.value)} placeholder="2024-01（留空显示至今）" />
            </div>
          </div>
          <div className="editor-field">
            <label>摘要（支持 Markdown）</label>
            <input value={entry.brief || ''} onChange={(e) => update(i, 'brief', e.target.value)} placeholder="基于**Raft**协议实现..." />
          </div>
          <div className="editor-field">
            <label>详细描述（一行一条，支持 Markdown）</label>
            {(entry.details || []).map((d, j) => (
              <div key={j} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                <input value={d} onChange={(e) => {
                  const arr = [...(entry.details || [])]
                  arr[j] = e.target.value
                  update(i, 'details', arr)
                }} placeholder={`要点 ${j + 1}`} />
                <button className="card-remove" onClick={() => {
                  update(i, 'details', (entry.details || []).filter((_, k) => k !== j))
                }}>×</button>
              </div>
            ))}
            <button className="editor-add-btn" onClick={() => update(i, 'details', [...(entry.details || []), ''])}>+ 添加要点</button>
          </div>
        </div>
      ))}
      <button className="editor-add-btn" onClick={() => onChange([...data, empty()])}>+ 添加项目经历</button>
    </div>
  )
}
