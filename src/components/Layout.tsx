import type { ReactNode } from 'react'

// Use Vite's base path so links work on GitHub Pages subpath (e.g. /CV-Maker/)
const BASE = import.meta.env.BASE_URL

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const path = window.location.pathname

  const isActive = (target: string) => {
    return path === target || path.startsWith(target + (target.endsWith('/') ? '' : '/'))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <nav className="top-nav" style={{
        height: 48, background: '#0f172a', display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 2, flexShrink: 0,
      }}>
        {/* Brand */}
        <a href={BASE} style={{
          fontSize: 14, fontWeight: 700, color: '#fff',
          textDecoration: 'none', marginRight: 16,
          letterSpacing: '-0.01em',
        }}>
          CV-Maker
        </a>

        {/* Nav links */}
        {[
          { path: BASE === '/' ? '/' : BASE.slice(0, -1), label: '首页' },
          { path: BASE + 'editor', label: '编辑器' },
          { path: BASE + 'docs/usage', label: '文档' },
        ].map(({ path: p, label }) => (
          <a key={p} href={p} onClick={(e) => { if (path === p || path === p + '/') e.preventDefault() }}
            style={{
              padding: '7px 14px', fontSize: 12, fontWeight: 500,
              color: isActive(p) ? '#fff' : '#94a3b8',
              background: isActive(p) ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderRadius: 6, textDecoration: 'none',
              transition: 'all 0.12s',
            }}
            onMouseEnter={(e) => {
              if (!isActive(p)) (e.target as HTMLElement).style.color = '#e2e8f0'
            }}
            onMouseLeave={(e) => {
              if (!isActive(p)) (e.target as HTMLElement).style.color = '#94a3b8'
            }}
          >
            {label}
          </a>
        ))}

        {/* GitHub link — pushed to right */}
        <a
          href="https://github.com/lEEExp3rt/CV-Maker"
          target="_blank"
          rel="noopener"
          style={{
            marginLeft: 'auto', padding: '7px 14px', fontSize: 12, fontWeight: 500,
            color: '#94a3b8', borderRadius: 6, textDecoration: 'none',
            transition: 'all 0.12s',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#e2e8f0' }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#94a3b8' }}
        >
          GitHub
        </a>
      </nav>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  )
}
