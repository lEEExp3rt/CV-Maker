import { useState, useRef } from 'react'

const BUILTIN: { value: string; label: string }[] = [
  { value: '', label: '默认' },
  { value: 'icons/mail.svg', label: '邮箱' },
  { value: 'icons/phone.svg', label: '电话' },
  { value: 'icons/globe.svg', label: '网站' },
  { value: 'icons/github.svg', label: 'GitHub' },
]

const btnBase: React.CSSProperties = {
  height: 28, padding: '0 10px', fontSize: 10, lineHeight: '28px',
  borderRadius: 6, border: '1px solid #cbd5e0', background: '#fff',
  cursor: 'pointer', fontFamily: 'inherit',
}

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function IconPicker({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const isBuiltin = BUILTIN.find((b) => b.value === value)
  const [customOpen, setCustomOpen] = useState(!!value && !isBuiltin)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
    setCustomOpen(true)
    e.target.value = ''
  }

  const showPreview = value && !isBuiltin

  return (
    <div>
      {customOpen ? (
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 6 }}>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... 或本地路径"
            style={{ flex: 1, height: 28, padding: '0 8px', fontSize: 10, border: '1px solid #cbd5e0', borderRadius: 6, fontFamily: 'inherit' }}
          />
          <button type="button" className="card-remove"
            onClick={() => { onChange(''); setCustomOpen(false) }}>×</button>
        </div>
      ) : showPreview ? (
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 6 }}>
          <img src={value} alt="" style={{ width: 20, height: 20, objectFit: 'contain', borderRadius: 2, border: '1px solid #e2e8f0' }} />
          <span style={{ fontSize: 10, color: '#64748b', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {value.startsWith('data:') ? '已上传' : value}
          </span>
          <button type="button" className="card-remove"
            onClick={() => { onChange(''); setCustomOpen(false) }}>×</button>
        </div>
      ) : null}

      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
        {BUILTIN.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => { onChange(value === opt.value ? '' : opt.value); setCustomOpen(false) }}
            style={{
              ...btnBase,
              borderColor: value === opt.value ? '#3b82f6' : '#cbd5e0',
              background: value === opt.value ? '#eff6ff' : '#fff',
              color: value === opt.value ? '#2563eb' : '#64748b',
            }}
          >
            {opt.label}
          </button>
        ))}
        <button
          type="button" onClick={() => setCustomOpen(!customOpen)}
          style={{ ...btnBase, borderStyle: 'dashed', color: '#94a3b8' }}
        >
          URL
        </button>
        <button
          type="button" onClick={() => fileRef.current?.click()}
          style={{ ...btnBase, borderStyle: 'dashed', color: '#94a3b8' }}
        >
          上传
        </button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
      </div>
    </div>
  )
}
