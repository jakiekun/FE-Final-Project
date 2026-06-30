import { getRankMeta } from '../data/games.js'
import RankMedal from './RankMedal.jsx'

// A game-style rank medal emblem + label, colored by rank tier.
// size: 'sm' | 'md' | 'lg'
export default function RankBadge({ rank, size = 'md', showLabel = true, active = false }) {
  const { color } = getRankMeta(rank)
  const px = size === 'sm' ? 24 : size === 'lg' ? 48 : 32
  return (
    <span
      className={`rank-badge rank-badge--${size}${active ? ' is-active' : ''}`}
      style={{ '--rank': color }}
      title={rank}
    >
      <RankMedal rank={rank} size={px} />
      {showLabel && <span className="rank-badge__label">{rank}</span>}
    </span>
  )
}
