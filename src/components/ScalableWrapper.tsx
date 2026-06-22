import { useRef, useEffect, useState, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  nativeWidth?: number
}

export default function ScalableWrapper({ children, nativeWidth = 794 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const calc = () => setScale(Math.min(1, el.offsetWidth / nativeWidth))
    calc()
    const obs = new ResizeObserver(calc)
    obs.observe(el)
    return () => obs.disconnect()
  }, [nativeWidth])

  return (
    <div ref={ref} style={{ overflow: 'hidden', width: '100%' }}>
      <div style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: nativeWidth,
        marginBottom: scale < 1 ? -(nativeWidth * (1 - scale)) : 0,
      }}>
        {children}
      </div>
    </div>
  )
}
