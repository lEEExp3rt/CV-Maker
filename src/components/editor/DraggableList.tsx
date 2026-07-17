import { useState, useRef, useCallback, type ReactNode } from 'react'

interface Props<T> {
  items: T[]
  onChange: (items: T[]) => void
  children: (item: T, index: number, dragHandle: ReactNode) => ReactNode
}

export default function DraggableList<T>({ items, onChange, children }: Props<T>) {
  const [dragIdx, setDragIdx] = useState<number | null>(null)
  const [overIdx, setOverIdx] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleDragStart = useCallback((e: React.DragEvent, i: number) => {
    setDragIdx(i)
    e.dataTransfer.effectAllowed = 'move'

    // Find the draggable wrapper — either an entry card or a detail item
    const handle = e.currentTarget as HTMLElement
    const card = handle.closest('.editor-entry-card') as HTMLElement
    const row = handle.closest('[data-drag-row]') as HTMLElement
    const el = row || card

    if (el) {
      const ghost = el.cloneNode(true) as HTMLElement
      ghost.style.position = 'absolute'
      ghost.style.top = '-9999px'
      ghost.style.opacity = '0.85'
      ghost.style.width = el.offsetWidth + 'px'
      document.body.appendChild(ghost)

      // Offset from cursor to card top-left = handle position relative to card
      const handleRect = handle.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const offsetX = handleRect.left - elRect.left
      const offsetY = handleRect.top - elRect.top

      e.dataTransfer.setDragImage(ghost, offsetX, offsetY)
      requestAnimationFrame(() => document.body.removeChild(ghost))
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, i: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (dragIdx !== null && dragIdx !== i) {
      setOverIdx(i)
    }
    // Auto-scroll — find the closest scrollable ancestor
    const scrollParent = (e.currentTarget as HTMLElement).closest('.editor-form') as HTMLElement
      || (e.currentTarget as HTMLElement).closest('[style*="overflow"]') as HTMLElement
    if (scrollParent) {
      const rect = scrollParent.getBoundingClientRect()
      const y = e.clientY - rect.top
      const threshold = 50
      if (y < threshold) {
        scrollParent.scrollTop -= Math.max(5, (threshold - y) * 0.3)
      } else if (y > rect.height - threshold) {
        scrollParent.scrollTop += Math.max(5, (y - rect.height + threshold) * 0.3)
      }
    }
  }, [dragIdx])

  const handleDrop = useCallback((i: number) => {
    if (dragIdx === null || dragIdx === i) {
      setDragIdx(null)
      setOverIdx(null)
      return
    }
    const next = [...items]
    const [moved] = next.splice(dragIdx, 1)
    next.splice(i, 0, moved)
    onChange(next)
    setDragIdx(null)
    setOverIdx(null)
  }, [dragIdx, items, onChange])

  const handleDragEnd = useCallback(() => {
    setDragIdx(null)
    setOverIdx(null)
  }, [])

  return (
    <div ref={containerRef}>
      {items.map((item, i) => (
        <div
          key={i}
          onDragOver={(e) => handleDragOver(e, i)}
          onDrop={() => handleDrop(i)}
          style={{
            opacity: dragIdx === i ? 0.3 : 1,
            borderTop: overIdx === i ? '2px solid #3b82f6' : '2px solid transparent',
            borderRadius: 4,
            transition: 'border-color 0.1s, opacity 0.1s',
          }}
        >
          {children(item, i, (
            <span
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragEnd={handleDragEnd}
              title="拖拽排序"
              style={{
                cursor: 'grab', fontSize: 16, color: '#cbd5e0',
                userSelect: 'none', padding: '0 4px', lineHeight: 1,
                flexShrink: 0, display: 'inline-flex', alignItems: 'center',
              }}
            >
              ⠿
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
