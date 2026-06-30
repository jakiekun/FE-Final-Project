import { NavLink } from 'react-router-dom'
import { MOCK_MATCHES } from '../data/mockMatches.js'
import './BottomNav.css'

const icons = {
  discover: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m13.5 8.5-5 5" /><path d="m8.5 8.5 5 5" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  matches: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A3.5 3.5 0 0 0 18.5 5c-1.76 0-3 .5-4 2-1-1.5-2.24-2-4-2A3.5 3.5 0 0 0 7 8.5c0 2.29 1.51 4.04 3 5.5l4 4Z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),
}

const items = [
  { to: '/app/discover', label: 'Discover', icon: 'discover' },
  { to: '/app/matches', label: 'Matches', icon: 'matches' },
  { to: '/app/chat', label: 'Chat', icon: 'chat', badge: MOCK_MATCHES.length },
  { to: '/app/profile', label: 'Profile', icon: 'profile' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          className={({ isActive }) => 'bottom-nav__item' + (isActive ? ' is-active' : '')}
        >
          {it.badge ? <span className="nav-badge">{it.badge}</span> : null}
          {icons[it.icon]}
          <span>{it.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
