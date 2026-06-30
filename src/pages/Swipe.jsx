import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PlayerCard from '../components/PlayerCard.jsx'
import SectionTabs from '../components/SectionTabs.jsx'
import { MOCK_PLAYERS } from '../data/mockPlayers.js'
import './Swipe.css'

const SWIPE_THRESHOLD = 110

export default function Swipe() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState({ x: 0, active: false })
  const [flyOut, setFlyOut] = useState(null) // 'left' | 'right' | null
  const [match, setMatch] = useState(null)
  const [showHint, setShowHint] = useState(() => !localStorage.getItem('duoz.swipehint'))
  const startX = useRef(0)

  const dismissHint = () => {
    setShowHint(false)
    localStorage.setItem('duoz.swipehint', '1')
  }

  const current = MOCK_PLAYERS[index]
  const next = MOCK_PLAYERS[index + 1]

  const verdict = drag.x > 40 ? 'like' : drag.x < -40 ? 'nope' : null

  // ---- pointer drag ----
  const onPointerDown = (e) => {
    if (flyOut) return
    startX.current = e.clientX
    setDrag({ x: 0, active: true })
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!drag.active) return
    setDrag({ x: e.clientX - startX.current, active: true })
  }
  const onPointerUp = () => {
    if (!drag.active) return
    if (drag.x > SWIPE_THRESHOLD) decide('like')
    else if (drag.x < -SWIPE_THRESHOLD) decide('nope')
    else setDrag({ x: 0, active: false })
  }

  // ---- decide like / skip ----
  const decide = (kind) => {
    setDrag({ x: 0, active: false })
    setFlyOut(kind === 'like' ? 'right' : 'left')

    setTimeout(() => {
      // a like has a chance to become a mutual match
      if (kind === 'like' && current && Math.random() < 0.6) {
        setMatch(current)
      }
      setIndex((i) => i + 1)
      setFlyOut(null)
    }, 280)
  }

  const restart = () => setIndex(0)

  // top-card transform
  const cardStyle = () => {
    if (flyOut) {
      const dir = flyOut === 'right' ? 1 : -1
      return {
        transform: `translateX(${dir * 140}%) rotate(${dir * 18}deg)`,
        opacity: 0,
        transition: 'transform 0.28s ease, opacity 0.28s ease',
      }
    }
    const rot = drag.x / 18
    return {
      transform: `translateX(${drag.x}px) rotate(${rot}deg)`,
      transition: drag.active ? 'none' : 'transform 0.25s ease',
    }
  }

  return (
    <div className="screen swipe">
      <SectionTabs />
      <div className="swipe__header">
        <h1 className="page-title" style={{ marginBottom: 0 }}>Discover players</h1>
        <span className="swipe__filter">⚙️ All games</span>
      </div>

      <div className="deck">
        {!current ? (
          <div className="card empty-state" style={{ position: 'absolute', inset: 0 }}>
            <div className="emoji">🎉</div>
            <h3>You’ve seen everyone!</h3>
            <p style={{ margin: '8px 0 20px' }}>Check back later, or refresh the deck.</p>
            <button className="btn btn--primary" onClick={restart}>Refresh deck</button>
          </div>
        ) : (
          <>
            {next && (
              <div className="deck__card deck__card--behind">
                <PlayerCard player={next} />
              </div>
            )}
            <div
              className="deck__card"
              style={cardStyle()}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <PlayerCard player={current} verdict={verdict} />
            </div>
          </>
        )}

        {showHint && current && (
          <div className="swipe-hint" onClick={dismissHint}>
            <div className="swipe-hint__card" onClick={(e) => e.stopPropagation()}>
              <div className="swipe-hint__title neon-text">⚔️ READY CHECK</div>
              <p className="muted">Find your duo like a matchmaking accept screen:</p>
              <div className="swipe-hint__rows">
                <div className="swipe-hint__row">
                  <span className="hint-arrow nope">👈</span> Swipe <b className="nope">LEFT</b> to <b className="nope">DODGE</b>
                </div>
                <div className="swipe-hint__row">
                  <span className="hint-arrow like">👉</span> Swipe <b className="like">RIGHT</b> to <b className="like">DUO UP</b>
                </div>
              </div>
              <p className="muted" style={{ fontSize: 13 }}>A mutual <b className="like">DUO UP</b> = a Match → jump into chat.</p>
              <button className="btn btn--primary btn--block" onClick={dismissHint}>GLHF — let’s go 🎮</button>
            </div>
          </div>
        )}
      </div>

      {current && (
        <div className="swipe__actions">
          <button className="swipe-btn swipe-btn--skip swipe-btn--lg" onClick={() => decide('nope')} aria-label="Skip">
            ✕
          </button>
          <button className="swipe-btn swipe-btn--like swipe-btn--lg" onClick={() => decide('like')} aria-label="Like">
            ♥
          </button>
        </div>
      )}

      {match && (
        <div className="match-overlay">
          <h1 className="neon-text animate-pop">It’s a Match! 🎮</h1>
          <p className="muted">You and {match.name} liked each other</p>
          <div className="match-overlay__avatars animate-pop">
            <img src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=me&backgroundColor=151a2e`} alt="You" />
            <img src={match.avatar} alt={match.name} />
          </div>
          <div className="stack full" style={{ maxWidth: 280 }}>
            <button className="btn btn--primary btn--lg" onClick={() => navigate('/app/chat')}>
              Send a message 💬
            </button>
            <button className="btn btn--secondary" onClick={() => setMatch(null)}>
              Keep swiping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
