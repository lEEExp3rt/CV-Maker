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
        // If container height > one line of the title, it wrapped
        const lineHeight = ref.current.querySelector('.resume-entry-title')?.getBoundingClientRect().height
        const containerHeight = ref.current.getBoundingClientRect().height
        if (lineHeight && containerHeight > lineHeight * 1.5) {
          setWrapped(true)
        } else {
          setWrapped(false)
        }
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
      {showMeta && !wrapped && <span className="resume-entry-meta-sep">|</span>}
      {showMeta && <span className="resume-entry-meta-inline">{meta}</span>}
    </span>
  )
}
