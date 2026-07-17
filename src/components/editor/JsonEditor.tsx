import { useRef, useCallback, useEffect } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
}

// JSON syntax highlighter — tokenizes char-by-char for reliable highlighting
export function highlightJson(raw: string): string {
  const escaped = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  let out = ''
  let i = 0

  while (i < escaped.length) {
    // String (key or value)
    if (escaped[i] === '"') {
      const end = escaped.indexOf('"', i + 1)
      if (end === -1) { out += escaped.slice(i); break }
      // Check if this is a key (followed by :)
      const after = escaped.slice(end + 1).trimStart()
      const cls = after.startsWith(':') ? 'json-key' : 'json-str'
      out += `<span class="${cls}">${escaped.slice(i, end + 1)}</span>`
      i = end + 1
      continue
    }
    // Number
    if (/\d/.test(escaped[i]) && (i === 0 || /[\s,[:{]/.test(escaped[i - 1]))) {
      const m = escaped.slice(i).match(/^-?\d+\.?\d*([eE][+-]?\d+)?/)
      if (m) {
        out += `<span class="json-num">${m[0]}</span>`
        i += m[0].length
        continue
      }
    }
    // Keyword
    const kw = escaped.slice(i).match(/^(true|false|null)\b/)
    if (kw) {
      out += `<span class="json-kwd">${kw[0]}</span>`
      i += kw[0].length
      continue
    }
    out += escaped[i]
    i++
  }

  return out
}

export default function JsonEditor({ value, onChange, onKeyDown }: Props) {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLPreElement>(null)

  const syncSize = useCallback(() => {
    if (textRef.current && highlightRef.current) {
      const h = textRef.current.offsetHeight
      highlightRef.current.style.height = h + 'px'
      highlightRef.current.scrollTop = textRef.current.scrollTop
      highlightRef.current.scrollLeft = textRef.current.scrollLeft
    }
  }, [])

  useEffect(() => {
    const el = textRef.current
    if (!el) return
    const obs = new ResizeObserver(() => syncSize())
    obs.observe(el)
    return () => obs.disconnect()
  }, [syncSize])

  const shared: React.CSSProperties = {
    width: '100%', height: 260, padding: 8, fontSize: 10,
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    lineHeight: 1.5, overflow: 'auto', whiteSpace: 'pre',
    border: '1px solid #e2e8f0', borderRadius: 6,
    boxSizing: 'border-box',
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Highlighted background layer */}
      <pre
        ref={highlightRef}
        aria-hidden
        dangerouslySetInnerHTML={{ __html: highlightJson(value) + '\n' }}
        style={{
          ...shared,
          position: 'absolute', top: 0, left: 0,
          color: '#334155',
          background: '#f8fafc',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Transparent textarea for editing */}
      <textarea
        ref={textRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncSize}
        onMouseUp={syncSize}
        onKeyDown={onKeyDown}
        placeholder="在此输入或粘贴 JSON 代码..."
        spellCheck={false}
        style={{
          ...shared,
          position: 'relative', zIndex: 1,
          color: 'transparent',
          caretColor: '#1a365d',
          background: 'transparent',
          resize: 'vertical',
        }}
      />
    </div>
  )
}
