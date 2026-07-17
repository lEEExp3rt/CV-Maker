import { useRef, useEffect, useState, type ReactNode } from 'react'

interface Props {
  title: ReactNode
  meta: ReactNode
  showMeta: boolean
}

export default function HeaderLeft({ title, meta, showMeta }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [wrapped, setWrapped] = useState(false)

  useEffect(() => {
    if (!showMeta || !ref.current) return

    const check = () => {
      if (ref.current) {
        const titleEl = ref.current.querySelector('.resume-entry-title')
        const lineHeight = titleEl?.getBoundingClientRect().height ?? 0
        const containerHeight = ref.current.getBoundingClientRect().height
        if (!lineHeight) return

        setWrapped((prev) => {
          // Hysteresis: use tighter thresholds to avoid flicker at boundary
          if (containerHeight > lineHeight * 1.6) return true
          if (containerHeight < lineHeight * 1.3) return false
          return prev // keep current state in the gray zone
        })
      }
    }

    check()

    const observer = new ResizeObserver(check)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [showMeta])

  return (
    <span className="resume-entry-header-left" ref={ref}>
      {title}
      {showMeta && (
        <span className="resume-entry-meta-sep" style={{ opacity: wrapped ? 0 : 1 }}>
          |
        </span>
      )}
      {showMeta && <span className="resume-entry-meta-inline">{meta}</span>}
    </span>
  )
}
