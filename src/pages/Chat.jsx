import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMatch } from '../data/mockMatches.js'
import './app.css'

const REPLIES = [
  'Sounds good, what time?',
  'Cool, adding you now 👍',
  'What rank are you playing right now?',
  'Let’s grind some ranked 🔥',
]

export default function Chat() {
  const { id } = useParams()
  const navigate = useNavigate()
  const match = getMatch(id)

  const [messages, setMessages] = useState(match?.messages ?? [])
  const [text, setText] = useState('')
  const bodyRef = useRef(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  if (!match) {
    return (
      <div className="screen screen--no-nav center" style={{ flexDirection: 'column', minHeight: '80vh' }}>
        <p className="muted">Conversation not found.</p>
        <button className="btn btn--secondary mt-2" onClick={() => navigate('/app/chat')}>Back to chats</button>
      </div>
    )
  }

  const now = () => {
    const d = new Date()
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const send = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    const mine = { id: Date.now(), from: 'me', text: t, time: now() }
    setMessages((m) => [...m, mine])
    setText('')
    // simulated reply
    setTimeout(() => {
      const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)]
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'them', text: reply, time: now() }])
    }, 1100)
  }

  return (
    <div className="chat-screen">
      <header className="chat-header">
        <button className="btn btn--ghost" style={{ padding: 4 }} onClick={() => navigate('/app/chat')} aria-label="Back">
          ←
        </button>
        <img src={match.player.avatar} alt={match.player.name} />
        <div style={{ flex: 1 }}>
          <div className="chat-header__name">{match.player.name}</div>
          <div className="chat-header__status">
            {match.player.online ? '🟢 Online now' : 'Offline'}
          </div>
        </div>
        <button className="btn btn--ghost" onClick={() => navigate(`/app/rate/${match.id}`)}>★ Rate</button>
      </header>

      <div className="chat-body" ref={bodyRef}>
        <div className="text-center muted" style={{ fontSize: 12, margin: '8px 0' }}>
          You matched {match.matchedAt} · say hi! 👋
        </div>
        {messages.map((m) => (
          <div key={m.id} className={'bubble ' + (m.from === 'me' ? 'bubble--me' : 'bubble--them')}>
            {m.text}
            <span className="bubble__time">{m.time}</span>
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={send}>
        <input
          className="input"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="send" type="submit" aria-label="Send">➤</button>
      </form>
    </div>
  )
}
