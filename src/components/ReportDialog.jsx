import { useState } from 'react'

const REASONS = [
  'Toxic / abusive behavior',
  'Cheating / hacking',
  'Smurfing (fake rank)',
  'Inappropriate profile',
  'Spam or scam',
  'Other',
]

// Reusable "report a player" modal. Self-contained; call onClose to dismiss.
export default function ReportDialog({ name = 'this player', onClose }) {
  const [reason, setReason] = useState('')
  const [done, setDone] = useState(false)

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Report ${name}`}>
      <div className="card modal" onClick={(e) => e.stopPropagation()}>
        {done ? (
          <div className="text-center">
            <div style={{ fontSize: 48 }}>🛡️</div>
            <h3 className="mt-2">Report submitted</h3>
            <p className="muted mt-1">Thanks for keeping Duoz clean — our team will review {name}.</p>
            <button className="btn btn--primary btn--block mt-3" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <h3 style={{ marginBottom: 4 }}>Report {name}</h3>
            <p className="muted" style={{ fontSize: 13, marginBottom: 14 }}>Why are you reporting this player?</p>
            <div className="stack" style={{ gap: 8 }}>
              {REASONS.map((r) => (
                <button
                  key={r}
                  className="list-item"
                  style={{ borderColor: reason === r ? 'var(--color-accent)' : undefined }}
                  aria-pressed={reason === r}
                  onClick={() => setReason(r)}
                >
                  <span>{r}</span>
                  {reason === r && <span style={{ color: 'var(--color-accent)' }}>✓</span>}
                </button>
              ))}
            </div>
            <div className="row mt-3" style={{ gap: 8 }}>
              <button className="btn btn--ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
              <button className="btn btn--accent" style={{ flex: 1 }} disabled={!reason} onClick={() => setDone(true)}>
                Submit report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
