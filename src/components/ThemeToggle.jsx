import { useState } from 'react'
import { loadTheme, saveTheme } from '../lib/theme.js'

const OPTS = [
  { id: 'neutral', icon: '◐', label: 'Neutral' },
  { id: 'dark', icon: '🌙', label: 'Dark' },
  { id: 'light', icon: '☀️', label: 'Light' },
]

export default function ThemeToggle({ compact = false }) {
  const [theme, setTheme] = useState(loadTheme)
  const set = (t) => { setTheme(t); saveTheme(t) }
  return (
    <div className={'theme-toggle' + (compact ? ' theme-toggle--compact' : '')} role="group" aria-label="Color theme">
      {OPTS.map((o) => (
        <button
          key={o.id}
          className={'theme-toggle__btn' + (theme === o.id ? ' is-active' : '')}
          onClick={() => set(o.id)}
          title={o.label}
          aria-pressed={theme === o.id}
        >
          <span aria-hidden="true">{o.icon}</span>
          {!compact && <span>{o.label}</span>}
        </button>
      ))}
    </div>
  )
}
