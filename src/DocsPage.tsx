import { useState } from 'react'
import Layout from './components/Layout'
import MarkdownPage from './components/MarkdownPage'
import Footer from './components/Footer'

import usageRaw from '../docs/usage.md?raw'
import devRaw from '../docs/development.md?raw'

const BASE = import.meta.env.BASE_URL

const TABS = [
  { key: 'usage', label: '使用指南', href: BASE + 'docs/usage', content: usageRaw },
  { key: 'dev', label: '开发指南', href: BASE + 'docs/development', content: devRaw },
]

function getTabFromPath(): string {
  const p = window.location.pathname
  if (p.includes('/docs/development') || p.includes('/development')) return 'dev'
  return 'usage'
}

export default function DocsPage() {
  const [tab, setTab] = useState(getTabFromPath)
  const active = TABS.find((t) => t.key === tab)

  const switchTab = (key: string) => {
    const t = TABS.find((x) => x.key === key)
    if (t) {
      window.history.pushState({}, '', t.href)
      setTab(key)
    }
  }

  return (
    <Layout>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{
          width: 160, flexShrink: 0, background: '#f8fafc',
          borderRight: '1px solid #e2e8f0', padding: '20px 0', overflow: 'auto',
        }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => switchTab(t.key)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '8px 20px', fontSize: 13, fontFamily: 'inherit',
                fontWeight: tab === t.key ? 600 : 400,
                color: tab === t.key ? '#1a365d' : '#64748b',
                background: tab === t.key ? '#eff6ff' : 'transparent',
                border: 'none', cursor: 'pointer',
                borderRight: tab === t.key ? '2px solid #1a365d' : '2px solid transparent',
                transition: 'all 0.1s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          {active && (
            <div>
              <MarkdownPage content={active.content} />
              <Footer />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
