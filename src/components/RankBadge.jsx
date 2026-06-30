import { getRankMeta } from '../data/games.js'

// A glowing rank emblem (tier icon) + label, colored by rank tier.
// size: 'sm' | 'md' | 'lg'
export default function RankBadge({ rank, size = 'md', showLabel = true, active = false }) {
  const { color, icon } = getRankMeta(rank)
  return (
    <span
      className={`rank-badge rank-badge--${size}${active ? ' is-active' : ''}`}
      style={{ '--rank': color }}
      title={rank}
    >
      <span className="rank-badge__emblem">{icon}</span>
      {showLabel && <span className="rank-badge__label">{rank}</span>}
    </span>
  )
}
