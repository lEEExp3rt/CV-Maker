import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const path = window.location.pathname

  const linkStyle = (target: string): React.CSSProperties => ({
    padding: '6px 14px',
    fontSize: 12,
    fontWeight: 500,
    color: path.startsWith(target) ? '#fff' : '#94a3b8',
    background: path.startsWith(target) ? 'rgba(255,255,255,0.12)' : 'transparent',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'none',
    transition: 'all 0.12s',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top nav */}
      <nav style={{
        height: 40, background: '#0f172a', display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 4, flexShrink: 0, zIndex: 100,
      }}>
        <a href="/" style={{ ...linkStyle('/'), fontWeight: 600, fontSize: 13, marginRight: 12 }}>
          CV-Maker
        </a>
        <a href="/" style={linkStyle('/')} onClick={(e) => {
          if (path === '/') e.preventDefault()
        }}>首页</a>
        <a href="/editor" style={linkStyle('/editor')}>编辑器</a>
        <a href="/examples" style={linkStyle('/examples')}>示例</a>
        <a
          href="https://github.com/1EEExp3rt/CV-Maker"
          target="_blank"
          rel="noopener"
          style={{ ...linkStyle('/github'), marginLeft: 'auto' }}
        >
          GitHub
        </a>
      </nav>

      {/* Page content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}
