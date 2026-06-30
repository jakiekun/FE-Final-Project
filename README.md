# 🎮 Duoz — Tinder for Gamers

> Find your perfect duo by game, verified rank, availability and vibe — no random lobbies, no toxic teammates.

Front-End final project. A swipe app that matches competitive gamers.

**Problem:** Competitive gamers struggle to find good teammates that match their rank, availability and playstyle.
**Solution:** A swipe app that matches players — with real rank verification and toxic-player filtering.

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | **Vite + React** (JavaScript) |
| Routing | React Router |
| Backend + DB | Supabase _(wired up next)_ |
| Deploy | **Vercel** (Frontend) + Supabase Cloud |
| Source Control | GitHub |

> The frontend currently runs on **mock data** (`src/data/`). The backend layer (Supabase Auth, DB, Realtime) is connected next — see `src/lib/supabaseClient.js`.

## 🚀 Run locally

```bash
npm install      # install dependencies
npm run dev      # dev server -> http://localhost:5173
npm run build    # production build (dist/)
npm run preview  # preview the production build
```

## 🌐 Deployment (Vercel)

The app is deployed on Vercel. Vercel auto-detects the Vite framework — no extra config is needed beyond `vercel.json` (an SPA rewrite so client-side routes work on refresh/deep links). Every push to `main` triggers an automatic production deploy.

## 🗺️ Site Map

| Public | Authenticated | Admin |
|--------|---------------|-------|
| Home (landing) | Onboarding (build profile) | Admin (manage reports) |
| Login | Swipe / Discover | |
| Register | Matches | |
| Forgot Password | Chat (list + thread) | |
| | Profile · Settings · Rate Player | |

## 🎨 Design System

Dark mode, neon / cyberpunk gaming aesthetic.

| Role | Color |
|------|-------|
| Primary | `#00E5C7` (cyan) |
| Secondary | `#A855F7` (purple) |
| Accent | `#FF2D9B` (magenta) |
| Background | `#0B0E1A` |
| Surface | `#151A2E` |
| Text | `#E8ECF4` |

- **Fonts:** Orbitron (headings) · Space Grotesk (body)
- **Spacing:** multiples of 8px · **Radius:** 16px (cards/buttons), 12px (inputs)
- All tokens live in `src/index.css`. Motion utilities + the scroll-reveal system are defined there too.

## 📁 Project Structure

```
src/
├── components/   # Logo, BottomNav, PlayerCard, AppLayout, ProtectedRoute, Reveal
├── context/      # AuthContext (auth — mock, to be replaced by Supabase)
├── data/         # games, mockPlayers, mockMatches
├── lib/          # supabaseClient (placeholder)
├── pages/        # all screens
├── App.jsx       # routing
├── main.jsx      # entry point
└── index.css     # design tokens + motion system
```

## ✅ Implemented features (v1 — Must)

- [x] Sign up & log in (mock auth + protected routes)
- [x] Build profile (Onboarding — games, rank, availability, playstyle)
- [x] Swipe & match (drag + Like/Skip + Match screen)
- [x] Chat between matched players
- [x] Rate players after a match (anti-toxicity) + admin panel
- [x] Animated neon brand logo + motion across the site

## 🔜 Next steps

- [ ] Connect Supabase (Auth, Database, Storage, Realtime chat)
- [ ] Real rank verification via Riot API (Edge Function)
- [ ] Advanced filters

---

_Built as part of the course “Building an AI-guided Full-Stack App.”_
