import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="center" style={{ flexDirection: 'column', minHeight: '100vh', textAlign: 'center', padding: 24 }}>
      <h1 className="neon-text" style={{ fontSize: 80 }}>404</h1>
      <p className="muted" style={{ marginBottom: 24 }}>This page probably hit GG and left.</p>
      <Link className="btn btn--primary btn--lg" to="/">Back home</Link>
    </div>
  )
}
