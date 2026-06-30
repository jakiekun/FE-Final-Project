import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

// Auth + profile. Uses real Supabase when configured (VITE_SUPABASE_* set),
// otherwise falls back to a localStorage mock so the app always works.

const AuthContext = createContext(null)
const USER_KEY = 'duoz.user'
const profileKey = (id) => `duoz.profile.${id}`

function readLocalProfile(id) {
  try {
    return JSON.parse(localStorage.getItem(profileKey(id)) || 'null')
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  // Build our user object from a Supabase auth user (+ profile row / local mirror).
  const buildUser = async (authUser) => {
    const name = authUser.user_metadata?.gamertag || authUser.email?.split('@')[0] || 'Player'
    let profile = null
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', authUser.id).maybeSingle()
      if (data && Array.isArray(data.games) && data.games.length > 0) profile = data
    } catch {
      // profiles table may not exist yet — fall back to local mirror
    }
    if (!profile) profile = readLocalProfile(authUser.id)
    return { id: authUser.id, email: authUser.email, name, profile }
  }

  useEffect(() => {
    if (supabase) {
      let active = true
      supabase.auth.getSession().then(async ({ data }) => {
        if (!active) return
        if (data.session?.user) setUser(await buildUser(data.session.user))
        setReady(true)
      })
      const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) setUser(await buildUser(session.user))
        else setUser(null)
      })
      return () => {
        active = false
        sub.subscription.unsubscribe()
      }
    }
    // ---- mock fallback ----
    try {
      const raw = localStorage.getItem(USER_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore
    }
    setReady(true)
  }, [])

  const persistMock = (u) => {
    setUser(u)
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u))
    else localStorage.removeItem(USER_KEY)
  }

  // ---- actions ----
  const login = async ({ email, password }) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      const u = await buildUser(data.user)
      setUser(u)
      return u
    }
    await new Promise((r) => setTimeout(r, 300))
    const u = { id: 'me', email, name: email.split('@')[0], profile: readLocalProfile('me') }
    persistMock(u)
    return u
  }

  const register = async ({ email, password, name }) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { gamertag: name } },
      })
      if (error) throw error
      if (data.session?.user) {
        const u = await buildUser(data.session.user)
        setUser(u)
        return { needsConfirm: false }
      }
      // email confirmation is enabled — no session yet
      return { needsConfirm: true }
    }
    await new Promise((r) => setTimeout(r, 400))
    persistMock({ id: 'me', email, name: name || email.split('@')[0], profile: null })
    return { needsConfirm: false }
  }

  const logout = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut()
      } catch {
        // ignore
      }
    }
    persistMock(null)
  }

  const saveProfile = async (profile) => {
    // optimistic local update
    setUser((prev) => (prev ? { ...prev, profile } : prev))
    if (supabase && user) {
      try {
        await supabase.from('profiles').upsert({
          id: user.id,
          email: user.email,
          gamertag: profile.gamertag || user.name,
          ...profile,
        })
      } catch {
        // table not ready — keep local mirror below
      }
      try {
        localStorage.setItem(profileKey(user.id), JSON.stringify(profile))
      } catch {
        // ignore
      }
    } else if (user) {
      const next = { ...user, profile }
      localStorage.setItem(profileKey(user.id), JSON.stringify(profile))
      localStorage.setItem(USER_KEY, JSON.stringify(next))
      setUser(next)
    }
  }

  const hasProfile = !!(user?.profile && Array.isArray(user.profile.games) && user.profile.games.length > 0)

  const value = {
    user,
    ready,
    isAuthed: !!user,
    hasProfile,
    backend: supabase ? 'supabase' : 'mock',
    login,
    register,
    logout,
    saveProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
