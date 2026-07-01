# 🎮 Duoz — Are you done solo queueing?

> Find your Player 2 — swipe, match, carry. A swipe app that matches competitive gamers by game, verified rank, availability & vibe. No random lobbies, no toxic teammates.

**🔗 Live:** https://duoz.vercel.app · **Repo:** https://github.com/jakiekun/FE-Final-Project

Front-End final project — an AI-guided full-stack app.

---

## 🛠️ Tech Stack (as specified in Lesson 3 — System Design)

| Layer | Technology |
|------|-----------|
| Frontend | **Vite + React** (JavaScript) |
| Routing | React Router |
| Backend + DB | **Supabase** — PostgreSQL, Auth, Realtime, Row-Level Security |
| Deploy | **Vercel** (auto-deploys) |
| Source Control | **GitHub** |
| Bot protection | Cloudflare Turnstile (env-gated) |

Auth, profiles, swipes, matches and chat run on **real Supabase** (with a safe mock fallback if env vars are absent, so the app never breaks).

## 🚀 Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

Create a `.env` (see `.env.example`) with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
Database schema: run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor.

## 🗺️ Screens (site map — Lesson 4)

| Public | Authenticated | Admin |
|--------|---------------|-------|
| Home, Login, Register, Forgot Password, Accessibility, Help, Terms | Onboarding, Discover/Swipe, Matches, Chat, Profile, Settings, Rate Player, **Academy**, Esports, Tournaments | Admin (reports) |

## ✅ Requirements coverage

**Must (Lesson 2):** ✔ player profile (games/rank/availability) · ✔ swipe & match · ✔ chat (real-time) · ✔ register & login (real auth).
**Should:** ✔ player rating + report (anti-toxicity) · ✔ filters by game · ◐ rank verification UI for Riot/Steam/Battle.net/Epic/PSN/Xbox (real API is the next step).

## ✨ Beyond v1

- **Real multiplayer:** users see each other in Discover, mutual likes create real matches, real-time chat.
- **DUOZ Academy:** coaches (book with calendar + availability), guides, training camps (live watch party), graduate path, improvement graph, challenges, leaderboard.
- **Esports** (30 orgs) · **Tournaments** (dates/countries) · **30 games** with in-game roles & stats (MMR/FACEIT/LP…).
- **Chat:** conversation levels, slash commands (`/valorant`, `/roll`, `/poll`, `/gg`), GIFs, soundboard, themes, confetti.
- **Accessibility** (WCAG 2.1 AA / IS 5568): keyboard nav, focus ring, skip link, reduce-motion & high-contrast, statement page.
- **Color themes:** Neutral / Dark / Light · animated interactive background · animated neon logo · "How it works" demo.

## 🎨 Design System (Lesson 5)

Dark neon aesthetic. Primary `#00E5C7` · Secondary `#A855F7` · Accent `#FF2D9B` · Background `#0B0E1A`.
Fonts: **Orbitron** (headings) + **Space Grotesk** (body). 8px spacing scale. All tokens in `src/index.css`.

## 📁 Structure

```
src/
├── components/   UI: Logo, PlayerCard, BottomNav, GifPicker, BookingCalendar, ThemeToggle…
├── context/      AuthContext (Supabase + mock fallback)
├── lib/          supabaseClient, social (data layer), a11y, theme
├── data/         games, mockPlayers, coaches, academy, esports, tournaments, platforms
├── pages/        all screens
└── index.css     design tokens + motion + themes
supabase/schema.sql   profiles / swipes / matches / messages + RLS + realtime + triggers
```

---

_Built as part of the course “Building an AI-guided Full-Stack App.”_
