import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './app.css'

function Toggle({ on, onClick }) {
  return <button className={'toggle' + (on ? ' on' : '')} onClick={onClick} aria-pressed={on} />
}

export default function Settings() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState({ notifications: true, online: true, onlyVerified: false })

  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }))

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
        <h3>Support</h3>
        <button className="list-item"><span>❓ Help &amp; FAQ</span><span className="muted">›</span></button>
        <button className="list-item"><span>📄 Terms &amp; Privacy</span><span className="muted">›</span></button>
      </section>

      <button className="list-item list-item__danger mt-3" onClick={handleLogout}>
        <span>🚪 Log out</span>
      </button>
      <p className="text-center muted" style={{ fontSize: 12, marginTop: 16 }}>Duoz v0.1.0</p>
    </div>
  )
}
