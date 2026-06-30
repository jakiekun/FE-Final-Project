import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getGame, GAMES } from '../data/games.js'
import { PLATFORMS } from '../data/platforms.js'
import RankBadge from '../components/RankBadge.jsx'
import './app.css'

export default function Profile() {
  const { user, logout, saveProfile } = useAuth()
  const navigate = useNavigate()
  const p = user?.profile

  const [clips, setClips] = useState(p?.gameplays ?? [])
  const [connections, setConnections] = useState(p?.connections ?? {})
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ title: '', game: GAMES[0].id, url: '' })

  const avatar = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(user?.name || 'me')}&backgroundColor=151a2e`
  const persist = (patch) => saveProfile({ ...(p || {}), ...patch })

  const addClip = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    const next = [...clips, { id: Date.now(), ...form }]
    setClips(next)
    persist({ gameplays: next })
    setForm({ title: '', game: GAMES[0].id, url: '' })
    setAdding(false)
  }
  const delClip = (id) => {
    const next = clips.filter((c) => c.id !== id)
    setClips(next)
    persist({ gameplays: next })
  }
  const toggleConn = (id) => {
    const next = { ...connections, [id]: !connections[id] }
    setConnections(next)
    persist({ connections: next })
  }

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="screen">
      <div className="spread">
        <h1 className="page-title" style={{ marginBottom: 0 }}>My profile</h1>
        <button className="btn btn--ghost" onClick={() => navigate('/app/settings')} aria-label="Settings">⚙️</button>
      </div>

      <div className="profile-header">
        <img src={avatar} alt={user?.name} />
        <div className="player-card__name center" style={{ justifyContent: 'center' }}>
          {user?.name}
          {p?.verified && <span className="badge badge--verified">✓ Verified</span>}
        </div>
        <div className="muted">{user?.email}</div>
        <div className="player-card__rating mt-1">★ {(p?.rating ?? 5).toFixed(1)} · Great reputation</div>
      </div>

      <button className="btn btn--secondary btn--block" onClick={() => navigate('/onboarding')}>
        ✏️ Edit profile
      </button>

      <section className="profile-section">
        <h3>Games &amp; Ranks</h3>
        {p?.games?.length ? p.games.map((g) => {
          const game = getGame(g.id)
          return (
            <div className="game-row" key={g.id}>
              <div>
                <span className="game-row__name"><span style={{ fontSize: 18 }}>{game?.emoji}</span>{game?.name}</span>
                {g.roles?.length > 0 && (
                  <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>🎭 {g.roles.join(' · ')}</div>
                )}
              </div>
              <RankBadge rank={g.rank} size="sm" />
            </div>
          )
        }) : <p className="muted">No games selected.</p>}
      </section>

      {/* ---- Game Plays ---- */}
      <section className="profile-section">
        <div className="spread"><h3 style={{ marginBottom: 0 }}>🎬 Game Plays</h3></div>
        <p className="muted" style={{ fontSize: 13, margin: '4px 0 12px' }}>Show off your best clips & highlights.</p>

        {adding && (
          <form className="card" style={{ padding: 14, marginBottom: 10 }} onSubmit={addClip}>
            <div className="stack" style={{ gap: 10 }}>
              <input className="input" placeholder="Clip title (e.g. 1v5 clutch)" value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              <select className="select" value={form.game} onChange={(e) => setForm((f) => ({ ...f, game: e.target.value }))}>
                {GAMES.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
              <input className="input" placeholder="Video link (optional — YouTube/Twitch/Medal)" value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} />
              <div className="row" style={{ gap: 8 }}>
                <button className="btn btn--primary" style={{ flex: 1 }} type="submit">Add clip</button>
                <button className="btn btn--ghost" type="button" onClick={() => setAdding(false)}>Cancel</button>
              </div>
            </div>
          </form>
        )}

        <div className="gameplay-grid">
          {clips.map((c) => {
            const game = getGame(c.game)
            const Thumb = c.url ? 'a' : 'div'
            const thumbProps = c.url ? { href: c.url, target: '_blank', rel: 'noreferrer' } : {}
            return (
              <div className="clip-card" key={c.id}>
                <button className="clip-card__del" onClick={() => delClip(c.id)} aria-label="Delete">✕</button>
                <Thumb className="clip-card__thumb" {...thumbProps}>{game?.emoji || '🎮'} ▶</Thumb>
                <div className="clip-card__title">{c.title}</div>
              </div>
            )
          })}
          <div className="clip-add" onClick={() => setAdding(true)}>
            <span style={{ fontSize: 24 }}>＋</span>
            <span>Add gameplay</span>
          </div>
        </div>
      </section>

      {/* ---- Connected accounts ---- */}
      <section className="profile-section">
        <h3>🔗 Connected accounts</h3>
        <p className="muted" style={{ fontSize: 13, margin: '-4px 0 12px' }}>Link platforms to verify ranks and import friends.</p>
        {PLATFORMS.map((pl) => (
          <div className="connect-row" key={pl.id}>
            <div className="connect-icon" style={{ background: pl.color }}>{pl.icon}</div>
            <div className="connect-row__body">
              <div className="connect-row__name">{pl.name}</div>
              <div className="connect-row__desc">{pl.desc}</div>
            </div>
            <button
              className={'btn ' + (connections[pl.id] ? 'btn--secondary' : 'btn--primary')}
              style={{ padding: '8px 14px', fontSize: 13 }}
              onClick={() => toggleConn(pl.id)}
            >
              {connections[pl.id] ? 'Connected ✓' : 'Connect'}
            </button>
          </div>
        ))}
      </section>

      {p?.availability?.length > 0 && (
        <section className="profile-section">
          <h3>Availability</h3>
          <div className="chip-group">
            {p.availability.map((a) => <span className="chip" key={a}>🕐 {a}</span>)}
          </div>
        </section>
      )}

      {p?.playstyles?.length > 0 && (
        <section className="profile-section">
          <h3>Playstyle</h3>
          <div className="chip-group">
            {p.playstyles.map((s) => <span className="chip chip--active" key={s}>{s}</span>)}
          </div>
        </section>
      )}

      <button className="btn btn--ghost btn--block mt-4" style={{ color: 'var(--color-error)' }} onClick={handleLogout}>
        Log out
      </button>
    </div>
  )
}
