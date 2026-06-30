import { useNavigate } from 'react-router-dom'
import './info.css'

const FAQ = [
  { q: 'What is Duoz?', a: 'Duoz is a swipe app that matches competitive gamers by game, verified rank, availability and playstyle — so you can find a stable duo instead of random lobbies.' },
  { q: 'How does matching work?', a: 'Swipe right to DUO UP or left to DODGE. When two players DUO UP on each other it’s a Match, and a chat opens so you can squad up.' },
  { q: 'How do I verify my rank?', a: 'In Onboarding (or Profile → Edit) connect your game account — Riot, Steam, Battle.net, PlayStation or Xbox — to earn a “Verified” badge.' },
  { q: 'How do I report a toxic player?', a: 'Open a chat (or a profile) and tap the ⚠️ Report button, choose a reason and submit. You can also flag toxicity when you rate a player after a match.' },
  { q: 'What is coaching?', a: 'Higher-ranked players offer paid 1-on-1 coaching to lower ranks. Browse coaches in the Coaching tab, filter by game, and book a session.' },
  { q: 'Is it free?', a: 'Yes — the core app (profile, swiping, matching, chat) is free. Premium features come later.' },
  { q: 'Is my data safe?', a: 'We use Supabase with Row-Level Security, and bot protection on sign-up. See our Terms & Privacy page for details.' },
]

export default function Help() {
  const navigate = useNavigate()
  return (
    <div className="info-page">
      <div className="info-head">
        <button className="btn btn--ghost" style={{ padding: 4 }} onClick={() => navigate(-1)} aria-label="Back">←</button>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Help &amp; FAQ</h1>
      </div>
      <p className="page-subtitle">Everything you need to get started.</p>

      <div className="stack" style={{ gap: 10 }}>
        {FAQ.map((item) => (
          <details className="faq-item" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>

      <p className="muted text-center" style={{ marginTop: 24, fontSize: 13 }}>
        Still stuck? Email <a href="mailto:support@duoz.app">support@duoz.app</a>
      </p>
    </div>
  )
}
