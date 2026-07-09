import { useRef, useEffect, type TextareaHTMLAttributes } from 'react'

export default function AutoTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const resize = () => {
    const el = ref.current
    if (!el) return
    el.style.overflow = 'visible'
    el.style.height = 'auto'
    const h = el.scrollHeight
    el.style.overflow = ''
    el.style.height = h + 'px'
  }

  // Initial + subsequent resize on value changes
  useEffect(() => {
    requestAnimationFrame(resize)
    const t1 = setTimeout(resize, 50)
    const t2 = setTimeout(resize, 200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [props.value])

  // Observe width changes (sidebar resize)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new ResizeObserver(() => resize())
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <textarea
      {...props}
      ref={ref}
      className={`editor-textarea-auto ${props.className || ''}`}
    />
  )
}
