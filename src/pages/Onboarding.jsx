import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GAMES, PLAYSTYLES, TIME_SLOTS, getGame, getRankMeta, getRoles } from '../data/games.js'
import { useAuth } from '../context/AuthContext.jsx'
import RankBadge from '../components/RankBadge.jsx'
import './Onboarding.css'

const TOTAL_STEPS = 3

export default function Onboarding() {
  const { user, saveProfile } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [games, setGames] = useState({}) // { valorant: 'Diamond', ... }
  const [roles, setRoles] = useState({}) // { valorant: ['Duelist'], ... }
  const [search, setSearch] = useState('')
  const [availability, setAvailability] = useState([])
  const [playstyles, setPlaystyles] = useState([])
  const [verified, setVerified] = useState(false)
  const [verifying, setVerifying] = useState(false)

  const toggleGame = (id) => {
    setGames((prev) => {
      const next = { ...prev }
      if (id in next) delete next[id]
      else next[id] = getGame(id).ranks[0]
      return next
    })
  }
  const setRank = (id, rank) => setGames((prev) => ({ ...prev, [id]: rank }))
  const toggleRole = (gid, role) =>
    setRoles((prev) => {
      const cur = prev[gid] || []
      return { ...prev, [gid]: cur.includes(role) ? cur.filter((r) => r !== role) : [...cur, role] }
    })
  const filteredGames = GAMES.filter((g) => g.name.toLowerCase().includes(search.trim().toLowerCase()))

  const toggleIn = (list, setList, value) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const fakeVerify = async () => {
    setVerifying(true)
    await new Promise((r) => setTimeout(r, 1200)) // mimics Riot API edge function
    setVerifying(false)
    setVerified(true)
  }

  const canNext =
    (step === 1 && Object.keys(games).length > 0) ||
    (step === 2 && availability.length > 0 && playstyles.length > 0) ||
    step === 3

  const finish = () => {
    saveProfile({
      gamertag: user?.name || 'Player',
      games: Object.entries(games).map(([id, rank]) => ({ id, rank, roles: roles[id] || [] })),
      availability,
      playstyles,
      verified,
      bio: '',
      rating: 5.0,
    })
    navigate('/app/discover', { replace: true })
  }

  return (
    <div className="onb">
      <div className="onb__progress">
        <div className="onb__progress-bar" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
      </div>
      <div className="onb__step-label">Step {step} of {TOTAL_STEPS}</div>

      <div className="onb__body">
        {step === 1 && (
          <>
            <h2>Which games do you play?</h2>
            <p className="onb__hint">Search and pick your games, then set rank &amp; role in each.</p>

            <input
              className="input"
              style={{ marginBottom: 14 }}
              placeholder="🔍 Search games…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="game-grid">
              {filteredGames.map((g) => (
                <div
                  key={g.id}
                  className={'game-tile' + (g.id in games ? ' is-selected' : '')}
                  onClick={() => toggleGame(g.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleGame(g.id)}
                >
                  <span className="emoji">{g.emoji}</span>
                  {g.name}
                </div>
              ))}
              {filteredGames.length === 0 && <p className="muted">No games match “{search}”.</p>}
            </div>

            {Object.keys(games).map((id) => {
              const g = getGame(id)
              const gameRoles = getRoles(id)
              return (
                <div className="rank-picker" key={id}>
                  <label><span>{g.emoji}</span> {g.name} — pick your rank</label>
                  <div className="rank-pick-row">
                    {g.ranks.map((r) => (
                      <button
                        type="button"
                        key={r}
                        className={'rank-pick' + (games[id] === r ? ' is-active' : '')}
                        style={{ '--rank': getRankMeta(r).color }}
                        onClick={() => setRank(id, r)}
                      >
                        <RankBadge rank={r} size="sm" active={games[id] === r} />
                      </button>
                    ))}
                  </div>
                  {gameRoles.length > 0 && (
                    <>
                      <label style={{ marginTop: 4 }}>Your role(s)</label>
                      <div className="chip-group">
                        {gameRoles.map((role) => (
                          <button
                            type="button"
                            key={role}
                            className={'chip' + ((roles[id] || []).includes(role) ? ' chip--active' : '')}
                            aria-pressed={(roles[id] || []).includes(role)}
                            onClick={() => toggleRole(id, role)}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </>
        )}

        {step === 2 && (
          <>
            <h2>When and how do you play?</h2>
            <p className="onb__hint">We’ll use this to match you with players who are free when you are.</p>

            <div className="field" style={{ marginBottom: 24 }}>
              <label>Availability</label>
              <div className="chip-group">
                {TIME_SLOTS.map((t) => (
                  <button type="button" key={t}
                    className={'chip' + (availability.includes(t) ? ' chip--active' : '')}
                    aria-pressed={availability.includes(t)}
                    onClick={() => toggleIn(availability, setAvailability, t)}
                  >🕐 {t}</button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Playstyle</label>
              <div className="chip-group">
                {PLAYSTYLES.map((s) => (
                  <button type="button" key={s}
                    className={'chip' + (playstyles.includes(s) ? ' chip--active' : '')}
                    aria-pressed={playstyles.includes(s)}
                    onClick={() => toggleIn(playstyles, setPlaystyles, s)}
                  >{s}</button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Verify your rank</h2>
            <p className="onb__hint">
              Connect your game account to earn a “Verified” badge — players trust a real rank more.
            </p>

            <div className={'card verify-box' + (verified ? ' is-verified' : '')}>
              <div className="ring">{verified ? '✅' : '🎮'}</div>
              {verified ? (
                <>
                  <h3 style={{ marginBottom: 6 }}>Rank verified!</h3>
                  <p className="muted">Game account connected successfully via Riot API.</p>
                </>
              ) : (
                <>
                  <p className="muted" style={{ marginBottom: 20 }}>
                    This is optional — you can skip and connect later.
                  </p>
                  <button className="btn btn--primary" onClick={fakeVerify} disabled={verifying}>
                    {verifying ? 'Verifying…' : '🔗 Connect game account'}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="onb__nav">
        {step > 1 && (
          <button className="btn btn--secondary" onClick={() => setStep((s) => s - 1)}>Back</button>
        )}
        {step < TOTAL_STEPS ? (
          <button className="btn btn--primary btn--block" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
            Continue
          </button>
        ) : (
          <button className="btn btn--accent btn--block" onClick={finish}>
            {verified ? 'Done — let’s play! 🚀' : 'Skip & finish'}
          </button>
        )}
      </div>
    </div>
  )
}
