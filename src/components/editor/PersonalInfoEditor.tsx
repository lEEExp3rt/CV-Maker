import { useRef } from 'react'
import type { PersonalInfo, CustomLink } from '../../types/resume'
import IconPicker from './IconPicker'

interface Props {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
}

export default function PersonalInfoEditor({ data, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const update = (field: string, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const c = data.contact

  const updateContact = (patch: Partial<typeof c>) => {
    onChange({ ...data, contact: { ...data.contact, ...patch } })
  }

  const updateCustoms = (arr: CustomLink[]) => {
    updateContact({ customs: arr })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      update('photo', reader.result as string)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div className="editor-form-section">
      <h3>{'基本信息'}</h3>
      <div className="editor-row">
        <div className="editor-field">
          <label>{'姓名'} *</label>
          <input value={data.name} onChange={(e) => update('name', e.target.value)} placeholder={'张三'} />
        </div>
        <div className="editor-field">
          <label>{'照片'}</label>
          {data.photo ? (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <img src={data.photo} alt="" style={{ width: 22, height: 28, objectFit: 'cover', borderRadius: 4, border: '1px solid #e2e8f0' }} />
              <button type="button" className="card-remove" onClick={() => update('photo', '')}>×</button>
            </div>
          ) : (
            <button className="editor-add-btn" onClick={() => fileInputRef.current?.click()}>{'上传照片'}</button>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
          <div className="hint">{'照片会以base64格式存储在浏览器本地'}</div>
        </div>
      </div>

      <h3>{'联系方式'}</h3>
      <div className="editor-row">
        <div className="editor-field">
          <label>{'邮箱'} *</label>
          <input value={c.email} onChange={(e) => updateContact({ email: e.target.value })} placeholder="zhangsan@zju.edu.cn" />
        </div>
        <div className="editor-field">
          <label>{'电话'} *</label>
          <input value={c.phone} onChange={(e) => updateContact({ phone: e.target.value })} placeholder="+86-138-0000-0000" />
        </div>
      </div>
      <div className="editor-row">
        <div className="editor-field">
          <label>{'个人主页'}</label>
          <input value={c.homepage || ''} onChange={(e) => updateContact({ homepage: e.target.value })} placeholder="https://zhangsan.dev" />
        </div>
        <div className="editor-field">
          <label>GitHub</label>
          <input value={c.github || ''} onChange={(e) => updateContact({ github: e.target.value })} placeholder="https://github.com/zhangsan" />
        </div>
      </div>

      <h3>{'自定义链接'}</h3>
      {(c.customs || []).map((link, i) => (
        <div className="editor-entry-card" key={i}>
          <div className="card-header">
            <span className="card-title">{link.label || `#${i + 1}`}</span>
            <button className="card-remove" onClick={() => updateCustoms((c.customs || []).filter((_, j) => j !== i))}>×</button>
          </div>
          <div className="editor-row">
            <div className="editor-field">
              <label>{'标签'}</label>
              <input value={link.label} onChange={(e) => {
                const arr = [...(c.customs || [])]
                arr[i] = { ...arr[i], label: e.target.value }
                updateCustoms(arr)
              }} placeholder="Blog" />
            </div>
            <div className="editor-field">
              <label>URL / {'文本'}</label>
              <input value={link.url} onChange={(e) => {
                const arr = [...(c.customs || [])]
                arr[i] = { ...arr[i], url: e.target.value }
                updateCustoms(arr)
              }} placeholder="https://... {'或纯文本'}" />
            </div>
          </div>
          <div className="editor-field">
            <label>{'图标'}</label>
            <IconPicker
              value={link.icon || ''}
              onChange={(v) => {
                const arr = [...(c.customs || [])]
                arr[i] = { ...arr[i], icon: v || undefined }
                updateCustoms(arr)
              }}
            />
          </div>
        </div>
      ))}
      <button className="editor-add-btn" onClick={() => updateCustoms([...(c.customs || []), { label: '', url: '' }])}>
        + {'添加链接'}
      </button>
    </div>
  )
}
