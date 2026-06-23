import { useRef } from 'react'
import type { PersonalInfo, CustomLink, SocialLink } from '../../types/resume'
import { BUILTIN_ICONS } from '../Icons'
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
    <>
      <div className="editor-form-section">
      <h3>{'基本信息'}</h3>
      <div className="editor-row">
        <div className="editor-field">
          <label>{'姓名'} *</label>
          <input value={data.name} onChange={(e) => update('name', e.target.value)} placeholder={'请输入姓名'} />
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

    </div>

    <div className="editor-form-section">
      <h3>{'联系方式'}</h3>
      <div className="editor-row">
        <div className="editor-field">
          <label>{'邮箱'} *</label>
          <input value={c.email} onChange={(e) => updateContact({ email: e.target.value })} placeholder="email@example.com" />
        </div>
        <div className="editor-field">
          <label>{'电话'} *</label>
          <input value={c.phone} onChange={(e) => updateContact({ phone: e.target.value })} placeholder="+86-138-0000-0000" />
        </div>
      </div>
    </div>

    <div className="editor-form-section">
      <h3>{'社交媒体'}</h3>
      {(c.socials || []).map((s, i) => {
        const iconDef = BUILTIN_ICONS.find((ic) => ic.key === s.icon)
        const updateSocials = (arr: SocialLink[]) => updateContact({ socials: arr })
        return (
          <div className="editor-entry-card" key={`social-${i}`}>
            <div className="card-header">
              <span className="card-title">{iconDef?.label || s.icon}</span>
              <button className="card-remove" onClick={() => updateSocials((c.socials || []).filter((_, j) => j !== i))}>×</button>
            </div>
            <div className="editor-row">
              <div className="editor-field">
                <label>{'类型'}</label>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {BUILTIN_ICONS.filter((ic) => ['global-line','github-line','wechat-line','qq-line','zhihu-line','bilibili-line','tiktok-line','weibo-line','twitter-x-line','instagram-line','linkedin-line','reddit-line','discord-line','telegram-line','rss-line','gitee-line','stack-overflow-line'].includes(ic.key)).map((ic) => (
                    <button key={ic.key} type="button" onClick={() => {
                      const arr = [...(c.socials || [])]
                      arr[i] = { ...arr[i], icon: ic.key, label: arr[i].label || ic.label }
                      updateSocials(arr)
                    }}
                      style={{
                        height: 28, padding: '0 10px', fontSize: 10, lineHeight: '28px',
                        borderRadius: 6, border: '1px solid', cursor: 'pointer',
                        fontFamily: 'inherit',
                        borderColor: s.icon === ic.key ? '#3b82f6' : '#cbd5e0',
                        background: s.icon === ic.key ? '#eff6ff' : '#fff',
                        color: s.icon === ic.key ? '#2563eb' : '#64748b',
                      }}
                    >{ic.label}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="editor-field">
              <label>URL / {'文本'}</label>
              <input value={s.url} onChange={(e) => {
                const arr = [...(c.socials || [])]
                arr[i] = { ...arr[i], url: e.target.value, label: arr[i].label || iconDef?.label || s.icon }
                updateSocials(arr)
              }} placeholder="https://... {'或纯文本'}" />
            </div>
          </div>
        )
      })}
      <button className="editor-add-btn" onClick={() => {
        const arr = [...(c.socials || []), { icon: 'link', url: '', label: '' }]
        updateContact({ socials: arr } as any)
      }}>+ {'添加社交媒体'}</button>
    </div>

    <div className="editor-form-section">
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
              }} placeholder="标签名称" />
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
    </>
  )
}
