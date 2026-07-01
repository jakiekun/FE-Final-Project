import { useState } from 'react'
import SectionTabs from '../components/SectionTabs.jsx'
import RankBadge from '../components/RankBadge.jsx'
import GameFilter from '../components/GameFilter.jsx'
import BookingCalendar from '../components/BookingCalendar.jsx'
import { COACHES } from '../data/coaches.js'
import { getGame } from '../data/games.js'
import {
  GUIDE_CATEGORIES, GUIDE_ICON, CAMPS, ACADEMY_LEADERBOARD,
  GRADUATE_STAGES, SKILLS, SKILL_MAX, CHALLENGES, GOALS,
} from '../data/academy.js'
import './explore.css'
import './academy.css'

const TABS = [
  { id: 'coaches', label: '👨‍🏫 Coaches' },
  { id: 'learn', label: '🧠 Learn' },
  { id: 'camps', label: '🏕️ Camps' },
  { id: 'path', label: '🎯 My Path' },
  { id: 'leaderboard', label: '🏆 Leaderboard' },
]
const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const next14 = () => {
  const today = new Date()
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return {
      iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      wd: WD[d.getDay()], day: d.getDay(), dd: d.getDate(), mon: MON[d.getMonth()], isToday: i === 0,
    }
  })
}

export default function Academy() {
  const [tab, setTab] = useState('coaches')
  const [gameFilter, setGameFilter] = useState('all')
  const [learnGame, setLearnGame] = useState('valorant')
  const [booking, setBooking] = useState(null)
  const [guide, setGuide] = useState(null)
  const [watch, setWatch] = useState(null)
  const [joined, setJoined] = useState({})
  const [looking, setLooking] = useState(false)
  const [goal, setGoal] = useState(GOALS[0])
  const [challenges, setChallenges] = useState(CHALLENGES.map((c) => ({ ...c })))
  const [myAvail, setMyAvail] = useState(() => {
    try { return JSON.parse(localStorage.getItem('duoz.coachAvail')) || { days: [2, 4, 6], blocked: [] } }
    catch { return { days: [2, 4, 6], blocked: [] } }
  })

  const coaches = gameFilter === 'all' ? COACHES : COACHES.filter((c) => c.game === gameFilter)
  const learnGames = Object.keys(GUIDE_CATEGORIES)
  const saveAvail = (n) => { setMyAvail(n); try { localStorage.setItem('duoz.coachAvail', JSON.stringify(n)) } catch { /* ignore */ } }

  return (
    <div className="screen">
      <SectionTabs />

      <div className="academy-hero">
        <div className="tag">🎓 DUOZ ACADEMY</div>
        <h1 className="neon-text">Learn. Improve. Climb.</h1>
        <p className="muted" style={{ fontSize: 14 }}>Coaches, guides, camps & a path from Student to Verified Coach.</p>
      </div>

      <div className="aca-tabs">
        {TABS.map((t) => (
          <button key={t.id} className={'aca-tab' + (tab === t.id ? ' is-active' : '')} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* ---------------- COACHES ---------------- */}
      {tab === 'coaches' && (
        <>
          <GameFilter value={gameFilter} onChange={setGameFilter} />
          <div className="stack">
            {coaches.map((c) => {
              const g = getGame(c.game)
              return (
                <div className="card coach-card" key={c.id}>
                  <img className="coach-card__avatar" src={c.avatar} alt={c.name} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="coach-card__name">
                      {c.name}
                      {c.verified && <span className="badge badge--verified">🎖️ Verified</span>}
                      {c.community && <span className="badge badge--community">🏅 Mentor</span>}
                    </div>
                    <div className="muted" style={{ fontSize: 13, margin: '2px 0 8px' }}>
                      {g?.emoji} {g?.name} · 🕒 {c.hours}h · ★ {c.rating} ({c.reviews})
                    </div>
                    <div style={{ marginBottom: 8 }}><RankBadge rank={c.rank} size="sm" /></div>
                    <div className="chip-group" style={{ marginBottom: 10 }}>
                      {c.specialties.map((s) => <span className="chip" key={s}>{s}</span>)}
                    </div>
                    <p className="muted" style={{ fontSize: 13, marginBottom: 10 }}>{c.bio}</p>
                    <div className="spread" style={{ gap: 10, flexWrap: 'wrap' }}>
                      <div className="coach-tiers">
                        {c.tiers.map((t) => (
                          <span key={t} className={'tier-chip ' + (t === 'Free' ? 'tier-chip--free' : 'tier-chip--paid')}>{t}</span>
                        ))}
                      </div>
                      <button className="btn btn--primary" onClick={() => setBooking(c)}>📅 Book a session</button>
                    </div>
                  </div>
                </div>
              )
            })}
            {coaches.length === 0 && (
              <div className="empty-state"><div className="emoji">🔍</div><p>No coaches for this game yet. Try another game.</p></div>
            )}
          </div>
        </>
      )}

      {/* ---------------- LEARN ---------------- */}
      {tab === 'learn' && (
        <>
          <div className="filter-row">
            {learnGames.map((id) => {
              const g = getGame(id)
              return (
                <button key={id} className={'chip' + (learnGame === id ? ' chip--active' : '')} onClick={() => setLearnGame(id)}>
                  {g?.emoji} {g?.name}
                </button>
              )
            })}
          </div>
          <div className="guide-grid">
            {GUIDE_CATEGORIES[learnGame].map((cat) => (
              <div className="card guide-card" key={cat} onClick={() => setGuide({ game: learnGame, cat })}>
                <span className="g-ico">{GUIDE_ICON[cat] || '📘'}</span>
                <b>{cat}</b>
                <small>Guide · tips & drills →</small>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ---------------- CAMPS ---------------- */}
      {tab === 'camps' && (
        <>
          <div className="explore-banner reveal in-view">
            <h2>🏕️ Training Camps</h2>
            <p>Group sessions & live events. Join a camp or drop into the watch party.</p>
          </div>
          <div className="stack">
            {CAMPS.map((camp) => {
              const g = getGame(camp.game)
              const pct = Math.round((camp.joined / camp.slots) * 100)
              const isIn = !!joined[camp.id]
              return (
                <div className="card camp-card" key={camp.id}>
                  <div className="camp-top">
                    <div>
                      {camp.live && <span className="live-badge"><span className="dot" /> LIVE · {camp.viewers}</span>}
                      <div className="camp-title mt-1">{camp.title}</div>
                      <div className="camp-meta">{g?.emoji} {g?.name} · Hosted by {camp.host} ({camp.hostRank})</div>
                    </div>
                    <div style={{ textAlign: 'end' }}>
                      <div className="prize-tag" style={{ fontSize: 15 }}>{camp.price}</div>
                      <div className="camp-meta">🗓️ {camp.day} {camp.time}</div>
                    </div>
                  </div>
                  <div className="camp-meta">{camp.joined + (isIn ? 1 : 0)}/{camp.slots} joined</div>
                  <div className="camp-slots"><div className="camp-slots__fill" style={{ width: `${pct}%` }} /></div>
                  <div className="row" style={{ gap: 8 }}>
                    <button className={'btn ' + (isIn ? 'btn--secondary' : 'btn--primary')} style={{ flex: 1 }}
                      onClick={() => setJoined((j) => ({ ...j, [camp.id]: !j[camp.id] }))}>
                      {isIn ? 'Joined ✓' : 'Join camp'}
                    </button>
                    {camp.live && (
                      <button className="btn btn--accent" style={{ flex: 1 }} onClick={() => setWatch(watch === camp.id ? null : camp.id)}>
                        {watch === camp.id ? 'Close 🔴' : '🔴 Watch Party'}
                      </button>
                    )}
                  </div>
                  {watch === camp.id && (
                    <div className="watch-embed">
                      <iframe
                        title={`${camp.title} live`}
                        src={`https://player.twitch.tv/?channel=${camp.channel}&parent=duoz.vercel.app&parent=localhost&muted=true`}
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* ---------------- MY PATH ---------------- */}
      {tab === 'path' && (
        <>
          {/* Looking to Improve */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="spread">
              <div><b>🎯 Looking to Improve</b><div className="muted" style={{ fontSize: 13 }}>Let the algorithm find coaches & partners for your goal.</div></div>
              <button className={'toggle' + (looking ? ' on' : '')} onClick={() => setLooking((v) => !v)} aria-pressed={looking} />
            </div>
            {looking && (
              <>
                <div className="book-label">My goal</div>
                <div className="chip-group">
                  {GOALS.map((gl) => <button key={gl} className={'chip' + (goal === gl ? ' chip--active' : '')} onClick={() => setGoal(gl)}>{gl}</button>)}
                </div>
                <p className="muted" style={{ fontSize: 13, marginTop: 10 }}>🔎 Now matching you with coaches, training partners & players aiming for <b>{goal}</b>.</p>
              </>
            )}
          </div>

          {/* XP row */}
          <div className="xp-row">
            <span className="xp-pill">⭐ 1,240 XP</span>
            <span className="xp-pill">🪙 350 Coins</span>
            <span className="xp-pill">🏅 Mentor</span>
          </div>

          {/* Graduate path */}
          <h3 className="profile-section" style={{ marginBottom: 8 }}>🎓 Your journey</h3>
          <div className="grad-track">
            {GRADUATE_STAGES.map((s, i) => (
              <div key={s.key} className={'grad-step' + (i === 1 ? ' is-current' : i < 1 ? ' is-done' : '')}>
                <div className="g-ico">{s.icon}</div>
                <b>{s.name}</b>
                <small>{s.desc}</small>
              </div>
            ))}
          </div>
          <p className="muted" style={{ fontSize: 13, margin: '10px 0 20px' }}>
            You’re a <b style={{ color: 'var(--color-primary)' }}>Regular Player</b>. Help 5 students to unlock <b>🏅 Mentor</b> — give back what you got. 💜
          </p>

          {/* Improvement graph */}
          <h3 className="profile-section" style={{ marginBottom: 12 }}>📈 Improvement Graph</h3>
          {SKILLS.map((s) => (
            <div className="skill-row" key={s.name}>
              <span className="skill-row__name">{s.name}</span>
              <span className="skill-bar">
                {Array.from({ length: SKILL_MAX }).map((_, i) => <span key={i} className={'skill-seg' + (i < s.value ? ' on' : '')} />)}
              </span>
            </div>
          ))}

          {/* Daily challenges */}
          <h3 className="profile-section" style={{ margin: '20px 0 12px' }}>🎯 Today’s Challenges</h3>
          {challenges.map((c) => (
            <div key={c.id} className={'challenge' + (c.done ? ' done' : '')} onClick={() => setChallenges((prev) => prev.map((x) => (x.id === c.id ? { ...x, done: !x.done } : x)))}>
              <span className="challenge__box">{c.done ? '✓' : ''}</span>
              <span>{c.text}</span>
            </div>
          ))}

          {/* Coach availability manager */}
          <h3 className="profile-section" style={{ margin: '20px 0 8px' }}>🗓️ My Coaching Availability</h3>
          <p className="muted" style={{ fontSize: 13, marginBottom: 12 }}>Pick the weekdays you coach, and block specific days you can’t take bookings.</p>
          <div className="avail-week">
            {WD.map((w, i) => (
              <button key={w} className={'avail-wd' + (myAvail.days.includes(i) ? ' on' : '')}
                onClick={() => saveAvail({ ...myAvail, days: myAvail.days.includes(i) ? myAvail.days.filter((d) => d !== i) : [...myAvail.days, i] })}>
                {w}
              </button>
            ))}
          </div>
          <div className="book-label">Block specific days</div>
          <div className="book-cal">
            {next14().map((d) => {
              const weeklyOn = myAvail.days.includes(d.day)
              const blocked = myAvail.blocked.includes(d.iso)
              const off = !weeklyOn || blocked
              return (
                <button key={d.iso} className={'book-day' + (off ? ' is-off' : '') + (blocked ? ' is-sel' : '')}
                  style={blocked ? { borderColor: 'var(--color-error)', background: 'rgba(255,77,94,.15)', boxShadow: 'none', opacity: 1 } : undefined}
                  onClick={() => weeklyOn && saveAvail({ ...myAvail, blocked: blocked ? myAvail.blocked.filter((x) => x !== d.iso) : [...myAvail.blocked, d.iso] })}
                  title={weeklyOn ? (blocked ? 'Blocked — tap to open' : 'Available — tap to block') : 'Weekday off'}>
                  <span className="book-day__wd">{d.isToday ? 'Today' : d.wd}</span>
                  <span className="book-day__dd">{d.dd}</span>
                  <span className="book-day__mon">{blocked ? '🚫' : d.mon}</span>
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* ---------------- LEADERBOARD ---------------- */}
      {tab === 'leaderboard' && (
        <>
          {[
            { key: 'coaches', title: '🎖️ Top Coaches' },
            { key: 'mentors', title: '🏅 Top Mentors' },
            { key: 'students', title: '📈 Top Students' },
          ].map((sec) => (
            <div className="lb-list" key={sec.key}>
              <h3 className="profile-section" style={{ marginBottom: 10 }}>{sec.title}</h3>
              {ACADEMY_LEADERBOARD[sec.key].map((r, i) => (
                <div className="lb-row" key={r.name}>
                  <span className="lb-rank">{i + 1}</span>
                  <div><div className="lb-name">{r.name}</div><div className="muted" style={{ fontSize: 12 }}>{r.tag}</div></div>
                  <span className="lb-score">{r.score}</span>
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      {/* modals */}
      {booking && <BookingCalendar coach={booking} onClose={() => setBooking(null)} />}
      {guide && (
        <div className="modal-overlay" onClick={() => setGuide(null)}>
          <div className="card modal" onClick={(e) => e.stopPropagation()}>
            <div className="spread"><h3>{GUIDE_ICON[guide.cat]} {guide.cat}</h3><button className="btn btn--ghost" style={{ padding: 4 }} onClick={() => setGuide(null)}>✕</button></div>
            <p className="muted" style={{ fontSize: 13, margin: '4px 0 12px' }}>{getGame(guide.game)?.name} guide</p>
            <ul style={{ paddingInlineStart: 18, lineHeight: 1.9, color: 'var(--color-text-dim)' }}>
              <li>Watch a 5-min fundamentals clip.</li>
              <li>Do the daily drill 3× before ranked.</li>
              <li>Review one replay focusing only on {guide.cat.toLowerCase()}.</li>
              <li>Book a coach if you plateau for 2 weeks.</li>
            </ul>
            <button className="btn btn--primary btn--block mt-3" onClick={() => { setGuide(null); setTab('coaches') }}>Find a coach for this</button>
          </div>
        </div>
      )}
    </div>
  )
}
