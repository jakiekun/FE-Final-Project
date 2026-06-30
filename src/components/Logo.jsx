import { Link } from 'react-router-dom'
import './Logo.css'

/**
 * Duoz brand logo.
 *  - variant="mark"  -> compact emblem + wordmark (nav bars)
 *  - variant="full"  -> animated neon lockup with gamers, heart & tagline (hero/auth)
 */
export default function Logo({ size = 32, to = '/', variant = 'mark' }) {
  const node = variant === 'full' ? <FullLockup width={size} /> : <Mark size={size} />
  if (to) return <Link to={to} className="logo-link" aria-label="Duoz">{node}</Link>
  return <span className="logo-link">{node}</span>
}

function Mark({ size }) {
  return (
    <span className="logo-mark">
      <img src="/logo.svg" width={size} height={size} alt="" />
      <span className="logo-mark__word neon-text" style={{ fontSize: size * 0.7 }}>DuoZ</span>
    </span>
  )
}

function FullLockup({ width }) {
  return (
    <svg
      className="logo-svg"
      width={width}
      viewBox="0 0 360 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Duoz — Find your duo"
    >
      <defs>
        <linearGradient id="lg-grad" x1="40" y1="120" x2="320" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E5C7" />
          <stop offset="0.5" stopColor="#A855F7" />
          <stop offset="1" stopColor="#FF2D9B" />
        </linearGradient>
        <filter id="lg-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* angular HUD frame */}
      <path
        d="M40 96 L150 96 M210 96 L320 96 L344 120 L344 232 L300 276 L60 276 L16 232 L16 120 Z"
        stroke="url(#lg-grad)" strokeWidth="2" opacity="0.35" strokeLinejoin="round" fill="none"
      />

      {/* ---- left gamer (cyan) ---- */}
      <g className="lg-gamer-l" filter="url(#lg-glow)" stroke="#00E5C7" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <circle cx="132" cy="58" r="19" fill="#0B0E1A" />
        <path d="M112 58 A20 21 0 0 1 152 58" />
        <rect x="106" y="50" width="9" height="18" rx="3.5" fill="#00E5C7" stroke="none" />
        <path d="M110 67 Q112 84 128 81" />
        <circle cx="128" cy="80" r="2.4" fill="#00E5C7" stroke="none" />
        <circle cx="128" cy="55" r="1.8" fill="#00E5C7" stroke="none" />
        <circle cx="139" cy="55" r="1.8" fill="#00E5C7" stroke="none" />
        <path d="M127 63 Q133 68 140 63" strokeWidth="2" />
      </g>

      {/* ---- right gamer (magenta) ---- */}
      <g className="lg-gamer-r" filter="url(#lg-glow)" stroke="#FF2D9B" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <circle cx="228" cy="58" r="19" fill="#0B0E1A" />
        <path d="M208 58 A20 21 0 0 1 248 58" />
        <rect x="245" y="50" width="9" height="18" rx="3.5" fill="#FF2D9B" stroke="none" />
        <path d="M250 67 Q248 84 232 81" />
        <circle cx="232" cy="80" r="2.4" fill="#FF2D9B" stroke="none" />
        <circle cx="221" cy="55" r="1.8" fill="#FF2D9B" stroke="none" />
        <circle cx="232" cy="55" r="1.8" fill="#FF2D9B" stroke="none" />
        <path d="M220 63 Q227 68 233 63" strokeWidth="2" />
      </g>

      {/* ---- heart between them ---- */}
      <path
        className="lg-heart"
        filter="url(#lg-glow)"
        d="M180 56c-3-4-9.6-2.8-9.6 2.2 0 3.3 3.8 6 9.6 9.6 5.8-3.6 9.6-6.3 9.6-9.6 0-5-6.6-6.2-9.6-2.2Z"
        fill="url(#lg-grad)"
      />
      {/* fist-bump spark lines */}
      <g stroke="url(#lg-grad)" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <path d="M158 92 L168 96" />
        <path d="M202 92 L192 96" />
      </g>

      {/* ---- wordmark (skew applied about the baseline anchor) ---- */}
      <g className="lg-word" filter="url(#lg-glow)" transform="translate(180,178) skewX(-7) translate(-180,-178)">
        <text
          x="180" y="178"
          textAnchor="middle"
          fontFamily="Orbitron, sans-serif"
          fontWeight="900"
          fontSize="74"
        >
          <tspan fill="url(#lg-grad)">Duo</tspan><tspan fill="#FF2D9B">Z</tspan>
        </text>
      </g>

      {/* controller accent (left) */}
      <g className="lg-accent" stroke="url(#lg-grad)" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d="M40 150 q-12 0 -14 14 q-3 16 6 18 q6 1 9 -6 h18 q3 7 9 6 q9 -2 6 -18 q-2 -14 -14 -14 z" />
        <path d="M34 162 v8 M30 166 h8" />
        <circle cx="58" cy="164" r="1.8" fill="url(#lg-grad)" stroke="none" />
        <circle cx="63" cy="169" r="1.8" fill="url(#lg-grad)" stroke="none" />
      </g>
      {/* crosshair accent (right) */}
      <g className="lg-accent" stroke="url(#lg-grad)" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <circle cx="320" cy="166" r="13" />
        <path d="M320 147 v8 M320 177 v8 M301 166 h8 M331 166 h8" />
        <circle cx="320" cy="166" r="2.2" fill="url(#lg-grad)" stroke="none" />
      </g>

      {/* ---- tagline ---- */}
      <g>
        <path d="M120 224 h44 M196 224 h44" stroke="url(#lg-grad)" strokeWidth="1.6" opacity="0.6" />
        <text
          className="lg-tagline"
          x="180" y="229"
          textAnchor="middle"
          fontFamily="Orbitron, sans-serif"
          fontWeight="600"
          fontSize="15"
        >
          <tspan fill="#9fb0d8">FIND YOUR </tspan><tspan fill="#FF2D9B">DUO</tspan>
        </text>
      </g>
    </svg>
  )
}
