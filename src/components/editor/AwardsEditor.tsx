import type { AwardEntry } from '../../types/resume'

interface Props {
  data: AwardEntry[]
  onChange: (data: AwardEntry[]) => void
}

export default function AwardsEditor({ data, onChange }: Props) {
  const update = (i: number, field: string, value: string) => {
    const arr = [...data]
    arr[i] = { ...arr[i], [field]: value }
    onChange(arr)
  }

  return (
    <div className="editor-form-section">
      {data.map((entry, i) => (
        <div className="editor-entry-card" key={i}>
          <div className="card-header">
            <span className="card-title">获奖 #{i + 1}</span>
            <button className="card-remove" onClick={() => onChange(data.filter((_, j) => j !== i))}>×</button>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>奖项名称 *</label>
              <input value={entry.name} onChange={(e) => update(i, 'name', e.target.value)} placeholder="奖项名称" />
            </div>
            <div className="editor-field">
              <label>日期</label>
              <input value={entry.date} onChange={(e) => update(i, 'date', e.target.value)} placeholder="YYYY" style={{ width: 100 }} />
            </div>
          </div>
        </div>
      ))}
      <button className="editor-add-btn" onClick={() => onChange([...data, { name: '', date: '' }])}>+ 添加获奖</button>
    </div>
  )
}
