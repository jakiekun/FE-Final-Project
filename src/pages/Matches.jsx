import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_MATCHES } from '../data/mockMatches.js'
import { useAuth } from '../context/AuthContext.jsx'
import { fetchMatches } from '../lib/social.js'
import './app.css'

export default function Matches() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [list, setList] = useState(null)

  useEffect(() => {
    let active = true
    fetchMatches(user?.id).then((real) => { if (active) setList(real === null ? MOCK_MATCHES : real) })
    return () => { active = false }
  }, [user?.id])

  const matches = list || []

  return (
    <div className="screen">
      <h1 className="page-title">Your matches</h1>
      <p className="page-subtitle">
        {list === null ? 'Loading…' : `${matches.length} players liked you back — tap to open a chat`}
      </p>

      {list !== null && matches.length === 0 ? (
        <div className="empty-state">
          <div className="emoji">💔</div>
          <h3>No matches yet</h3>
          <p style={{ marginTop: 8 }}>Go to Discover and start swiping — a mutual DUO UP becomes a match!</p>
          <button className="btn btn--primary mt-3" onClick={() => navigate('/app/discover')}>To Discover</button>
        </div>
      ) : (
        <div className="matches-grid">
          {matches.map((m, i) => (
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
