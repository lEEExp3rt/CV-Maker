import type { EducationEntry } from '../../types/resume'
import DraggableList from './DraggableList'

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
      <DraggableList items={data} onChange={onChange}>
        {(entry, i, handle) => (
        <div className="editor-entry-card" key={i}>
          <div className="card-header">
            {handle}
            <span className="card-title">{'教育经历 #' + (i + 1)}</span>
            <button className="card-remove" onClick={() => onChange(data.filter((_, j) => j !== i))}>×</button>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>{'院校'} *</label>
              <input value={entry.school} onChange={(e) => update(i, 'school', e.target.value)} placeholder={'院校名称'} />
            </div>
            <div className="editor-field">
              <label>{'院校'}</label>
              <input value={entry.school_subtitle || ''} onChange={(e) => update(i, 'school_subtitle', e.target.value)} placeholder="院校英文名/副标题/学院名/其它" />
            </div>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>{'学位'} *</label>
              <input value={entry.degree} onChange={(e) => update(i, 'degree', e.target.value)} placeholder='学位名称' />
            </div>
            <div className="editor-field">
              <label>{'专业'} *</label>
              <input value={entry.major} onChange={(e) => update(i, 'major', e.target.value)} placeholder={'专业名称'} />
            </div>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>{'开始时间'} *</label>
              <input value={entry.start} onChange={(e) => update(i, 'start', e.target.value)} placeholder="YYYY-MM" />
            </div>
            <div className="editor-field">
              <label>{'结束时间'}</label>
              <input value={entry.end} onChange={(e) => update(i, 'end', e.target.value)} placeholder="YYYY-MM（留空显示至今）" />
            </div>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>GPA</label>
              <input value={entry.gpa || ''} onChange={(e) => update(i, 'gpa', e.target.value)} placeholder="X/Y" />
            </div>
            <div className="editor-field">
              <label>{'排名'}</label>
              <input value={entry.ranking || ''} onChange={(e) => update(i, 'ranking', e.target.value)} placeholder="X/Y or X%" />
            </div>
          </div>
          <div className="editor-field">
            <label>{'核心课程'}</label>
            <DraggableList items={entry.courses || []} onChange={(arr) => update(i, 'courses', arr)}>
              {(course, j, handle2) => (
              <div key={j} data-drag-row style={{ display: 'flex', gap: 4, marginBottom: 4, alignItems: 'center' }}>
                {handle2}
                <input value={course} onChange={(e) => {
                  const arr = [...(entry.courses || [])]
                  arr[j] = e.target.value
                  update(i, 'courses', arr)
                }} placeholder={`${'课程'} ${j + 1}`} />
                <button className="card-remove" onClick={() => {
                  update(i, 'courses', (entry.courses || []).filter((_, k) => k !== j))
                }}>×</button>
              </div>
              )}
            </DraggableList>
            <button className="editor-add-btn" onClick={() => update(i, 'courses', [...(entry.courses || []), ''])}>
              + {'添加课程'}
            </button>
          </div>
        </div>
        )}
      </DraggableList>
      <button className="editor-add-btn" onClick={() => onChange([...data, empty()])}>+ {'添加教育经历'}</button>
    </div>
  )
}
