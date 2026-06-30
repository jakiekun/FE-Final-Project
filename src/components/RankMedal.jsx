import { useId } from 'react'
import { getRankMeta } from '../data/games.js'

// A game-style rank medal rendered as scalable SVG.
// Higher tiers gain wings (>=6) and a crown (>=9). Glow color = tier color.
export default function RankMedal({ rank, size = 30 }) {
  const { color, tier } = getRankMeta(rank)
  const uid = useId().replace(/[:]/g, '')
  const gem = `gem-${uid}`
  const metal = `metal-${uid}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 5px ${color})`, flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gem} cx="50%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="38%" stopColor={color} />
          <stop offset="100%" stopColor="#0b0e1a" />
        </radialGradient>
        <linearGradient id={metal} x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f4f7ff" />
          <stop offset="1" stopColor="#7e87a3" />
        </linearGradient>
      </defs>

      {/* wings for high tiers */}
      {tier >= 6 && (
        <g stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.18" strokeLinejoin="round">
          <path d="M24 26 C15 21 9 23 4 29 C12 28 17 30 24 33 Z" />
          <path d="M22 33 C14 30 9 32 6 37 C13 36 18 37 23 39 Z" />
          <path d="M40 26 C49 21 55 23 60 29 C52 28 47 30 40 33 Z" />
          <path d="M42 33 C50 30 55 32 58 37 C51 36 46 37 41 39 Z" />
        </g>
      )}

      {/* crown for top tiers */}
      {tier >= 9 && (
        <path d="M23 13 L27 8 L32 12 L37 8 L41 13 L39 17 L25 17 Z" fill="#ffd24d" stroke="#a9791f" strokeWidth="0.8" />
      )}

      {/* shield gem */}
      <path
        d="M32 15 L46 21 L44 41 L32 51 L20 41 L18 21 Z"
        fill={`url(#${gem})`}
        stroke={`url(#${metal})`}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* inner bevel */}
      <path d="M32 21 L40 24 L39 39 L32 45 L25 39 L24 24 Z" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />

      {/* center star */}
      <path
        d="M32 26 l2.2 4.6 5 .5 -3.7 3.4 1 5 -4.5-2.5 -4.5 2.5 1-5 -3.7-3.4 5-.5 Z"
        fill="#fff"
        fillOpacity="0.92"
      />
    </svg>
  )
}
