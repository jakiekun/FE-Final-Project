import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/a11y.js'

// Interactive neon background: a drifting particle network + floating glowing
// polygons (triangles / hexagons) + mouse parallax & connection lines.
// Pure <canvas>, no deps. Honors prefers-reduced-motion.

const COLORS = ['#00E5C7', '#A855F7', '#FF2D9B']
const LINK_DIST = 130

export default function AnimatedBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = prefersReducedMotion()

    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    const mouse = { x: -9999, y: -9999, tx: 0, ty: 0, px: 0, py: 0 }
    const rand = (a, b) => a + Math.random() * (b - a)

    let pts = []
    let polys = []

    const build = () => {
      const count = Math.max(28, Math.min(80, Math.floor((w * h) / 20000)))
      pts = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: rand(-0.22, 0.22),
        vy: rand(-0.22, 0.22),
        r: rand(0.8, 2.4),
        c: COLORS[i % COLORS.length],
      }))
      polys = Array.from({ length: 6 }, (_, i) => ({
        x: rand(0, w),
        y: rand(0, h),
        size: rand(60, 150),
        sides: i % 2 === 0 ? 3 : 6,
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.0015, 0.0015),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.12, 0.12),
        c: COLORS[i % COLORS.length],
      }))
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const drawPoly = (p) => {
      ctx.save()
      ctx.translate(p.x + mouse.px * 0.6, p.y + mouse.py * 0.6)
      ctx.rotate(p.rot)
      ctx.beginPath()
      for (let i = 0; i < p.sides; i++) {
        const a = (i / p.sides) * Math.PI * 2
        const x = Math.cos(a) * p.size
        const y = Math.sin(a) * p.size
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = p.c
      ctx.globalAlpha = 0.12
      ctx.lineWidth = 1.5
      ctx.shadowBlur = 18
      ctx.shadowColor = p.c
      ctx.stroke()
      ctx.restore()
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h)

      // smooth mouse parallax
      mouse.px += (mouse.tx - mouse.px) * 0.05
      mouse.py += (mouse.ty - mouse.py) * 0.05

      // glowing polygons (behind)
      for (const p of polys) {
        if (!reduce) {
          p.x += p.vx; p.y += p.vy; p.rot += p.vr
          if (p.x < -p.size) p.x = w + p.size
          if (p.x > w + p.size) p.x = -p.size
          if (p.y < -p.size) p.y = h + p.size
          if (p.y > h + p.size) p.y = -p.size
        }
        drawPoly(p)
      }
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1

      // particles
      for (const a of pts) {
        if (!reduce) {
          a.x += a.vx; a.y += a.vy
          if (a.x < 0 || a.x > w) a.vx *= -1
          if (a.y < 0 || a.y > h) a.vy *= -1
        }
      }

      // links between particles
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        const ax = a.x + mouse.px
        const ay = a.y + mouse.py
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            ctx.strokeStyle = a.c
            ctx.globalAlpha = (1 - d / LINK_DIST) * 0.18
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(b.x + mouse.px, b.y + mouse.py)
            ctx.stroke()
          }
        }
        // link to mouse
        const mdx = a.x - mouse.x
        const mdy = a.y - mouse.y
        const md = Math.hypot(mdx, mdy)
        if (md < 180) {
          ctx.strokeStyle = '#00E5C7'
          ctx.globalAlpha = (1 - md / 180) * 0.4
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(ax, ay)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
        // particle dot
        ctx.globalAlpha = 0.7
        ctx.fillStyle = a.c
        ctx.beginPath()
        ctx.arc(ax, ay, a.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (!reduce) raf = requestAnimationFrame(frame)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.tx = (e.clientX - w / 2) * 0.03
      mouse.ty = (e.clientY - h / 2) * 0.03
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; mouse.tx = 0; mouse.ty = 0 }

    resize()
    frame()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
