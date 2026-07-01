import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { loadA11y, saveA11y } from '../lib/a11y.js'
import { supabase } from '../lib/supabaseClient.js'
import './app.css'

function Toggle({ on, onClick }) {
  return <button className={'toggle' + (on ? ' on' : '')} onClick={onClick} aria-pressed={on} />
}

export default function Settings() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState({ notifications: true, online: true, onlyVerified: false })
  const [a11y, setA11y] = useState(loadA11y)

  const [pwd, setPwd] = useState({ open: false, val: '', confirm: '', msg: '', ok: false, loading: false })

  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }))
  const toggleA11y = (k) => {
    const next = { ...a11y, [k]: !a11y[k] }
    setA11y(next)
    saveA11y(next)
  }

  const changePassword = async () => {
    if (pwd.val.length < 6) return setPwd((p) => ({ ...p, msg: 'Password must be at least 6 characters.', ok: false }))
    if (pwd.val !== pwd.confirm) return setPwd((p) => ({ ...p, msg: 'Passwords do not match.', ok: false }))
    setPwd((p) => ({ ...p, loading: true, msg: '' }))
    try {
      if (supabase) {
        const { error } = await supabase.auth.updateUser({ password: pwd.val })
        if (error) throw error
      } else {
        await new Promise((r) => setTimeout(r, 400))
      }
      setPwd({ open: true, val: '', confirm: '', msg: '🔒 Access key updated!', ok: true, loading: false })
    } catch (e) {
      setPwd((p) => ({ ...p, loading: false, ok: false, msg: e?.message || 'Failed to update.' }))
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="screen">
      <div className="row" style={{ gap: 6, marginBottom: 8 }}>
        <button className="btn btn--ghost" style={{ padding: 4 }} onClick={() => navigate('/app/profile')}>←</button>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Settings</h1>
      </div>

      <section className="profile-section">
        <h3>Notifications &amp; Privacy</h3>
        <div className="list-item">
          <span>🔔 New match notifications</span>
          <Toggle on={prefs.notifications} onClick={() => toggle('notifications')} />
        </div>
        <div className="list-item">
          <span>🟢 Show online status</span>
          <Toggle on={prefs.online} onClick={() => toggle('online')} />
        </div>
        <div className="list-item">
          <span>✅ Show me verified players only</span>
          <Toggle on={prefs.onlyVerified} onClick={() => toggle('onlyVerified')} />
        </div>
      </section>

      <section className="profile-section">
        <h3>Account</h3>
        <button className="list-item" onClick={() => navigate('/onboarding')}>
          <span>✏️ Edit profile &amp; games</span><span className="muted">›</span>
        </button>
        <button className="list-item" onClick={() => setPwd((p) => ({ ...p, open: true, msg: '', ok: false }))}>
          <span>🔑 Change access key (password)</span><span className="muted">›</span>
        </button>
        <button className="list-item" onClick={() => navigate('/app/discover')}>
          <span>🎯 Matching preferences</span><span className="muted">›</span>
        </button>
        <button className="list-item" onClick={() => navigate('/admin')}>
          <span>🛡️ Manage reports (Admin)</span><span className="muted">›</span>
        </button>
      </section>

      <section className="profile-section">
        <h3>♿ Accessibility</h3>
        <div className="list-item">
          <span>🌀 Reduce motion</span>
          <Toggle on={a11y.reduceMotion} onClick={() => toggleA11y('reduceMotion')} />
        </div>
        <div className="list-item">
          <span>🌗 High contrast</span>
          <Toggle on={a11y.contrast} onClick={() => toggleA11y('contrast')} />
        </div>
        <button className="list-item" onClick={() => navigate('/accessibility')}>
          <span>📄 Accessibility statement</span><span className="muted">›</span>
        </button>
      </section>

      <section className="profile-section">
        <h3>Support</h3>
        <button className="list-item" onClick={() => navigate('/help')}><span>❓ Help &amp; FAQ</span><span className="muted">›</span></button>
        <button className="list-item" onClick={() => navigate('/terms')}><span>📄 Terms &amp; Privacy</span><span className="muted">›</span></button>
      </section>

      <button className="list-item list-item__danger mt-3" onClick={handleLogout}>
        <span>🚪 Log out</span>
      </button>
      <p className="text-center muted" style={{ fontSize: 12, marginTop: 16 }}>Duoz v0.1.0</p>

      {pwd.open && (
        <div className="modal-overlay" onClick={() => setPwd((p) => ({ ...p, open: false }))}>
          <div className="card modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 4 }}>🔑 Change your access key</h3>
            <p className="muted" style={{ fontSize: 13, marginBottom: 14 }}>Set a new password to lock down your account.</p>
            {pwd.msg && (
              <div className={'auth__alert ' + (pwd.ok ? 'auth__alert--success' : 'auth__alert--error')} style={{ marginBottom: 10 }}>
                {pwd.msg}
              </div>
            )}
            {!pwd.ok && (
              <div className="stack" style={{ gap: 10 }}>
                <input className="input" type="password" placeholder="New password (min 6)" value={pwd.val}
                  onChange={(e) => setPwd((p) => ({ ...p, val: e.target.value }))} />
                <input className="input" type="password" placeholder="Confirm new password" value={pwd.confirm}
                  onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))} />
              </div>
            )}
            <div className="row mt-3" style={{ gap: 8 }}>
              <button className="btn btn--ghost" style={{ flex: 1 }} onClick={() => setPwd((p) => ({ ...p, open: false }))}>
                {pwd.ok ? 'Done' : 'Cancel'}
              </button>
              {!pwd.ok && (
                <button className="btn btn--primary" style={{ flex: 1 }} disabled={pwd.loading} onClick={changePassword}>
                  {pwd.loading ? 'Saving…' : '🔒 Lock it in'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
