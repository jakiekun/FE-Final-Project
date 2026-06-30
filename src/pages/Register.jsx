import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import './auth.css'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password })
      navigate('/onboarding', { replace: true })
    } catch {
      setError('Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      <Link className="btn btn--ghost auth__back" to="/">← Back</Link>

      <div className="auth__head">
        <div className="logo-wrap"><Logo size={48} to={null} /></div>
        <h1>Let’s create your profile 🚀</h1>
        <p>Join Duoz and find a duo at your level</p>
      </div>

      <form onSubmit={onSubmit} noValidate>
        {error && <div className="auth__alert auth__alert--error">{error}</div>}

        <div className="field">
          <label htmlFor="name">Username (Gamertag)</label>
          <input id="name" className="input" placeholder="NovaStrike" value={form.name} onChange={set('name')} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" className="input" type="email" placeholder="you@example.com"
            value={form.email} onChange={set('email')} autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" className="input" type="password" placeholder="At least 6 characters"
            value={form.password} onChange={set('password')} autoComplete="new-password" />
        </div>
        <div className="field">
          <label htmlFor="confirm">Confirm password</label>
          <input id="confirm" className="input" type="password" placeholder="••••••••"
            value={form.confirm} onChange={set('confirm')} autoComplete="new-password" />
        </div>

        <button className="btn btn--primary btn--block btn--lg mt-1" disabled={loading}>
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      <p className="auth__foot">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  )
}
