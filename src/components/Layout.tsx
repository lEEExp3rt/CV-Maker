import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const path = window.location.pathname

  const isActive = (target: string) => {
    if (target === '/') return path === '/'
    return path.startsWith(target)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <nav style={{
        height: 48, background: '#0f172a', display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 2, flexShrink: 0,
      }}>
        {/* Brand */}
        <a href="/" style={{
          fontSize: 14, fontWeight: 700, color: '#fff',
          textDecoration: 'none', marginRight: 16,
          letterSpacing: '-0.01em',
        }}>
          CV-Maker
        </a>

        {/* Nav links */}
        {[
          { path: '/', label: '首页' },
          { path: '/editor', label: '编辑器' },
        ].map(({ path: p, label }) => (
          <a key={p} href={p} onClick={(e) => { if (path === p) e.preventDefault() }}
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
