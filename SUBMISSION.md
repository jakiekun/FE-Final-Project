# 🎮 Duoz — Final Project Submission

**Duoz — "Are you done solo queueing?"** A swipe app that matches competitive gamers
by game, verified rank, availability & vibe. No random lobbies, no toxic teammates.

Course: *Building an AI-guided Full-Stack App* · Front-End Final Project.

---

## 🔗 Links

| | |
|---|---|
| 🌐 **Live app** | **https://duoz.vercel.app** |
| 💻 **GitHub** | **https://github.com/jakiekun/FE-Final-Project** |
| ▲ **Hosting** | Vercel (auto-deploys from GitHub `main`) |
| 🗄️ **Backend** | Supabase (PostgreSQL · Auth · Realtime · RLS) |

## 🔑 Demo login (or just sign up — it's instant)

```
Email:    demo@duoz.app
Password: DuozDemo2026!
```

> New sign-ups work instantly (no email confirmation). Tip: open the app on **two
> devices / accounts** to see real-time matching & chat between users.

## 🧪 How to test the full flow
1. **Log in** (demo above) or **Sign up** → build a profile (games, rank, role, availability).
2. **Discover** → swipe on real players (👉 DUO UP / 👈 DODGE).
3. A **mutual DUO UP = a Match** → open **Chat** (real-time messages + GIFs).
4. Explore **🎓 Academy**, **🏆 Esports**, **📅 Tournaments**, **⚙️ Settings** (themes, accessibility).

## 🛠️ Tech stack (per system-design)
**Vite + React** · **Supabase** (DB/Auth/Realtime) · **Vercel** · **GitHub** · Cloudflare Turnstile (bot protection).

## ✅ Requirements coverage
- **Must:** ✔ profile · ✔ swipe & match · ✔ real-time chat · ✔ real auth (register/login).
- **Should:** ✔ player rating + report (anti-toxicity) · ✔ filters · ◐ rank-verification UI (real game-API is the next step).
- **Extras:** real multiplayer, DUOZ Academy (coach booking + calendar, camps + live watch party), 30 games, accessibility (WCAG 2.1 AA), color themes, animated UI.

## 💻 Run locally
```bash
npm install
npm run dev      # http://localhost:5173
```
Env vars in `.env.example`; DB schema in `supabase/schema.sql`.

---

**Author:** jakiekun · Built with Vite + React + Supabase, deployed on Vercel.
