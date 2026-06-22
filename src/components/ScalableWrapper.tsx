import { useRef, useEffect, useState, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  nativeWidth?: number // natural width in px, default A4 210mm ≈ 794px
}

export default function ScalableWrapper({ children, nativeWidth = 794 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const calc = () => {
      const w = el.offsetWidth
      setScale(Math.min(1, w / nativeWidth))
    }

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
        marginBottom: -(nativeWidth * (1 - scale)),
      }}>
        {children}
      </div>
    </div>
  )
}
