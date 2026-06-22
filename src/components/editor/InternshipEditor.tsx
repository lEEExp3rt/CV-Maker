import type { InternshipEntry } from '../../types/resume'

interface Props {
  data: InternshipEntry[]
  onChange: (data: InternshipEntry[]) => void
}

function empty(): InternshipEntry {
  return { company: '', role: '', start: '', end: '', details: [] }
}

export default function InternshipEditor({ data, onChange }: Props) {
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
            <span className="card-title">实习经历 #{i + 1}</span>
            <button className="card-remove" onClick={() => onChange(data.filter((_, j) => j !== i))}>×</button>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>公司 *</label>
              <input value={entry.company} onChange={(e) => update(i, 'company', e.target.value)} placeholder="阿里巴巴" />
            </div>
            <div className="editor-field">
              <label>英文名</label>
              <input value={entry.company_en || ''} onChange={(e) => update(i, 'company_en', e.target.value)} placeholder="Alibaba Group" />
            </div>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>部门</label>
              <input value={entry.department || ''} onChange={(e) => update(i, 'department', e.target.value)} placeholder="淘宝技术部" />
            </div>
            <div className="editor-field">
              <label>岗位 *</label>
              <input value={entry.role} onChange={(e) => update(i, 'role', e.target.value)} placeholder="后端开发实习生" />
            </div>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>开始 *</label>
              <input value={entry.start} onChange={(e) => update(i, 'start', e.target.value)} placeholder="2025-06" />
            </div>
            <div className="editor-field">
              <label>结束</label>
              <input value={entry.end} onChange={(e) => update(i, 'end', e.target.value)} placeholder="2025-09（留空显示至今）" />
            </div>
          </div>
          <div className="editor-field">
            <label>摘要（支持 Markdown）</label>
            <input value={entry.brief || ''} onChange={(e) => update(i, 'brief', e.target.value)} placeholder="参与**核心系统**研发..." />
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
      <button className="editor-add-btn" onClick={() => onChange([...data, empty()])}>+ 添加实习经历</button>
    </div>
  )
}
