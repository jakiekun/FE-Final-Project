import { useState } from 'react'
import { GAMES } from '../data/games.js'

// A dropdown game filter. value = 'all' | gameId
export default function GameFilter({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const sel = value === 'all' ? null : GAMES.find((g) => g.id === value)
  const list = GAMES.filter((g) => g.name.toLowerCase().includes(q.trim().toLowerCase()))

  const pick = (v) => { onChange(v); setOpen(false); setQ('') }

  return (
    <div className="game-filter">
      <button className="game-filter__btn" onClick={() => setOpen((o) => !o)}>
        <span>{sel ? `${sel.emoji} ${sel.name}` : '🎮 All games'}</span>
        <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <>
          <div className="game-filter__scrim" onClick={() => setOpen(false)} />
          <div className="game-filter__panel">
            <input className="input" placeholder="Search games…" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
            <div className="game-filter__list">
              <button className={'game-filter__opt' + (value === 'all' ? ' is-active' : '')} onClick={() => pick('all')}>🎮 All games</button>
              {list.map((g) => (
                <button key={g.id} className={'game-filter__opt' + (value === g.id ? ' is-active' : '')} onClick={() => pick(g.id)}>
                  {g.emoji} {g.name}
                </button>
              ))}
              {list.length === 0 && <div className="muted" style={{ padding: 10 }}>No games match “{q}”.</div>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
