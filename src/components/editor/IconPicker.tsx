import { useState, useRef } from 'react'
import { BUILTIN_ICONS, CustomIcon } from '../Icons'

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
  const builtin = BUILTIN_ICONS.find((b) => b.key === value)
  const isCustom = !!value && !builtin
  const [customOpen, setCustomOpen] = useState(isCustom)
  const [remixName, setRemixName] = useState(isCustom && !value.startsWith('http') && !value.includes('/') ? value : '')

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
    setCustomOpen(true)
    e.target.value = ''
  }

  const showPreview = isCustom

  return (
    <div>
      {customOpen ? (
        <div style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 4 }}>
            <input
              value={value}
              onChange={(e) => { onChange(e.target.value); setRemixName(e.target.value) }}
              placeholder="https://... 或 Remix 图标名 (如 wechat-line)"
              style={{ flex: 1, height: 28, padding: '0 8px', fontSize: 10, border: '1px solid #cbd5e0', borderRadius: 6, fontFamily: 'inherit' }}
            />
            <button type="button" className="card-remove"
              onClick={() => { onChange(''); setCustomOpen(false); setRemixName('') }}>×</button>
          </div>
          {showPreview && (
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <CustomIcon src={value} size={14} />
              </span>
              <span style={{ fontSize: 10, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {value.startsWith('data:') ? '已上传' : remixName || value}
              </span>
            </div>
          )}
        </div>
      ) : showPreview ? (
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 6 }}>
          <CustomIcon src={value} size={14} />
          <span style={{ fontSize: 10, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
            {BUILTIN_ICONS.find((b) => b.key === value)?.label || (value.startsWith('data:') ? '已上传' : value)}
          </span>
          <button type="button" className="card-remove"
            onClick={() => { onChange(''); setCustomOpen(false) }}>×</button>
        </div>
      ) : null}

      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
        {BUILTIN_ICONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => { onChange(value === opt.key ? '' : opt.key); setCustomOpen(false) }}
            style={{
              ...btnBase,
              borderColor: value === opt.key ? '#3b82f6' : '#cbd5e0',
              background: value === opt.key ? '#eff6ff' : '#fff',
              color: value === opt.key ? '#2563eb' : '#64748b',
            }}
          >
            {opt.label}
          </button>
        ))}
        <button
          type="button" onClick={() => setCustomOpen(!customOpen)}
          style={{ ...btnBase, borderStyle: 'dashed', color: '#94a3b8' }}
        >
          Remix
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
