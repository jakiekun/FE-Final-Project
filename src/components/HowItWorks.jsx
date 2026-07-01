import './HowItWorks.css'

// Auto-playing ~20s looped "how it works" demo (phone mockup cycling the flow).
// To use a real video instead, drop a file in /public and swap the phone for:
//   <video src="/demo.mp4" autoPlay loop muted playsInline />
const avatar = (seed) => `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}&backgroundColor=151a2e`

export default function HowItWorks() {
  return (
    <section className="hiw-section">
      <div style={{ textAlign: 'center' }}>
        <span className="hiw-badge">▶ 20-sec demo</span>
      </div>
      <h2>How does it work?</h2>
      <p className="page-subtitle text-center">From zero to duo in four steps.</p>

      <div className="hiw">
        <div className="phone" aria-label="Duoz demo">
          <div className="phone__notch" />
          <div className="phone__screen">
            {/* 1 · profile */}
            <div className="scene scene--1">
              <div className="scene__step">1 · BUILD YOUR PROFILE</div>
              <img className="scene__avatar" src={avatar('You')} alt="" />
              <div className="scene__name">You</div>
              <div className="scene__chips">
                <span className="hiw-chip">🎯 Valorant</span>
                <span className="hiw-chip">🔫 CS2</span>
                <span className="hiw-chip">⚔️ LoL</span>
              </div>
              <div className="hiw-bar"><div className="hiw-bar__fill" /></div>
              <div className="muted" style={{ fontSize: 12 }}>Games · rank · availability</div>
            </div>

            {/* 2 · swipe */}
            <div className="scene scene--2">
              <div className="scene__step">2 · SWIPE TO FIND A DUO</div>
              <div className="hiw-mini-card">
                <div className="hiw-stamp">DUO UP</div>
                <img src={avatar('NovaStrike')} alt="" />
                <div className="hiw-mini-card__name">NovaStrike</div>
                <div className="hiw-mini-card__meta">💎 Diamond · Evening</div>
              </div>
              <div className="hiw-swipe-arrows">
                <span className="nope">👈 DODGE</span>
                <span className="like">DUO UP 👉</span>
              </div>
            </div>

            {/* 3 · match */}
            <div className="scene scene--3">
              <div className="scene__step">3 · IT’S A MATCH</div>
              <div className="hiw-match-title neon-text">MATCH FOUND</div>
              <div className="hiw-match-avatars">
                <img src={avatar('You')} alt="" />
                <span aria-hidden="true">⚡</span>
                <img src={avatar('NovaStrike')} alt="" />
              </div>
              <div className="hiw-ready">✓ PARTY FORMED</div>
            </div>

            {/* 4 · chat */}
            <div className="scene scene--4">
              <div className="scene__step">4 · CHAT &amp; SQUAD UP</div>
              <div className="hiw-bubble them">Hey! Ranked tonight? 🎧</div>
              <div className="hiw-bubble me">Let’s gooo 🔥</div>
              <div className="hiw-bubble them">Adding you now 👍</div>
            </div>
          </div>
        </div>

        <ol className="hiw-steps">
          <li>Build your profile — games, rank &amp; availability</li>
          <li>Swipe to find a duo at your level</li>
          <li>A mutual DUO UP becomes a Match</li>
          <li>Chat and squad up — GLHF! 🎮</li>
        </ol>
      </div>
    </section>
  )
}
