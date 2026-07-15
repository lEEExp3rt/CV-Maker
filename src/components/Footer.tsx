import { useState } from 'react'
import Modal from './editor/Modal'
import MarkdownPage from './MarkdownPage'
import licenseRaw from '../../LICENSE?raw'

const BASE = import.meta.env.BASE_URL

export default function Footer() {
  const [showLicense, setShowLicense] = useState(false)

  return (
    <div>
      <hr style={{ marginTop: 48, border: 'none', borderTop: '1px solid #cbd5e0' }} />
      <div style={{
        padding: '24px 48px 36px',
        display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
        flexWrap: 'wrap', gap: 48,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
            Released under the{' '}
            <button
              onClick={() => setShowLicense(true)}
              style={{
                color: '#64748b', background: 'none', border: 'none',
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit',
                padding: 0, textDecoration: 'underline', textUnderlineOffset: 2,
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#1a365d' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#64748b' }}
            >
              MIT License
            </button>
            .
          </p>
          <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
            Copyright &copy; 2026 <a href="https://github.com/lEEExp3rt" target="_blank" rel="noopener"
              style={{ color: '#64748b', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = '#1a365d' }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = '#64748b' }}
            >!EEExp3rt</a>
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>Powered by</span>
          {[
            { src: BASE + 'icons/react.svg', alt: 'React', href: 'https://react.dev' },
            { src: BASE + 'icons/typescript.svg', alt: 'TypeScript', href: 'https://www.typescriptlang.org' },
            { src: BASE + 'icons/vite.svg', alt: 'Vite', href: 'https://vite.dev' },
            { src: BASE + 'icons/github.svg', alt: 'GitHub Pages', href: 'https://pages.github.com' },
            { src: BASE + 'icons/remixicon.svg', alt: 'Remix Icon', href: 'https://remixicon.com', w: 90, h: 18 },
          ].map((item) => (
            <a key={item.alt} href={item.href} target="_blank" rel="noopener" title={item.alt}
              style={{ display: 'flex', alignItems: 'center', opacity: 0.7, transition: 'opacity 0.15s' }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.opacity = '1' }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.opacity = '0.7' }}
            >
              <img src={(item as { src: string }).src} alt={item.alt}
                width={(item as any).w || 18} height={(item as any).h || 18} />
            </a>
          ))}
        </div>
      </div>

      {showLicense && (
        <Modal
          open={showLicense}
          title="MIT License"
          confirmLabel="关闭"
          cancelLabel=""
          wide
          onConfirm={() => setShowLicense(false)}
          onCancel={() => setShowLicense(false)}
        >
          <MarkdownPage content={licenseRaw} />
        </Modal>
      )}
    </div>
  )
}
