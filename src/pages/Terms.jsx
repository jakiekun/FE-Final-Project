import { useNavigate } from 'react-router-dom'
import './info.css'

export default function Terms() {
  const navigate = useNavigate()
  return (
    <div className="info-page">
      <div className="info-head">
        <button className="btn btn--ghost" style={{ padding: 4 }} onClick={() => navigate(-1)} aria-label="Back">←</button>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Terms &amp; Privacy</h1>
      </div>
      <p className="page-subtitle">The short, human-readable version.</p>

      <section className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ marginBottom: 8 }}>Terms of Service</h3>
        <ul className="info-list">
          <li>You must be 16+ to use Duoz.</li>
          <li>Be respectful. Toxicity, harassment, cheating and smurfing are not allowed and may get you banned.</li>
          <li>You’re responsible for the content you post (profile, clips, messages).</li>
          <li>Duoz is provided “as is” while in active development.</li>
        </ul>
      </section>

      <section className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ marginBottom: 8 }}>Privacy</h3>
        <ul className="info-list">
          <li>We store the data you give us (account, profile, games, chat) in Supabase.</li>
          <li>Row-Level Security ensures players can only edit their own data.</li>
          <li>Connected accounts (Steam, Riot, etc.) are used only to verify rank and import basic info.</li>
          <li>We never sell your personal data.</li>
          <li>You can delete your account and data at any time.</li>
        </ul>
      </section>

      <section className="card">
        <h3 style={{ marginBottom: 8 }}>Contact</h3>
        <p className="muted">Questions about your data? Email <a href="mailto:privacy@duoz.app">privacy@duoz.app</a>.</p>
      </section>
    </div>
  )
}
