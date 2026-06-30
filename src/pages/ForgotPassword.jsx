import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import './auth.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // fake send — real version calls supabase.auth.resetPasswordForEmail(email)
    await new Promise((r) => setTimeout(r, 500))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="auth">
      <Link className="btn btn--ghost auth__back" to="/login">← Back</Link>

      <div className="auth__head">
        <div className="logo-wrap"><Logo size={48} to={null} /></div>
        <h1>Reset password 🔑</h1>
        <p>We’ll email you a link to reset your password</p>
      </div>

      {sent ? (
        <div className="auth__alert auth__alert--success">
          ✓ If an account exists for <b>{email}</b>, we’ve sent it a password reset link. Check your inbox.
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" className="input" type="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <button className="btn btn--primary btn--block btn--lg mt-1" disabled={loading}>
            {loading ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      )}

      <p className="auth__foot">
        Remembered your password? <Link to="/login">Log in</Link>
      </p>
    </div>
  )
}
