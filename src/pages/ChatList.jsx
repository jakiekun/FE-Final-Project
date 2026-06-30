import { Link } from 'react-router-dom'
import { MOCK_MATCHES } from '../data/mockMatches.js'
import './app.css'

export default function ChatList() {
  return (
    <div className="screen">
      <h1 className="page-title">Chats</h1>
      <p className="page-subtitle">Coordinate a game with your matches</p>

      <div className="chat-list">
        {MOCK_MATCHES.map((m) => {
          const last = m.messages[m.messages.length - 1]
          return (
            <Link className="chat-row" to={`/app/chat/${m.id}`} key={m.id}>
              <div style={{ position: 'relative' }}>
                <img className="chat-row__avatar" src={m.player.avatar} alt={m.player.name} />
                {m.player.online && (
                  <span className="dot dot--online" style={{ position: 'absolute', bottom: 2, insetInlineEnd: 2, width: 13, height: 13, border: '2px solid var(--color-bg)' }} />
                )}
              </div>
              <div className="chat-row__body">
                <div className="chat-row__top">
                  <span className="chat-row__name">{m.player.name}</span>
                  <span className="chat-row__time">{last?.time}</span>
                </div>
                <div className="chat-row__preview">
                  {last?.from === 'me' ? 'You: ' : ''}{last?.text}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
