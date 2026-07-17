// Inline Markdown renderer.
// Supports: **bold**, *italic*, __underline__, `inline code`
// Combined formats: ***bold italic***, **_bold underlined_**, **bold `code`**, etc.
// Code inside formatting is rendered correctly via recursive parsing.

import type { ReactNode } from 'react'

interface Props {
  text: string
}

export default function MarkdownText({ text }: Props) {
  return <>{parseAndRender(text)}</>
}

function parseAndRender(raw: string): ReactNode[] {
  const parts = parseMarkdown(raw)
  return parts.map((part, i) => {
    const key = i
    // Code — leaf node, no recursion
    if (part.type === 'code') {
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
    }
    // Text — render as-is
    if (part.type === 'text') {
      return <span key={key}>{part.value}</span>
    }
    // Bold/Italic/Underline — recursively parse inner content
    const inner = parseAndRender(part.value)
    switch (part.type) {
      case 'bold':         return <strong key={key}>{inner}</strong>
      case 'italic':       return <em key={key}>{inner}</em>
      case 'underline':    return <u key={key}>{inner}</u>
      case 'boldItalic':   return <strong key={key}><em>{inner}</em></strong>
      case 'boldUnderline':return <strong key={key}><u>{inner}</u></strong>
      case 'italicUnderline':return <em key={key}><u>{inner}</u></em>
      default:             return <span key={key}>{inner}</span>
    }
  })
}

type Part =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'italic'; value: string }
  | { type: 'underline'; value: string }
  | { type: 'boldItalic'; value: string }
  | { type: 'boldUnderline'; value: string }
  | { type: 'italicUnderline'; value: string }
  | { type: 'code'; value: string }

function parseMarkdown(raw: string): Part[] {
  // Order in regex matters — triple markers before double
  const regex = /(\*\*\*(.+?)\*\*\*)|(__\*(.+?)\*__)|(\*\*_(.+?)_\*\*)|(\*\*(.+?)\*\*)|(__(.+?)__)|(\*(.+?)\*)|(`(.+?)`)/gs
  const parts: Part[] = []
  let lastIndex = 0

  let match: RegExpExecArray | null
  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: raw.slice(lastIndex, match.index) })
    }

    if (match[1]) {
      parts.push({ type: 'boldItalic', value: match[2] })
    } else if (match[3]) {
      parts.push({ type: 'italicUnderline', value: match[4] })
    } else if (match[5]) {
      parts.push({ type: 'boldUnderline', value: match[6] })
    } else if (match[7]) {
      parts.push({ type: 'bold', value: match[8] })
    } else if (match[9]) {
      parts.push({ type: 'underline', value: match[10] })
    } else if (match[11]) {
      parts.push({ type: 'italic', value: match[12] })
    } else if (match[13]) {
      parts.push({ type: 'code', value: match[14] })
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < raw.length) {
    parts.push({ type: 'text', value: raw.slice(lastIndex) })
  }

  return parts
}
