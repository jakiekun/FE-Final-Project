import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getGame } from '../data/games.js'
import './app.css'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const p = user?.profile

  const avatar = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(user?.name || 'me')}&backgroundColor=151a2e`

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
              <span className="game-row__name"><span style={{ fontSize: 18 }}>{game?.emoji}</span>{game?.name}</span>
              <span className="badge badge--rank">{g.rank}</span>
            </div>
          )
        }) : <p className="muted">No games selected.</p>}
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
