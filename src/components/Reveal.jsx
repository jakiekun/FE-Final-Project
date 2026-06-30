import { useEffect, useRef, useState } from 'react'

// Reveals children with a fade/slide once they scroll into view.
// Add `stagger` to animate direct children one after another.
export default function Reveal({ children, stagger = false, className = '', style }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const base = stagger ? 'reveal-stagger' : 'reveal'
  return (
    <div ref={ref} className={`${base}${shown ? ' in-view' : ''} ${className}`.trim()} style={style}>
      {children}
    </div>
  )
}
