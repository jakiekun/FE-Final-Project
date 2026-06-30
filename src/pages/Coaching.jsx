import { useState } from 'react'
import SectionTabs from '../components/SectionTabs.jsx'
import RankBadge from '../components/RankBadge.jsx'
import { COACHES } from '../data/coaches.js'
import { getGame } from '../data/games.js'
import './explore.css'

export default function Coaching() {
  const [filter, setFilter] = useState('all')
  const [booked, setBooked] = useState(null)

  const gamesWithCoaches = [...new Set(COACHES.map((c) => c.game))]
  const list = filter === 'all' ? COACHES : COACHES.filter((c) => c.game === filter)

  return (
    <div className="screen">
      <SectionTabs />
      <h1 className="page-title">Coaching</h1>
      <p className="page-subtitle">Level up with 1-on-1 sessions from top-ranked players</p>

      <div className="explore-banner reveal in-view">
        <h2>🎓 Learn from the best</h2>
        <p>High-ranked players coach lower ranks for a fee — book a paid session, get a VOD review, and climb faster.</p>
        <button className="btn btn--secondary mt-2" onClick={() => setBooked('__become')}>Become a coach →</button>
      </div>

      {booked && (
        <div className="auth__alert auth__alert--success" style={{ marginBottom: 16 }}>
          {booked === '__become'
            ? '✓ Coach application started! We’ll verify your rank and set up your coaching profile.'
            : `✓ Session requested with ${booked}. They’ll confirm a time in chat.`}
          <button className="btn btn--ghost" style={{ padding: '2px 8px', marginInlineStart: 8 }} onClick={() => setBooked(null)}>dismiss</button>
        </div>
      )}

      <div className="filter-row">
        <button className={'chip' + (filter === 'all' ? ' chip--active' : '')} onClick={() => setFilter('all')}>All games</button>
        {gamesWithCoaches.map((id) => {
          const g = getGame(id)
          return (
            <button key={id} className={'chip' + (filter === id ? ' chip--active' : '')} onClick={() => setFilter(id)}>
              {g?.emoji} {g?.name}
            </button>
          )
        })}
      </div>

      <div className="stack">
        {list.map((c) => {
          const g = getGame(c.game)
          return (
            <div className="card coach-card" key={c.id}>
              <img className="coach-card__avatar" src={c.avatar} alt={c.name} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="coach-card__name">
                  {c.name}
                  {c.verified && <span className="badge badge--verified">✓ Verified</span>}
                </div>
                <div className="muted" style={{ fontSize: 13, margin: '2px 0 8px' }}>
                  {g?.emoji} {g?.name} · ★ {c.rating} ({c.reviews}) · {c.languages.join(', ')}
                </div>
                <div style={{ marginBottom: 8 }}><RankBadge rank={c.rank} size="sm" /></div>
                <div className="chip-group" style={{ marginBottom: 10 }}>
                  {c.specialties.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>
                <p className="muted" style={{ fontSize: 13, marginBottom: 12 }}>{c.bio}</p>
                <div className="spread">
                  <div className="coach-card__price"><b>${c.pricePerHour}</b><span>per hour</span></div>
                  <button className="btn btn--primary" onClick={() => setBooked(c.name)}>Book a session</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
