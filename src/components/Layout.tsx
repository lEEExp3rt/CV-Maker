import type { ReactNode } from 'react'
import VersionBadge from './VersionBadge'

const BASE = import.meta.env.BASE_URL

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const path = window.location.pathname

  const isActive = (target: string) => {
    if (target === '/' || target === BASE || target === BASE.slice(0, -1)) {
      return path === '/' || path === BASE || path === BASE.slice(0, -1)
    }
    return path.startsWith(target)
  }

  return (
    <div className="layout-root" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <nav className="top-nav" style={{
        height: 48, background: '#0f172a', display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 2, flexShrink: 0,
      }}>
        <a href={BASE} style={{
          fontSize: 14, fontWeight: 700, color: '#fff',
          textDecoration: 'none', marginRight: 16,
          letterSpacing: '-0.01em',
        }}>
          CV-Maker
        </a>

        <a href={BASE === '/' ? '/' : BASE.slice(0, -1)} style={{
          padding: '7px 14px', fontSize: 12, fontWeight: 500,
          color: isActive('/') ? '#fff' : '#94a3b8',
          background: isActive('/') ? 'rgba(255,255,255,0.1)' : 'transparent',
          borderRadius: 6, textDecoration: 'none', transition: 'all 0.12s',
        }}>
          首页
        </a>
        <a href={BASE + 'editor'} style={{
          padding: '7px 14px', fontSize: 12, fontWeight: 500,
          color: isActive(BASE + 'editor') ? '#fff' : '#94a3b8',
          background: isActive(BASE + 'editor') ? 'rgba(255,255,255,0.1)' : 'transparent',
          borderRadius: 6, textDecoration: 'none', transition: 'all 0.12s',
        }}>
          编辑器
        </a>
        <a href={BASE + 'docs/usage'} style={{
          padding: '7px 14px', fontSize: 12, fontWeight: 500,
          color: isActive(BASE + 'docs/usage') ? '#fff' : '#94a3b8',
          background: isActive(BASE + 'docs/usage') ? 'rgba(255,255,255,0.1)' : 'transparent',
          borderRadius: 6, textDecoration: 'none', transition: 'all 0.12s',
        }}>
          文档
        </a>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <VersionBadge />
          <a
            href="https://github.com/lEEExp3rt/CV-Maker"
            target="_blank" rel="noopener"
            style={{
              padding: '7px 14px', fontSize: 12, fontWeight: 500,
              color: '#94a3b8', borderRadius: 6, textDecoration: 'none',
              transition: 'all 0.12s',
          }}
        >
          GitHub
        </a>
        </div>
      </nav>

      <div className="layout-body" style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  )
}
