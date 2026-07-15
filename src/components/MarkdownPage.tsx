import { useMemo, useEffect, useRef } from 'react'

// ============================================================
// Syntax highlighting
// ============================================================
function highlight(code: string, lang: string): string {
  const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  if (!lang || lang === 'text' || lang === 'plain') return escaped

  const rules: [RegExp, string][] = []
  if (['ts', 'tsx', 'typescript', 'js', 'jsx', 'javascript', 'css'].includes(lang)) {
    rules.push([/(\/\/[^\n]*)/g, 'cmt'], [/(\/\*[\s\S]*?\*\/)/g, 'cmt'])
  }
  if (['bash', 'sh', 'shell', 'yaml', 'yml', 'dockerfile'].includes(lang)) {
    rules.push([/(#.*)/g, 'cmt'])
  }
  if (lang === 'html' || lang === 'xml') {
    rules.push([/(&lt;!--[\s\S]*?--&gt;)/g, 'cmt'])
  }
  rules.push([/(`[^`]*`)/g, 'str'], [/("[^"]*")/g, 'str'], [/('[^']*')/g, 'str'])
  if (['ts', 'tsx', 'typescript', 'js', 'jsx', 'javascript'].includes(lang)) {
    rules.push([/\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements|new|this|async|await|try|catch|throw|typeof|keyof|as|in|of|default|switch|case|break|continue|true|false|null|undefined)\b/g, 'kwd'])
  }
  if (['bash', 'sh', 'shell'].includes(lang)) {
    rules.push([/\b(npm|docker|git|node|cd|ls|mkdir|rm|echo|exec|set|apt|apt-get|curl|cat|head|grep|sed)\b/g, 'kwd'])
  }
  if (['css'].includes(lang)) {
    rules.push([/\b(@media|@page|@font-face|@keyframes|url|var|calc)\b/g, 'kwd'])
  }
  if (['json'].includes(lang)) {
    rules.push([/("(?:[^"\\]|\\.)*")\s*:/g, 'key'])
  }
  if (['html', 'xml'].includes(lang)) {
    rules.push([/(&lt;\/?)([\w-]+)/g, 'tag'], [/(\w+)(=\s*"[^"]*")/g, 'attr'])
  }
  if (['yaml', 'yml'].includes(lang)) {
    rules.push([/(^\s*[\w-]+(?=:))/gm, 'key'])
  }
  rules.push([/\b(\d+\.?\d*)\b/g, 'num'])

  let result = escaped
  for (const [pattern, cls] of rules) {
    result = result.replace(pattern, (_m: string, ...groups: string[]) => {
      return `<span class="hl-${cls}">${groups[0] ?? _m}</span>`
    })
  }
  return result
}

// ============================================================
// Tokenizer
// ============================================================
type Token =
  | { type: 'h1'; text: string; id: string }
  | { type: 'h2'; text: string; id: string; num: string }
  | { type: 'h3'; text: string; id: string; num: string }
  | { type: 'h4'; text: string; id: string; num: string }
  | { type: 'p'; text: string }
  | { type: 'code'; lang: string; text: string }
  | { type: 'hr' }
  | { type: 'table'; header: string[]; rows: string[][] }
  | { type: 'ul'; items: string[] }

export interface TocItem {
  id: string
  text: string
  num: string
  level: number
}

function slug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

function tokenize(src: string): { tokens: Token[]; toc: TocItem[] } {
  const tokens: Token[] = []
  const toc: TocItem[] = []
  const lines = src.split('\n')
  let i = 0
  let h2count = 0
  let h3count = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) { codeLines.push(lines[i]); i++ }
      tokens.push({ type: 'code', lang, text: codeLines.join('\n') })
      i++; continue
    }

    if (line.startsWith('#### ') || line.startsWith('### ') || line.startsWith('## ') || line.startsWith('# ')) {
      const level = line.startsWith('#### ') ? 4 : line.startsWith('### ') ? 3 : line.startsWith('## ') ? 2 : 1
      const text = line.slice(level === 4 ? 5 : level + 1).trim()
      const id = slug(text)

      if (level === 2) { h2count++; h3count = 0 }
      if (level === 3) { h3count++ }
      const num = level === 1 ? '' : level === 2 ? `${h2count}` : level === 3 ? `${h2count}.${h3count}` : `${h2count}.${h3count}.1`

      if (level >= 2 && level <= 3) {
        toc.push({ id, text, num, level })
      }

      if (level === 1) tokens.push({ type: 'h1', text, id })
      else if (level === 2) tokens.push({ type: 'h2', text, id, num })
      else if (level === 3) tokens.push({ type: 'h3', text, id, num })
      else tokens.push({ type: 'h4', text, id, num: `${h2count}.${h3count}.1` })
      i++; continue
    }

    if (line.trim() === '---') { tokens.push({ type: 'hr' }); i++; continue }

    if (line.startsWith('|') && i + 1 < lines.length && lines[i + 1].startsWith('|') && lines[i + 1].includes('---')) {
      const header = line.split('|').filter((c) => c.trim()).map((c) => c.trim())
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].startsWith('|')) { rows.push(lines[i].split('|').filter((c) => c.trim()).map((c) => c.trim())); i++ }
      tokens.push({ type: 'table', header, rows })
      continue
    }

    if (line.match(/^[\s]*[-*]\s/)) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(/^[\s]*[-*]\s/)) { items.push(lines[i].replace(/^[\s]*[-*]\s/, '')); i++ }
      tokens.push({ type: 'ul', items })
      continue
    }

    if (line.trim() === '') { i++; continue }

    const paraLines: string[] = []
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('```') && !lines[i].startsWith('#') && !(lines[i].startsWith('|') && i + 1 < lines.length && lines[i + 1].startsWith('|') && lines[i + 1].includes('---')) && lines[i].trim() !== '---' && !lines[i].match(/^[\s]*[-*]\s/)) {
      paraLines.push(lines[i]); i++
    }
    if (paraLines.length > 0) tokens.push({ type: 'p', text: paraLines.join('\n') })
  }
  return { tokens, toc }
}

function renderInline(text: string): string {
  let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  return html
}

function tokenToHtml(token: Token): string {
  switch (token.type) {
    case 'h1': return `<h1 id="${token.id}">${renderInline(token.text)}</h1>`
    case 'h2': return `<h2 id="${token.id}">${token.num}. ${renderInline(token.text)}</h2>`
    case 'h3': return `<h3 id="${token.id}">${token.num} ${renderInline(token.text)}</h3>`
    case 'h4': return `<h4 id="${token.id}">${token.num} ${renderInline(token.text)}</h4>`
    case 'hr': return '<hr>'
    case 'ul': return '<ul>' + token.items.map((li) => `<li>${renderInline(li)}</li>`).join('') + '</ul>'
    case 'p': return `<p>${renderInline(token.text)}</p>`
    case 'code': {
      const lines = token.text.split('\n')
      const numbered = lines.map((l, idx) =>
        `<span class="cln">${idx + 1}</span><span class="clt">${highlight(l, token.lang)}</span>`
      ).join('\n')
      return `<div class="cbw"><div class="cbl">${token.lang || 'text'}</div><button class="cbc" onclick="navigator.clipboard.writeText(this.dataset.code);this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',1500)" data-code="${token.text.replace(/"/g, '&quot;').replace(/\n/g, '&#10;')}">Copy</button><pre class="cbi"><code>${numbered}</code></pre></div>`
    }
    case 'table': {
      let t = '<table><tr>' + token.header.map((h) => `<th>${renderInline(h)}</th>`).join('') + '</tr>'
      token.rows.forEach((row) => { t += '<tr>' + row.map((c) => `<td>${renderInline(c)}</td>`).join('') + '</tr>' })
      return t + '</table>'
    }
  }
}

// ============================================================
// Component
// ============================================================
interface Props {
  content: string
  onToc?: (toc: TocItem[]) => void
}

export default function MarkdownPage({ content, onToc }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { tokens, toc } = useMemo(() => tokenize(content), [content])

  useEffect(() => { onToc?.(toc) }, [toc, onToc])

  const html = useMemo(() => tokens.map(tokenToHtml).join('\n'), [tokens])

  return (
    <div ref={ref} style={{
      maxWidth: 720, margin: '0 auto', padding: '32px 24px 64px',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', system-ui, sans-serif",
      lineHeight: 1.8, color: '#334155', fontSize: 14,
    }}>
      <div dangerouslySetInnerHTML={{ __html: html }} className="md-content" />
    </div>
  )
}
