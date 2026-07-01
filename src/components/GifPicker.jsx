import { useEffect, useState } from 'react'

// Giphy public demo key — fine for a project/demo (rate-limited).
const GIPHY_KEY = 'dc6zaTOxFJmzC'
const CHIPS = ['gaming', 'gg', 'pog', 'victory', 'rage quit', 'clutch', 'noob', 'lol']

export default function GifPicker({ onPick, onClose }) {
  const [q, setQ] = useState('gaming')
  const [term, setTerm] = useState('gaming')
  const [gifs, setGifs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(false)
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(term)}&limit=18&rating=pg-13`
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return
        const items = (d.data || [])
          .map((g) => ({
            id: g.id,
            preview: g.images?.fixed_width_small?.url || g.images?.fixed_width?.url,
            full: g.images?.fixed_width?.url || g.images?.downsized?.url || g.images?.original?.url,
          }))
          .filter((g) => g.full)
        setGifs(items)
        setLoading(false)
      })
      .catch(() => {
        if (active) {
          setError(true)
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [term])

  return (
    <div className="gif-panel">
      <div className="gif-panel__head">
        <form
          style={{ flex: 1, display: 'flex', gap: 6 }}
          onSubmit={(e) => {
            e.preventDefault()
            setTerm(q.trim() || 'gaming')
          }}
        >
          <input className="input" placeholder="Search GIFs…" value={q} onChange={(e) => setQ(e.target.value)} />
          <button className="btn btn--secondary" type="submit" style={{ padding: '0 12px' }}>🔍</button>
        </form>
        <button className="btn btn--ghost" style={{ padding: 4 }} onClick={onClose} aria-label="Close">✕</button>
      </div>

      <div className="gif-chips">
        {CHIPS.map((c) => (
          <button key={c} className="quick-chip" onClick={() => { setQ(c); setTerm(c) }}>{c}</button>
        ))}
      </div>

      <div className="gif-grid">
        {loading && <div className="gif-empty">Loading GIFs…</div>}
        {error && <div className="gif-empty">Couldn’t load GIFs — try again.</div>}
        {!loading && !error && gifs.length === 0 && <div className="gif-empty">No GIFs found.</div>}
        {!loading && !error && gifs.map((g) => (
          <button key={g.id} className="gif-cell" onClick={() => onPick(g.full)}>
            <img src={g.preview} alt="gif" loading="lazy" />
          </button>
        ))}
      </div>
      <div className="gif-powered">Powered by GIPHY</div>
    </div>
  )
}
