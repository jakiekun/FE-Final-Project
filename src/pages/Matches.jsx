import { useNavigate } from 'react-router-dom'
import { MOCK_MATCHES } from '../data/mockMatches.js'
import './app.css'

export default function Matches() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <h1 className="page-title">Your matches</h1>
      <p className="page-subtitle">{MOCK_MATCHES.length} players liked you back — tap to open a chat</p>

      {MOCK_MATCHES.length === 0 ? (
        <div className="empty-state">
          <div className="emoji">💔</div>
          <h3>No matches yet</h3>
          <p style={{ marginTop: 8 }}>Go back to Discover and start swiping!</p>
          <button className="btn btn--primary mt-3" onClick={() => navigate('/app/discover')}>To Discover</button>
        </div>
      ) : (
        <div className="matches-grid">
          {MOCK_MATCHES.map((m, i) => (
            <div className="match-tile" key={m.id} onClick={() => navigate(`/app/chat/${m.id}`)}>
              {i === 0 && <span className="match-tile__new">New</span>}
              <img className="match-tile__img" src={m.player.avatar} alt={m.player.name} />
              <div className="match-tile__info">
                <div className="match-tile__name">
                  {m.player.name}
                  <span className={'dot' + (m.player.online ? ' dot--online' : '')} />
                </div>
                <div className="match-tile__meta">Matched {m.matchedAt}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
