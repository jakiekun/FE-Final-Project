import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './app.css'

const INITIAL_REPORTS = [
  { id: 'r1', name: 'RageQuit99', reason: 'Toxic behavior in chat', count: 7, status: 'open' },
  { id: 'r2', name: 'SmurfKing', reason: 'Suspected smurfing (rank mismatch)', count: 4, status: 'open' },
  { id: 'r3', name: 'AFK_Andy', reason: 'Repeatedly abandoning games', count: 3, status: 'open' },
]

export default function Admin() {
  const navigate = useNavigate()
  const [reports, setReports] = useState(INITIAL_REPORTS)

  const act = (id, status) =>
    setReports((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)))

  const openCount = reports.filter((r) => r.status === 'open').length

  return (
    <div className="screen" style={{ maxWidth: 560, margin: '0 auto', paddingBottom: 'var(--space-4)' }}>
      <div className="row" style={{ gap: 6, marginBottom: 4 }}>
        <button className="btn btn--ghost" style={{ padding: 4 }} onClick={() => navigate('/app/settings')}>←</button>
        <h1 className="page-title" style={{ marginBottom: 0 }}>🛡️ Manage reports</h1>
      </div>
      <p className="page-subtitle">{openCount} open reports · keep the community toxicity-free</p>

      <div className="stack">
        {reports.map((r) => (
          <div className="card" key={r.id} style={{ padding: 16, opacity: r.status === 'open' ? 1 : 0.55 }}>
            <div className="spread">
              <div>
                <div className="row" style={{ gap: 8 }}>
                  <strong>{r.name}</strong>
                  <span className="badge badge--rank">{r.count} reports</span>
                </div>
                <div className="muted" style={{ fontSize: 14, marginTop: 4 }}>{r.reason}</div>
              </div>
            </div>

            {r.status === 'open' ? (
              <div className="row mt-2" style={{ gap: 8 }}>
                <button className="btn btn--secondary" style={{ flex: 1 }} onClick={() => act(r.id, 'dismissed')}>Dismiss</button>
                <button className="btn btn--accent" style={{ flex: 1 }} onClick={() => act(r.id, 'blocked')}>Block player</button>
              </div>
            ) : (
              <div className="mt-2 badge" style={{ borderColor: r.status === 'blocked' ? 'var(--color-error)' : 'var(--color-border)', color: r.status === 'blocked' ? 'var(--color-error)' : 'var(--color-text-dim)', background: 'transparent' }}>
                {r.status === 'blocked' ? '🚫 Player blocked' : '✓ Report dismissed'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
