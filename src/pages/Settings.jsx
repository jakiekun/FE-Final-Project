import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { loadA11y, saveA11y } from '../lib/a11y.js'
import './app.css'

function Toggle({ on, onClick }) {
  return <button className={'toggle' + (on ? ' on' : '')} onClick={onClick} aria-pressed={on} />
}

export default function Settings() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState({ notifications: true, online: true, onlyVerified: false })
  const [a11y, setA11y] = useState(loadA11y)

  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }))
  const toggleA11y = (k) => {
    const next = { ...a11y, [k]: !a11y[k] }
    setA11y(next)
    saveA11y(next)
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
    </div>
  )
}
