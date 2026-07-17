import { useState } from 'react'
import type { AnonOptions } from '../../types/anonymize'

interface Props {
  options: AnonOptions
  onChange: (opts: AnonOptions) => void
  enabled: boolean
  onToggle: (on: boolean) => void
}

const ITEMS: { key: keyof AnonOptions; label: string }[] = [
  { key: 'name', label: '姓名' },
  { key: 'photo', label: '照片' },
  { key: 'contact', label: '联系方式' },
  { key: 'socials', label: '社交媒体' },
  { key: 'education', label: '教育背景' },
  { key: 'internship', label: '实习经历' },
  { key: 'projects', label: '项目经历' },
]

export default function AnonSwitcher({ options, onChange, enabled, onToggle }: Props) {
  const [open, setOpen] = useState(false)

  const toggle = (key: keyof AnonOptions) => {
    onChange({ ...options, [key]: !options[key] })
  }

  // Count active anonymizations
  const count = Object.values(options).filter(Boolean).length

  return (
    <div style={{ position: 'relative' }}>
      <label style={{ fontSize: 10, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onToggle(e.target.checked)}
          style={{ margin: 0, cursor: 'pointer' }}
        />
        匿名模式
        {enabled && (
          <button
            onClick={() => setOpen(!open)}
            style={{
              marginLeft: 2, width: 18, height: 18, fontSize: 10,
              border: '1px solid #cbd5e0', borderRadius: 4, background: '#fff',
              cursor: 'pointer', color: '#64748b', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
            title="匿名选项"
          >
            ⚙
          </button>
        )}
      </label>

      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 99 }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: 'absolute', top: 26, left: 0, zIndex: 100,
            background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8,
            padding: '8px 0', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            minWidth: 140,
          }}>
            {ITEMS.map((item) => (
              <label
                key={item.key}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '4px 12px', fontSize: 11, cursor: 'pointer',
                  color: '#334155',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#f8fafc' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'none' }}
              >
                <input
                  type="checkbox"
                  checked={options[item.key]}
                  onChange={() => toggle(item.key)}
                  style={{ margin: 0, cursor: 'pointer' }}
                />
                {item.label}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
