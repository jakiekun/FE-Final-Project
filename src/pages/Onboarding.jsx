import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GAMES, PLAYSTYLES, TIME_SLOTS, getGame, getRankMeta, getRoles, getStats } from '../data/games.js'
import { PLATFORMS } from '../data/platforms.js'
import { useAuth } from '../context/AuthContext.jsx'
import RankBadge from '../components/RankBadge.jsx'
import './Onboarding.css'

// which platform verifies which game's rank
const GAME_PLATFORM = {
  valorant: 'riot', lol: 'riot', tft: 'riot', wildrift: 'riot',
  cs2: 'steam', dota2: 'steam', deadlock: 'steam', naraka: 'steam', apex: 'steam', r6siege: 'steam', pubg: 'steam',
  overwatch2: 'battlenet', cod: 'battlenet', sc2: 'battlenet',
  fortnite: 'epic', rocketleague: 'epic',
  eafc: 'playstation', nba2k: 'playstation',
}

const TOTAL_STEPS = 3

export default function Onboarding() {
  const { user, saveProfile, hasProfile } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [games, setGames] = useState({}) // { valorant: 'Diamond', ... }
  const [roles, setRoles] = useState({}) // { valorant: ['Duelist'], ... }
  const [stats, setStats] = useState({}) // { dota2: { mmr: '5400' }, ... }
  const [search, setSearch] = useState('')
  const [availability, setAvailability] = useState([])
  const [playstyles, setPlaystyles] = useState([])
  const [bio, setBio] = useState('')
  const [connected, setConnected] = useState({})
  const [showGrid, setShowGrid] = useState(true)

  const toggleGame = (id) => {
    const isAdding = !(id in games)
    setGames((prev) => {
      const next = { ...prev }
      if (id in next) delete next[id]
      else next[id] = getGame(id).ranks[0]
      return next
    })
    // collapse the big list once a game is picked, so the details form is front & center
    if (isAdding) setShowGrid(false)
  }
  const setRank = (id, rank) => setGames((prev) => ({ ...prev, [id]: rank }))
  const toggleRole = (gid, role) =>
    setRoles((prev) => {
      const cur = prev[gid] || []
      return { ...prev, [gid]: cur.includes(role) ? cur.filter((r) => r !== role) : [...cur, role] }
    })
  const setStat = (gid, key, val) =>
    setStats((prev) => ({ ...prev, [gid]: { ...(prev[gid] || {}), [key]: val } }))
  const filteredGames = GAMES.filter((g) => g.name.toLowerCase().includes(search.trim().toLowerCase()))

  const toggleIn = (list, setList, value) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  // core verifiers always available, plus any matched to the chosen games, plus consoles
  const verifyPlatformIds = [
    ...new Set([
      'riot',
      'steam',
      'battlenet',
      'epic',
      ...Object.keys(games).map((id) => GAME_PLATFORM[id]).filter(Boolean),
      'playstation',
      'xbox',
    ]),
  ]
  const verifyPlatforms = verifyPlatformIds.map((pid) => PLATFORMS.find((p) => p.id === pid)).filter(Boolean)
  const toggleConnect = (pid) => setConnected((c) => ({ ...c, [pid]: !c[pid] }))
  const verified = Object.values(connected).some(Boolean)

  const canNext =
    (step === 1 && Object.keys(games).length > 0) ||
    (step === 2 && availability.length > 0 && playstyles.length > 0) ||
    step === 3

  const finish = () => {
    saveProfile({
      gamertag: user?.name || 'Player',
      games: Object.entries(games).map(([id, rank]) => ({ id, rank, roles: roles[id] || [], stats: stats[id] || {} })),
      availability,
      playstyles,
      verified,
      connections: connected,
      bio: bio.trim(),
      rating: 5.0,
    })
    // show the swipe "Ready Check" hint to this freshly-onboarded user
    try { localStorage.removeItem('duoz.swipehint') } catch { /* ignore */ }
    navigate('/app/discover', { replace: true })
  }

  return (
    <div className="onb">
      {hasProfile && (
        <div className="spread" style={{ marginBottom: 12 }}>
          <span className="muted" style={{ fontSize: 14 }}>Edit profile</span>
          <button className="btn btn--ghost" style={{ padding: 4 }} onClick={() => navigate('/app/profile')} aria-label="Close">✕</button>
        </div>
      )}
      <div className="onb__progress">
        <div className="onb__progress-bar" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
      </div>
      <div className="onb__step-label">Step {step} of {TOTAL_STEPS}</div>

      <div className="onb__body">
        {step === 1 && (
          <>
            <h2>Which games do you play?</h2>
            <p className="onb__hint">Search and pick your games, then set rank &amp; role in each.</p>

            {showGrid ? (
              <>
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

                {Object.keys(games).length > 0 && (
                  <button className="btn btn--secondary btn--block" style={{ marginBottom: 16 }} onClick={() => setShowGrid(false)}>
                    Done — set details ↓
                  </button>
                )}
              </>
            ) : (
              <button className="btn btn--secondary btn--block" style={{ marginBottom: 16 }} onClick={() => setShowGrid(true)}>
                ＋ Add / edit games ({Object.keys(games).length})
              </button>
            )}

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
                  {getStats(id).length > 0 && (
                    <>
                      <label style={{ marginTop: 4 }}>{g.name} stats (optional)</label>
                      <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                        {getStats(id).map((s) => (
                          <input
                            key={s.key}
                            className="input"
                            style={{ flex: '1 1 140px', minWidth: 130 }}
                            placeholder={`${s.label} — ${s.placeholder}`}
                            value={stats[id]?.[s.key] || ''}
                            onChange={(e) => setStat(id, s.key, e.target.value)}
                          />
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

            <div className="field" style={{ marginTop: 24 }}>
              <label>About me (optional)</label>
              <textarea
                className="textarea"
                placeholder="Tell players about your vibe, goals and schedule…"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={240}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Verify your rank</h2>
            <p className="onb__hint">
              Connect your game platforms to earn a {verified ? '' : ''}“Verified” badge. Optional — you can skip and connect later.
            </p>

            {verified && (
              <div className="auth__alert auth__alert--success" style={{ marginBottom: 14 }}>
                ✓ Rank verified! Your “Verified” badge is active.
              </div>
            )}

            <div className="stack" style={{ gap: 8 }}>
              {verifyPlatforms.map((pl) => (
                <div className="connect-row" key={pl.id}>
                  <div className="connect-icon" style={{ background: pl.color }}>{pl.icon}</div>
                  <div className="connect-row__body">
                    <div className="connect-row__name">{pl.name}</div>
                    <div className="connect-row__desc">{pl.desc}</div>
                  </div>
                  <button
                    className={'btn ' + (connected[pl.id] ? 'btn--secondary' : 'btn--primary')}
                    style={{ padding: '8px 14px', fontSize: 13 }}
                    onClick={() => toggleConnect(pl.id)}
                  >
                    {connected[pl.id] ? 'Connected ✓' : 'Connect'}
                  </button>
                </div>
              ))}
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
