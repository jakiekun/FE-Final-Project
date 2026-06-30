import { getGame } from '../data/games.js'
import RankBadge from './RankBadge.jsx'
import './PlayerCard.css'

// A single player profile card shown in the swipe deck.
// `verdict` ('like' | 'nope' | null) drives the overlay stamp while dragging.
export default function PlayerCard({ player, verdict = null }) {
  if (!player) return null

  return (
    <article className="player-card">
      <div
        className="player-card__stamp player-card__stamp--like"
        style={{ opacity: verdict === 'like' ? 1 : 0 }}
      >
        LIKE
      </div>
      <div
        className="player-card__stamp player-card__stamp--nope"
        style={{ opacity: verdict === 'nope' ? 1 : 0 }}
      >
        NOPE
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
                <span className="game-row__name">
                  <span style={{ fontSize: 18 }}>{game?.emoji}</span>
                  {game?.name}
                </span>
                <RankBadge rank={g.rank} size="sm" />
              </div>
            )
          })}
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
