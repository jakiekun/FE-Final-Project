import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMatch } from '../data/mockMatches.js'
import { getGame, getRoles } from '../data/games.js'
import { useAuth } from '../context/AuthContext.jsx'
import ReportDialog from '../components/ReportDialog.jsx'
import Confetti from '../components/Confetti.jsx'
import GifPicker from '../components/GifPicker.jsx'
import './app.css'
import './chat.css'

const LEVELS = [
  { min: 0, name: 'New Duo', icon: '🌱' },
  { min: 10, name: 'Getting to Know', icon: '🙂' },
  { min: 25, name: 'Gaming Partners', icon: '🎮' },
  { min: 50, name: 'Trusted Duo', icon: '🤝' },
  { min: 100, name: 'Legendary Duo', icon: '👑' },
]
const levelFor = (n) => LEVELS.reduce((acc, l) => (n >= l.min ? l : acc), LEVELS[0])
const nextLevel = (n) => LEVELS.find((l) => l.min > n)

const THEMES = [
  { id: 'cyberpunk', color: '#00e5c7' },
  { id: 'fantasy', color: '#e6b34a' },
  { id: 'space', color: '#6c7dff' },
  { id: 'pixel', color: '#2dd4bf' },
]
const SMART = ['Sure, let’s play 🎮', 'I’m in 10 ⏳', 'GG 🏆', 'What rank are you?']
const SOUNDS = [
  { e: '🤣', t: 'Laugh' },
  { e: '💀', t: 'Bruh' },
  { e: '🎺', t: 'Fail' },
  { e: '📯', t: 'Air Horn' },
]
const COMMANDS = [
  { cmd: '/valorant', desc: 'Share a game card' },
  { cmd: '/roll', desc: 'Roll 1–100' },
  { cmd: '/coin', desc: 'Flip a coin' },
  { cmd: '/poll', desc: 'Start a quick poll' },
  { cmd: '/gg', desc: 'GG + confetti 🎉' },
]
const REPLIES = ['Sounds good, what time?', 'Cool, adding you 👍', 'Let’s grind ranked 🔥', 'gg wp']
const now = () => {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

export default function Chat() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const match = getMatch(id)

  const [messages, setMessages] = useState(() => {
    const base = (match?.messages ?? []).map((m) => ({ ...m, type: 'text', id: uid() }))
    const extras = []
    const g = getGame(match?.player?.games?.[0]?.id)
    extras.push({
      id: uid(), type: 'icebreaker', from: 'system',
      text: g ? `You both play ${g.name} — ask about their main! 🎯` : 'Say hi and find a time to play! 👋',
    })
    if (match && /day/i.test(match.matchedAt)) extras.push({ id: uid(), type: 'nudge', from: 'system' })
    return [...extras, ...base]
  })
  const [text, setText] = useState('')
  const [theme, setTheme] = useState('cyberpunk')
  const [confetti, setConfetti] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [showGif, setShowGif] = useState(false)
  const bodyRef = useRef(null)

  const realCount = messages.filter((m) => m.from === 'me' || m.from === 'them').length
  const level = levelFor(realCount)
  const nxt = nextLevel(realCount)
  const progress = nxt ? Math.min(100, ((realCount - level.min) / (nxt.min - level.min)) * 100) : 100
  const prevLevelMin = useRef(level.min)

  const fireConfetti = () => {
    setConfetti(true)
    setTimeout(() => setConfetti(false), 1900)
  }

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  // level-up detection
  useEffect(() => {
    if (level.min > prevLevelMin.current) {
      prevLevelMin.current = level.min
      fireConfetti()
      setMessages((prev) => [...prev, { id: uid(), type: 'levelup', from: 'system', level }])
    } else {
      prevLevelMin.current = level.min
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realCount])

  if (!match) {
    return (
      <div className="screen screen--no-nav center" style={{ flexDirection: 'column', minHeight: '80vh' }}>
        <p className="muted">Conversation not found.</p>
        <button className="btn btn--secondary mt-2" onClick={() => navigate('/app/chat')}>Back to chats</button>
      </div>
    )
  }

  const push = (msg) => setMessages((prev) => [...prev, { id: uid(), time: now(), ...msg }])

  const parseCommand = (t) => {
    const [cmd, ...args] = t.slice(1).split(' ')
    const lc = cmd.toLowerCase()
    if (lc === 'roll') return { type: 'roll', from: 'me', value: 1 + Math.floor(Math.random() * 100) }
    if (lc === 'coin') return { type: 'coin', from: 'me', value: Math.random() < 0.5 ? 'Heads' : 'Tails' }
    if (lc === 'gg') { fireConfetti(); return { type: 'gg', from: 'me' } }
    if (lc === 'poll') {
      const parts = args.join(' ').split(',').map((s) => s.trim()).filter(Boolean)
      const options = (parts.length ? parts : ['Valorant', 'CS2', 'League']).map((l) => ({ label: l, votes: 0 }))
      return { type: 'poll', from: 'me', question: 'Play tonight?', options, voted: null }
    }
    const game = getGame(lc)
    if (game) {
      const mine = user?.profile?.games?.find((x) => x.id === lc)
      return {
        type: 'gamecard', from: 'me', gameId: lc,
        rank: mine?.rank || game.ranks[Math.floor(game.ranks.length * 0.7)],
        role: mine?.roles?.[0] || getRoles(lc)[0] || '—',
        server: 'EU', ready: 5 + Math.floor(Math.random() * 25),
      }
    }
    return { type: 'text', from: 'me', text: t }
  }

  const send = (raw) => {
    const t = (raw ?? text).trim()
    if (!t) return
    const isCmd = t.startsWith('/')
    const msg = isCmd ? parseCommand(t) : { type: 'text', from: 'me', text: t }
    push(msg)
    setText('')
    if (!isCmd || msg.type === 'text') {
      setTimeout(() => push({ type: 'text', from: 'them', text: REPLIES[Math.floor(Math.random() * REPLIES.length)] }), 1100)
    }
  }

  const vote = (msgId, optIdx) =>
    setMessages((prev) => prev.map((m) => {
      if (m.id !== msgId || m.voted != null) return m
      return { ...m, voted: optIdx, options: m.options.map((o, i) => (i === optIdx ? { ...o, votes: o.votes + 1 } : o)) }
    }))

  const align = (from) => (from === 'me' ? 'flex-end' : 'flex-start')

  const renderMsg = (m) => {
    switch (m.type) {
      case 'icebreaker':
        return <div className="chat-card" key={m.id}><div className="chat-card__title">🤝 Icebreaker</div><p>{m.text}</p></div>
      case 'nudge':
        return (
          <div className="chat-card chat-card--glow" key={m.id}>
            <div className="chat-card__title">👀 Been a while</div>
            <p>It’s been a few days since you played together. Set a game tonight?</p>
            <button className="btn btn--primary mt-2" onClick={() => send('Want to play tonight? 🎮')}>🎮 Invite to Play</button>
          </div>
        )
      case 'levelup':
        return (
          <div className="chat-card chat-card--glow" key={m.id}>
            <div className="chat-card__title">⭐ Level up!</div>
            <p>Your duo reached <b style={{ color: 'var(--color-secondary)' }}>{m.level.icon} {m.level.name}</b></p>
          </div>
        )
      case 'gamecard': {
        const g = getGame(m.gameId)
        return (
          <div className="bubble" style={{ alignSelf: align(m.from), maxWidth: '82%', padding: 0, background: 'none', border: 'none' }} key={m.id}>
            <div className="game-card-msg" style={{ '--game': g?.color }}>
              <div className="game-card-msg__head">{g?.emoji} {g?.name}</div>
              <div className="game-card-msg__row"><span>Rank</span><span>{m.rank}</span></div>
              <div className="game-card-msg__row"><span>Role</span><span>{m.role}</span></div>
              <div className="game-card-msg__row"><span>Server</span><span>{m.server}</span></div>
              <div className="game-card-msg__ready">🟢 Ready in {m.ready} min</div>
            </div>
            <span className="bubble__time" style={{ textAlign: align(m.from) === 'flex-end' ? 'right' : 'left' }}>{m.time}</span>
          </div>
        )
      }
      case 'roll':
        return <div className="bubble bubble--me" style={{ alignSelf: align(m.from) }} key={m.id}><span className="roll-msg">🎲 rolled <span className="num">{m.value}</span></span></div>
      case 'coin':
        return <div className="bubble bubble--me" style={{ alignSelf: align(m.from) }} key={m.id}><span className="roll-msg">🪙 <span className="num">{m.value}</span></span></div>
      case 'reaction':
        return <div style={{ alignSelf: align(m.from) }} key={m.id}><div className="reaction-msg">{m.emoji}<small>{m.label}</small></div></div>
      case 'gg':
        return <div className="bubble bubble--me gg-msg" style={{ alignSelf: align(m.from) }} key={m.id}><div className="big neon-text">GG 🏆</div></div>
      case 'poll': {
        const total = m.options.reduce((s, o) => s + o.votes, 0)
        return (
          <div className="bubble" style={{ alignSelf: align(m.from), maxWidth: '82%', background: 'var(--color-surface)', borderColor: 'var(--color-border)' }} key={m.id}>
            <div className="poll-msg">
              <div className="poll-msg__q">📊 {m.question}</div>
              {m.options.map((o, i) => (
                <button key={o.label} className={'poll-opt' + (m.voted === i ? ' voted' : '')} onClick={() => vote(m.id, i)} disabled={m.voted != null}>
                  <span className="poll-opt__bar" style={{ width: total ? `${(o.votes / total) * 100}%` : '0%' }} />
                  <span>{o.label}</span>
                  <span>{o.votes}</span>
                </button>
              ))}
            </div>
          </div>
        )
      }
      case 'gif':
        return (
          <div className="bubble gif-msg" style={{ alignSelf: align(m.from), maxWidth: '72%', padding: 4, background: 'var(--color-surface)', borderColor: 'var(--color-border)' }} key={m.id}>
            <img src={m.url} alt="gif" />
            <span className="bubble__time" style={{ padding: '0 4px' }}>{m.time}</span>
          </div>
        )
      default:
        return (
          <div key={m.id} className={'bubble ' + (m.from === 'me' ? 'bubble--me' : 'bubble--them')}>
            {m.text}
            <span className="bubble__time">{m.time}</span>
          </div>
        )
    }
  }

  const showCmd = text.startsWith('/')

  return (
    <div className={`chat-screen chat-theme-${theme}`}>
      {confetti && <Confetti />}

      <header className="chat-header">
        <button className="btn btn--ghost" style={{ padding: 4 }} onClick={() => navigate('/app/chat')} aria-label="Back">←</button>
        <img src={match.player.avatar} alt={match.player.name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="chat-header__name">{match.player.name}</div>
          <div className="chat-header__live">
            {match.player.online ? '🎮 In Match · Round 8' : 'Offline'} · <span className="chat-level-badge">{level.icon} {level.name}</span>
          </div>
        </div>
        <div className="theme-picker" role="group" aria-label="Chat theme">
          {THEMES.map((t) => (
            <button key={t.id} className={'theme-dot' + (theme === t.id ? ' is-active' : '')} style={{ background: t.color }} onClick={() => setTheme(t.id)} aria-label={t.id} />
          ))}
        </div>
        <button className="btn btn--ghost" style={{ padding: 4 }} onClick={() => navigate(`/app/rate/${match.id}`)} aria-label="Rate">★</button>
        <button className="btn btn--ghost" style={{ padding: 4 }} onClick={() => setShowReport(true)} aria-label="Report">⚠️</button>
      </header>

      <div className="chat-levelbar"><div className="chat-levelbar__fill" style={{ width: `${progress}%` }} /></div>

      {showReport && <ReportDialog name={match.player.name} onClose={() => setShowReport(false)} />}

      <div className="chat-body" ref={bodyRef}>
        <div className="text-center muted" style={{ fontSize: 12, margin: '4px 0' }}>
          You matched {match.matchedAt} · type <b>/</b> for commands
        </div>
        {messages.map(renderMsg)}
      </div>

      {/* quick actions */}
      <div className="chat-quick">
        <button className="quick-chip" onClick={() => setShowGif((v) => !v)}>🎬 GIF</button>
        {SMART.map((s) => <button key={s} className="quick-chip" onClick={() => send(s)}>{s}</button>)}
        <button className="quick-chip quick-chip--sound" onClick={() => push({ type: 'reaction', from: 'me', emoji: '👋', label: 'Wave' })}>👋</button>
        {SOUNDS.map((s) => (
          <button key={s.t} className="quick-chip quick-chip--sound" title={s.t} onClick={() => push({ type: 'reaction', from: 'me', emoji: s.e, label: s.t })}>{s.e}</button>
        ))}
      </div>

      <form className="chat-input" style={{ position: 'relative' }} onSubmit={(e) => { e.preventDefault(); send() }}>
        {showGif && (
          <GifPicker
            onPick={(url) => { push({ type: 'gif', from: 'me', url }); setShowGif(false) }}
            onClose={() => setShowGif(false)}
          />
        )}
        {showCmd && (
          <div className="cmd-menu">
            {COMMANDS.filter((c) => c.cmd.startsWith(text.toLowerCase()) || text === '/').map((c) => (
              <div key={c.cmd} className="cmd-item" onClick={() => { send(c.cmd); }}>
                <code>{c.cmd}</code><small>{c.desc}</small>
              </div>
            ))}
            <div className="cmd-item" style={{ opacity: 0.7 }}><code>/&lt;game&gt;</code><small>e.g. /cs2, /lol, /apex — game card</small></div>
          </div>
        )}
        <input className="input" placeholder="Type a message or /command…" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="send" type="submit" aria-label="Send">➤</button>
      </form>
    </div>
  )
}
