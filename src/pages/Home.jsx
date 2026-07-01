import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import Reveal from '../components/Reveal.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import './Home.css'

const features = [
  { icon: '✅', title: 'Verified Rank', text: 'Connect your game account and verify your real rank — no more players lying about their level.' },
  { icon: '🛡️', title: 'Zero Toxicity', text: 'Rate players after every match. Toxic players get filtered out and the community stays friendly.' },
  { icon: '🎯', title: 'Smart Matching', text: 'Swipe on players who fit your game, rank, availability and playstyle.' },
  { icon: '💬', title: 'Instant Chat', text: 'A mutual like opens a chat — coordinate a game and start playing in minutes.' },
]

const steps = [
  { t: 'Build your profile', d: 'Pick your games, rank, availability and playstyle.' },
  { t: 'Swipe', d: 'Swipe right on players who fit you, left to skip.' },
  { t: 'Find your duo', d: 'A mutual like = a Match. Open a chat and squad up.' },
]

export default function Home() {
  const { isAuthed } = useAuth()
  const navigate = useNavigate()
  const goApp = () => navigate(isAuthed ? '/app/discover' : '/register')

  return (
    <>
      <div className="home">
        <nav className="home__nav">
          <Logo size={36} variant="mark" />
          <div className="row" style={{ gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <ThemeToggle compact />
            {isAuthed ? (
              <Link className="btn btn--primary" to="/app/discover">Open app</Link>
            ) : (
              <>
                <Link className="btn btn--ghost" to="/login">Log in</Link>
                <Link className="btn btn--secondary" to="/register">Sign up</Link>
              </>
            )}
          </div>
        </nav>

        <header className="hero">
          <div className="hero__logo animate-pop">
            <Logo size={420} variant="full" to={null} />
          </div>
          <h1 className="hero__slogan">Are you done <span className="neon-text">solo queueing?</span></h1>
          <p className="hero__tagline">Find your Player 2 — swipe, match, carry. 🎮</p>
          <p>
            Duoz matches you with a duo by game, verified rank &amp; vibe.
            No random lobbies, no toxic teammates.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary btn--lg" onClick={goApp}>Get started — free</button>
            <Link className="btn btn--secondary btn--lg" to="/login">I already have an account</Link>
          </div>

          <div className="stats">
            <div className="stat"><div className="stat__num">30</div><div className="stat__label">Games supported</div></div>
            <div className="stat"><div className="stat__num">100%</div><div className="stat__label">Verified ranks</div></div>
            <div className="stat"><div className="stat__num">0</div><div className="stat__label">Tolerance for toxicity</div></div>
          </div>
        </header>

        <Reveal><HowItWorks /></Reveal>

        <Reveal stagger className="features">
          {features.map((f) => (
            <div className="card feature" key={f.title}>
              <div className="feature__icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal>
          <section className="card card--glow home__final">
            <h2 className="neon-text" style={{ fontSize: 26, marginBottom: 8 }}>Ready to find a duo?</h2>
            <p className="muted" style={{ marginBottom: 24 }}>Join the community of gamers who play the right way.</p>
            <button className="btn btn--accent btn--lg" onClick={goApp}>Join Duoz</button>
          </section>
        </Reveal>

        <footer className="home__footer">
          <p>Duoz · Front-End final project · Built with Vite + React</p>
          <p style={{ marginTop: 6 }}><Link to="/accessibility">Accessibility statement</Link></p>
        </footer>
      </div>
    </>
  )
}
