const BASE = import.meta.env.BASE_URL

export default function Footer() {
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
            Released under the MIT License.
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
            { src: BASE + 'icons/lucide.svg', alt: 'Lucide', href: 'https://lucide.dev' },
          ].map(({ src, alt, href }) => (
            <a key={alt} href={href} target="_blank" rel="noopener" title={alt}
              style={{ display: 'flex', alignItems: 'center', opacity: 0.7, transition: 'opacity 0.15s' }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.opacity = '1' }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.opacity = '0.7' }}
            >
              <img src={src} alt={alt} width={18} height={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
