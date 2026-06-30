import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import './auth.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/app/discover'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      <Link className="btn btn--ghost auth__back" to="/">← Back</Link>

      <div className="auth__head">
        <div className="logo-wrap"><Logo size={48} to={null} /></div>
        <h1>Welcome back, gamer 👋</h1>
        <p>Log in to find your next duo</p>
      </div>

      <form onSubmit={onSubmit} noValidate>
        {error && <div className="auth__alert auth__alert--error">{error}</div>}

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" className="input" type="email" placeholder="you@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>

        <div className="field">
          <div className="auth__row-between">
            <label htmlFor="password">Password</label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <input id="password" className="input" type="password" placeholder="••••••••"
            value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </div>

        <button className="btn btn--primary btn--block btn--lg mt-1" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="auth__foot">
        Don’t have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  )
}
