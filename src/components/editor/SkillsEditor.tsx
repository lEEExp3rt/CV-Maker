import type { SkillCategory } from '../../types/resume'

interface Props {
  data: SkillCategory[]
  onChange: (data: SkillCategory[]) => void
}

export default function SkillsEditor({ data, onChange }: Props) {
  const update = (i: number, field: string, value: string | string[]) => {
    const arr = [...data]
    arr[i] = { ...arr[i], [field]: value }
    onChange(arr)
  }

  return (
    <div className="editor-form-section">
      {data.map((cat, i) => (
        <div className="editor-entry-card" key={i}>
          <div className="card-header">
            <span className="card-title">{cat.category || '技能分类'}</span>
            <button className="card-remove" onClick={() => onChange(data.filter((_, j) => j !== i))}>×</button>
          </div>
          <div className="editor-field">
            <label>{'分类'}</label>
            <input value={cat.category} onChange={(e) => update(i, 'category', e.target.value)} placeholder={'技能分类'} />
          </div>
          <div className="editor-field">
            <label>{'技能'}</label>
            {(cat.items || []).map((item, j) => (
              <div key={j} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                <input value={item} onChange={(e) => {
                  const arr = [...(cat.items || [])]
                  arr[j] = e.target.value
                  update(i, 'items', arr)
                }} placeholder={`技能 ${j + 1}`} />
                <button className="card-remove" onClick={() => {
                  update(i, 'items', (cat.items || []).filter((_, k) => k !== j))
                }}>×</button>
              </div>
            ))}
            <button className="editor-add-btn" onClick={() => update(i, 'items', [...(cat.items || []), ''])}>
              + {'添加技能'}
            </button>
          </div>
        </div>
      ))}
      <button className="editor-add-btn" onClick={() => onChange([...data, { category: '', items: [] }])}>+ {'添加技能分类'}</button>
    </div>
  )
}
