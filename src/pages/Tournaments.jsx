import { useState } from 'react'
import SectionTabs from '../components/SectionTabs.jsx'
import { TOURNAMENTS } from '../data/tournaments.js'
import { getGame } from '../data/games.js'
import './explore.css'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const fmt = (iso) => {
  const [y, m, d] = iso.split('-')
  return `${MONTHS[+m - 1]} ${+d}, ${y}`
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'live', label: '🔴 Live' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'finished', label: 'Finished' },
]

export default function Tournaments() {
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? TOURNAMENTS : TOURNAMENTS.filter((t) => t.status === filter)

  return (
    <div className="screen">
      <SectionTabs />
      <h1 className="page-title">Tournaments</h1>
      <p className="page-subtitle">When & where the world’s biggest events happen</p>

      <div className="explore-banner reveal in-view">
        <h2>📅 Never miss an event</h2>
        <p>Track dates, host countries and prize pools — from the $75M Esports World Cup to your favorite title’s Worlds.</p>
      </div>

      <div className="filter-row">
        {FILTERS.map((f) => (
          <button key={f.id} className={'chip' + (filter === f.id ? ' chip--active' : '')} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="stack">
        {list.map((t) => {
          const g = t.game === 'multi' ? null : getGame(t.game)
          return (
            <div className="card tournament-card" key={t.id}>
              <div className="tournament-card__top">
                <div>
                  <span className={'status-pill status-pill--' + t.status}>
                    {t.status === 'live' && <span className="live-dot" />}
                    {t.status}
                  </span>
                  <div className="tournament-card__title mt-1">{t.name}</div>
                </div>
                <div className="prize-tag">{t.prize}</div>
              </div>

              <div className="tournament-card__meta">
                <span>{g ? `${g.emoji} ${g.name}` : '🌐 Multi-game'}</span>
                <span>📍 <b>{t.flag} {t.city}, {t.country}</b></span>
                <span>👥 {t.teams} teams</span>
              </div>

              <div className="tournament-card__meta">
                <span>🗓️ <b>{fmt(t.start)} – {fmt(t.end)}</b></span>
                <span className="badge badge--rank">Tier {t.tier}</span>
              </div>

              <p className="muted" style={{ fontSize: 13 }}>{t.note}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
