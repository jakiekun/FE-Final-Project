import { getGame, getStats } from '../data/games.js'
import RankBadge from './RankBadge.jsx'
import './PlayerCard.css'

// A single player profile card shown in the swipe deck.
// `verdict` ('like' | 'nope' | null) drives the overlay stamp while dragging.
export default function PlayerCard({ player, verdict = null }) {
  if (!player) return null

  const vibe = player.vibe ?? Math.round((player.rating ?? 4.5) * 20)
  const vibeLabel = vibe >= 90 ? 'Wholesome 🌟' : vibe >= 75 ? 'Chill 😎' : vibe >= 60 ? 'Solid 👍' : vibe >= 40 ? 'Mixed ⚠️' : 'Toxic ☢️'
  const vibeColor = vibe >= 75 ? 'var(--color-success)' : vibe >= 55 ? '#ffcf4d' : 'var(--color-error)'
  const toxicity = vibe >= 90 ? 'Very Low' : vibe >= 75 ? 'Low' : vibe >= 55 ? 'Medium' : 'High'

  return (
    <article className="player-card">
      <div
        className="player-card__stamp player-card__stamp--like"
        style={{ opacity: verdict === 'like' ? 1 : 0 }}
      >
        DUO UP
      </div>
      <div
        className="player-card__stamp player-card__stamp--nope"
        style={{ opacity: verdict === 'nope' ? 1 : 0 }}
      >
        DODGE
      </div>

      <header className="player-card__top">
        <img className="player-card__avatar" src={player.avatar} alt={player.name} />
        <div>
          <div className="player-card__name">
            {player.name}
            {player.verified && <span className="badge badge--verified">✓ Verified</span>}
          </div>
          <div className="player-card__sub">
            {player.realName} · {player.age} · {player.region}
          </div>
          <div className="row mt-1" style={{ gap: 12 }}>
            <span className="row" style={{ gap: 5, fontSize: 13 }}>
              <span className={'dot' + (player.online ? ' dot--online' : '')} />
              {player.online ? 'Online now' : 'Offline'}
            </span>
            <span className="player-card__rating">★ {player.rating.toFixed(1)}</span>
          </div>
        </div>
      </header>

      <div className="player-card__body">
        <section>
          <div className="player-card__section-title">Games & Ranks</div>
          {player.games.map((g) => {
            const game = getGame(g.id)
            return (
              <div className="game-row" key={g.id}>
                <div>
                  <span className="game-row__name">
                    <span style={{ fontSize: 18 }}>{game?.emoji}</span>
                    {game?.name}
                  </span>
                  {g.roles?.length > 0 && (
                    <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>🎭 {g.roles.join(' · ')}</div>
                  )}
                  {g.stats && Object.values(g.stats).some(Boolean) && (
                    <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                      📊 {getStats(g.id).filter((s) => g.stats[s.key]).map((s) => `${s.label} ${g.stats[s.key]}`).join(' · ')}
                    </div>
                  )}
                </div>
                <RankBadge rank={g.rank} size="sm" />
              </div>
            )
          })}
        </section>

        <section>
          <div className="player-card__section-title">Vibe Score</div>
          <div className="vibe">
            <div className="vibe__head">
              <span className="vibe__score" style={{ color: vibeColor }}>{vibe}</span>
              <span className="vibe__label">{vibeLabel}</span>
              <span className="vibe__tox">🧪 Toxicity: {toxicity}</span>
            </div>
            <div className="vibe__bar">
              <div className="vibe__fill" style={{ width: `${vibe}%`, color: vibeColor, background: vibeColor }} />
            </div>
            {player.commends?.length > 0 && (
              <div className="chip-group" style={{ marginTop: 10 }}>
                {player.commends.map((c) => <span className="chip" key={c}>🏅 {c}</span>)}
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="player-card__section-title">Availability</div>
          <div className="chip-group">
            {player.availability.map((a) => (
              <span className="chip" key={a}>🕐 {a}</span>
            ))}
          </div>
        </section>

        <section>
          <div className="player-card__section-title">Playstyle</div>
          <div className="chip-group">
            {player.playstyles.map((s) => (
              <span className="chip chip--active" key={s}>{s}</span>
            ))}
          </div>
        </section>

        <p className="player-card__bio">“{player.bio}”</p>
      </div>
    </article>
  )
}
