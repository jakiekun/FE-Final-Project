import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMatch } from '../data/mockMatches.js'
import './app.css'

export default function RatePlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const match = getMatch(id)

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [toxic, setToxic] = useState(false)
  const [note, setNote] = useState('')
  const [done, setDone] = useState(false)

  const player = match?.player
  const back = () => navigate(id ? `/app/chat/${id}` : '/app/matches')

  if (done) {
    return (
      <div className="screen screen--no-nav center" style={{ flexDirection: 'column', minHeight: '90vh', textAlign: 'center' }}>
        <div style={{ fontSize: 64 }}>🙏</div>
        <h2 className="mt-2">Thanks for the rating!</h2>
        <p className="muted mt-1" style={{ maxWidth: 320 }}>
          Your rating helps keep the community friendly and filter out toxic players.
        </p>
        <button className="btn btn--primary mt-3" onClick={back}>Back</button>
      </div>
    )
  }

  return (
    <div className="screen screen--no-nav" style={{ maxWidth: 440, margin: '0 auto' }}>
      <div className="row" style={{ gap: 6, marginBottom: 16 }}>
        <button className="btn btn--ghost" style={{ padding: 4 }} onClick={back}>←</button>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Rate the match</h1>
      </div>

      <div className="card text-center">
        {player && (
          <>
            <img src={player.avatar} alt={player.name}
              style={{ width: 88, height: 88, borderRadius: '9999px', border: '2px solid var(--color-primary)', margin: '0 auto 12px', boxShadow: 'var(--glow-primary)' }} />
            <h2 style={{ fontSize: 20 }}>{player.name}</h2>
          </>
        )}
        <p className="muted">How was playing together?</p>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={'star' + (s <= (hover || rating) ? ' filled' : '')}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(s)}
            >★</span>
          ))}
        </div>

        <label className="list-item" style={{ cursor: 'pointer' }} onClick={() => setToxic((t) => !t)}>
          <span>🚩 Player was toxic / unsportsmanlike</span>
          <span className={'toggle' + (toxic ? ' on' : '')} />
        </label>

        <div className="field mt-2" style={{ textAlign: 'start' }}>
          <label>Note (optional)</label>
          <textarea className="textarea" placeholder="Tell us about the experience…" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <button className="btn btn--primary btn--block btn--lg mt-3" disabled={rating === 0} onClick={() => setDone(true)}>
          Submit rating
        </button>
      </div>
    </div>
  )
}
