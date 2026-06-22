import type { EducationEntry } from '../../types/resume'

interface Props {
  data: EducationEntry[]
  onChange: (data: EducationEntry[]) => void
}

function empty(): EducationEntry {
  return { school: '', degree: '', major: '', start: '', end: '', courses: [] }
}

export default function EducationEditor({ data, onChange }: Props) {
  const update = (i: number, field: string, value: string | string[]) => {
    const arr = [...data]
    arr[i] = { ...arr[i], [field]: value }
    onChange(arr)
  }

  return (
    <div className="editor-form-section">
      {data.map((entry, i) => (
        <div className="editor-entry-card" key={i}>
          <div className="card-header">
            <span className="card-title">{'教育经历 #' + (i + 1)}</span>
            <button className="card-remove" onClick={() => onChange(data.filter((_, j) => j !== i))}>×</button>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>{'学校'} *</label>
              <input value={entry.school} onChange={(e) => update(i, 'school', e.target.value)} placeholder={'浙江大学'} />
            </div>
            <div className="editor-field">
              <label>{'英文名'}</label>
              <input value={entry.school_en || ''} onChange={(e) => update(i, 'school_en', e.target.value)} placeholder="Zhejiang University" />
            </div>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>{'学位'} *</label>
              <input value={entry.degree} onChange={(e) => update(i, 'degree', e.target.value)} placeholder={'本科'} />
            </div>
            <div className="editor-field">
              <label>{'专业'} *</label>
              <input value={entry.major} onChange={(e) => update(i, 'major', e.target.value)} placeholder={'计算机科学与技术'} />
            </div>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>{'开始'} *</label>
              <input value={entry.start} onChange={(e) => update(i, 'start', e.target.value)} placeholder="2022-09" />
            </div>
            <div className="editor-field">
              <label>{'结束'}</label>
              <input value={entry.end} onChange={(e) => update(i, 'end', e.target.value)} placeholder="2026-06（{'留空显示至今'}）" />
            </div>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>GPA</label>
              <input value={entry.gpa || ''} onChange={(e) => update(i, 'gpa', e.target.value)} placeholder="3.9/4.0" />
            </div>
            <div className="editor-field">
              <label>{'排名'}</label>
              <input value={entry.ranking || ''} onChange={(e) => update(i, 'ranking', e.target.value)} placeholder="3/120" />
            </div>
          </div>
          <div className="editor-field">
            <label>{'核心课程'}</label>
            {(entry.courses || []).map((course, j) => (
              <div key={j} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                <input value={course} onChange={(e) => {
                  const arr = [...(entry.courses || [])]
                  arr[j] = e.target.value
                  update(i, 'courses', arr)
                }} placeholder={`${'课程'} ${j + 1}`} />
                <button className="card-remove" onClick={() => {
                  update(i, 'courses', (entry.courses || []).filter((_, k) => k !== j))
                }}>×</button>
              </div>
            ))}
            <button className="editor-add-btn" onClick={() => update(i, 'courses', [...(entry.courses || []), ''])}>
              + {'添加课程'}
            </button>
          </div>
        </div>
      ))}
      <button className="editor-add-btn" onClick={() => onChange([...data, empty()])}>+ {'添加教育经历'}</button>
    </div>
  )
}
