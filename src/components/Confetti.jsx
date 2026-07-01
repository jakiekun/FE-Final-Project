// Lightweight CSS confetti burst. Render it briefly (parent toggles).
const COLORS = ['#00E5C7', '#A855F7', '#FF2D9B', '#ffd24d', '#2dd4bf']

export default function Confetti() {
  const pieces = Array.from({ length: 46 })
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((_, i) => (
        <span
          key={i}
          className="confetti__pc"
          style={{
            left: `${Math.random() * 100}%`,
            background: COLORS[i % COLORS.length],
            animationDelay: `${Math.random() * 0.4}s`,
            animationDuration: `${1.1 + Math.random() * 0.9}s`,
          }}
        />
      ))}
    </div>
  )
}
