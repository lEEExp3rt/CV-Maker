import { type TocItem } from './MarkdownPage'

interface Props {
  items: TocItem[]
}

export default function TocSidebar({ items }: Props) {
  if (items.length === 0) return null

  return (
    <div style={{
      width: 200, flexShrink: 0, padding: '32px 16px 0 0',
      overflow: 'auto',
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>
        On this page
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-toc={item.id}
            style={{
              display: 'block',
              paddingTop: 3,
              paddingBottom: 3,
              paddingRight: 4,
              paddingLeft: item.level === 2 ? 8 : 24,
              fontSize: item.level === 2 ? 11 : 10,
              fontWeight: item.level === 2 ? 500 : 400,
              lineHeight: 1.5,
              color: '#64748b', textDecoration: 'none',
              borderLeft: '2px solid transparent',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#1a365d' }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement
              if (!el.classList.contains('toc-active')) el.style.color = '#64748b'
            }}
          >
            {item.num} {item.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
