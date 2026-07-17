import type { InternshipEntry } from '../../types/resume'
import AutoTextarea from './AutoTextarea'
import DraggableList from './DraggableList'

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
      <DraggableList items={data} onChange={onChange}>
        {(entry, i, handle) => (
        <div className="editor-entry-card" key={i}>
          <div className="card-header">
            {handle}
            <span className="card-title">实习经历 #{i + 1}</span>
            <button className="card-remove" onClick={() => onChange(data.filter((_, j) => j !== i))}>×</button>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>单位*</label>
              <input value={entry.company} onChange={(e) => update(i, 'company', e.target.value)} placeholder="单位名称" />
            </div>
            <div className="editor-field">
              <label>单位</label>
              <input value={entry.company_subtitle || ''} onChange={(e) => update(i, 'company_subtitle', e.target.value)} placeholder="单位英文名/副标题/子公司/其它" />
            </div>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>部门</label>
              <input value={entry.department || ''} onChange={(e) => update(i, 'department', e.target.value)} placeholder="部门" />
            </div>
            <div className="editor-field">
              <label>岗位 *</label>
              <input value={entry.role} onChange={(e) => update(i, 'role', e.target.value)} placeholder="岗位名称" />
            </div>
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
              placeholder="支持**加粗**、*斜体*、`代码`、_下划线_ ..."
              rows={1}
            />
          </div>
          <div className="editor-field">
            <label>详细描述</label>
            <DraggableList items={entry.details || []} onChange={(arr) => update(i, 'details', arr)}>
              {(d, j, handle2) => (
              <div key={j} data-drag-row style={{ display: 'flex', gap: 4, marginBottom: 4, alignItems: 'center' }}>
                {handle2}
                <AutoTextarea
                  value={d}
                  onChange={(e) => {
                    const arr = [...(entry.details || [])]
                    arr[j] = e.target.value
                    update(i, 'details', arr)
                  }}
                  placeholder={`要点 ${j + 1}`}
                  rows={1}
                  style={{ flex: 1 }}
                />
                <button className="card-remove" onClick={() => {
                  update(i, 'details', (entry.details || []).filter((_, k) => k !== j))
                }}>×</button>
              </div>
              )}
            </DraggableList>
            <button className="editor-add-btn" onClick={() => update(i, 'details', [...(entry.details || []), ''])}>+ 添加要点</button>
          </div>
        </div>
        )}
      </DraggableList>
      <button className="editor-add-btn" onClick={() => onChange([...data, empty()])}>+ 添加实习经历</button>
    </div>
  )
}
