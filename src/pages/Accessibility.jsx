import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'

export default function Accessibility() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-3) var(--space-2) var(--space-6)' }}>
      <div className="spread" style={{ marginBottom: 24 }}>
        <Logo size={32} variant="mark" />
        <Link className="btn btn--ghost" to="/">← Home</Link>
      </div>

      <h1 className="neon-text" style={{ fontSize: 30, marginBottom: 8 }}>Accessibility Statement</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        Duoz is committed to making the app usable by everyone, including people with disabilities.
      </p>

      <section className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 8 }}>Our standard</h3>
        <p className="muted">
          We aim to conform to <b>WCAG 2.1 Level AA</b> and the Israeli standard <b>IS 5568</b>, in line with the
          Equal Rights for Persons with Disabilities regulations.
        </p>
      </section>

      <section className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 8 }}>What we’ve done</h3>
        <ul style={{ paddingInlineStart: 20, lineHeight: 1.9, color: 'var(--color-text-dim)' }}>
          <li>Full keyboard navigation with a visible focus indicator</li>
          <li>“Skip to content” link for screen-reader & keyboard users</li>
          <li>Semantic landmarks, ARIA labels on icon buttons, and image alt text</li>
          <li>Respects the OS “reduce motion” setting — plus an in-app toggle</li>
          <li>An in-app <b>High contrast</b> mode and minimum 16px body text</li>
          <li>Color choices checked for sufficient contrast</li>
        </ul>
      </section>

      <section className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 8 }}>Accessibility settings</h3>
        <p className="muted">
          Open <b>Profile → Settings → Accessibility</b> to turn on <b>Reduce motion</b> or <b>High contrast</b> at any time.
          Your choices are saved on your device.
        </p>
      </section>

      <section className="card">
        <h3 style={{ marginBottom: 8 }}>Found a problem?</h3>
        <p className="muted">
          If you run into an accessibility barrier, contact us at <a href="mailto:support@duoz.app">support@duoz.app</a> and
          we’ll fix it as soon as possible.
        </p>
      </section>
    </div>
  )
}
