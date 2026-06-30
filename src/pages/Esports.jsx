import { useState } from 'react'
import SectionTabs from '../components/SectionTabs.jsx'
import { ESPORTS_TEAMS } from '../data/esports.js'
import { getGame } from '../data/games.js'
import './explore.css'

export default function Esports() {
  const [following, setFollowing] = useState({})
  const toggle = (id) => setFollowing((f) => ({ ...f, [id]: !f[id] }))

  const gameLabel = (id) => (id === 'multi' ? '🌐 Multi-game' : `${getGame(id)?.emoji} ${getGame(id)?.name}`)

  return (
    <div className="screen">
      <SectionTabs />
      <h1 className="page-title">Esports</h1>
      <p className="page-subtitle">Follow the biggest orgs and their pro rosters</p>

      <div className="explore-banner reveal in-view">
        <h2>🏆 The teams that define the scene</h2>
        <p>From NIGMA and OG to Falcons and T1 — follow your favorite organizations across every title.</p>
      </div>

      <div className="team-grid">
        {ESPORTS_TEAMS.map((t) => (
          <div className="card team-card" key={t.id} style={{ '--team': t.color }}>
            <div className="spread">
              <div className="team-logo" style={{ '--team': t.color }}>{t.tag}</div>
              <button
                className={'btn ' + (following[t.id] ? 'btn--secondary' : 'btn--primary')}
                style={{ padding: '8px 14px', fontSize: 13 }}
                onClick={() => toggle(t.id)}
              >
                {following[t.id] ? 'Following ✓' : 'Follow'}
              </button>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{t.name}</div>
              <div className="team-card__followers">{gameLabel(t.game)} · {t.region} · ⭐ {t.followers}</div>
            </div>
            <div className="team-achievement">🏅 {t.achievement}</div>
            <div className="team-roster"><b style={{ color: 'var(--color-text-dim)' }}>Roster:</b> {t.roster.join(' · ')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
