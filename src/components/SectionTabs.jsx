import { NavLink } from 'react-router-dom'
import './SectionTabs.css'

const tabs = [
  { to: '/app/discover', label: 'Discover', icon: '🎯' },
  { to: '/app/coaching', label: 'Coaching', icon: '🎓' },
  { to: '/app/esports', label: 'Esports', icon: '🏆' },
  { to: '/app/tournaments', label: 'Tournaments', icon: '📅' },
]

// Horizontal scrollable category nav shown on the browsing pages.
export default function SectionTabs() {
  return (
    <nav className="section-tabs" aria-label="Sections">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) => 'section-tab' + (isActive ? ' is-active' : '')}
        >
          <span aria-hidden="true">{t.icon}</span> {t.label}
        </NavLink>
      ))}
    </nav>
  )
}
