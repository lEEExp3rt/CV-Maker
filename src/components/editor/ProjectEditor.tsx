import type { ProjectEntry } from '../../types/resume'
import AutoTextarea from './AutoTextarea'

interface Props {
  data: ProjectEntry[]
  onChange: (data: ProjectEntry[]) => void
}

function empty(): ProjectEntry {
  return { title: '', start: '', end: '', details: [] }
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
              <label>项目标题 *</label>
              <input value={entry.title} onChange={(e) => update(i, 'title', e.target.value)} placeholder="项目标题" />
            </div>
            <div className="editor-field">
              <label>项目副标题</label>
              <input value={entry.subtitle || ''} onChange={(e) => update(i, 'subtitle', e.target.value)} placeholder="项目副标题" />
            </div>
          </div>
          <div className="editor-field">
            <label>项目链接</label>
            <input value={entry.url || ''} onChange={(e) => update(i, 'url', e.target.value)} placeholder="项目链接" />
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>开始时间 *</label>
              <input value={entry.start} onChange={(e) => update(i, 'start', e.target.value)} placeholder="YYYY-MM" />
            </div>
            <div className="editor-field">
              <label>结束时间</label>
              <input value={entry.end} onChange={(e) => update(i, 'end', e.target.value)} placeholder="YYYY-MM（留空显示至今）" />
            </div>
          </div>
          <div className="editor-field">
            <label>摘要</label>
            <AutoTextarea
              value={entry.brief || ''}
              onChange={(e) => update(i, 'brief', e.target.value)}
              onInput={(e) => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px' }}
              placeholder="支持**加粗**、*斜体*、`代码`、_下划线_ ..."
              rows={1}
            />
          </div>
          <div className="editor-field">
            <label>详细描述</label>
            {(entry.details || []).map((d, j) => (
              <div key={j} style={{ display: 'flex', gap: 4, marginBottom: 4, alignItems: 'flex-start' }}>
                <AutoTextarea
                  value={d}
                  onChange={(e) => {
                    const arr = [...(entry.details || [])]
                    arr[j] = e.target.value
                    update(i, 'details', arr)
                  }}
                  onInput={(e) => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px' }}
                  placeholder={`要点 ${j + 1}`}
                  rows={1}
                  style={{ flex: 1 }}
                />
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
