// Simple inline Markdown renderer.
// Supports: **bold**, *italic*, __underline__, `inline code`

interface Props {
  text: string
}

export default function MarkdownText({ text }: Props) {
  // Parse order matters: ** before *, __ before _ to avoid conflicts
  const parts = parseMarkdown(text)
  return <>{parts.map((part, i) => renderPart(part, i))}</>
}

type Part =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'italic'; value: string }
  | { type: 'underline'; value: string }
  | { type: 'code'; value: string }

function renderPart(part: Part, key: number) {
  switch (part.type) {
    case 'bold':
      return <strong key={key}>{part.value}</strong>
    case 'italic':
      return <em key={key}>{part.value}</em>
    case 'underline':
      return <u key={key}>{part.value}</u>
    case 'code':
      return (
        <code key={key} style={{
          fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
          fontSize: '0.92em',
          background: '#f1f5f9',
          padding: '0 2px',
          borderRadius: 2,
        }}>
          {part.value}
        </code>
      )
    default:
      return <span key={key}>{part.value}</span>
  }
}

function parseMarkdown(raw: string): Part[] {
  // Tokenize bold **, italic *, underline __, code `
  const regex = /(\*\*(.+?)\*\*)|(\b__(.+?)__\b)|(\*(.+?)\*)|(`(.+?)`)/gs
  const parts: Part[] = []
  let lastIndex = 0

  let match: RegExpExecArray | null
  while ((match = regex.exec(raw)) !== null) {
    // Text before this match
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: raw.slice(lastIndex, match.index) })
    }

    if (match[1]) {
      // **bold**
      parts.push({ type: 'bold', value: match[2] })
    } else if (match[3]) {
      // __underline__
      parts.push({ type: 'underline', value: match[4] })
    } else if (match[5]) {
      // *italic*
      parts.push({ type: 'italic', value: match[6] })
    } else if (match[7]) {
      // `code`
      parts.push({ type: 'code', value: match[8] })
    }

    lastIndex = match.index + match[0].length
  }

  // Remaining text
  if (lastIndex < raw.length) {
    parts.push({ type: 'text', value: raw.slice(lastIndex) })
  }

  return parts
}
