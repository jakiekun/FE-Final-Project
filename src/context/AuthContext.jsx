import { createContext, useContext, useEffect, useState } from 'react'

// Mock auth using localStorage. In Lesson 7 this is swapped for Supabase Auth
// (supabase.auth.signUp / signInWithPassword / onAuthStateChange).

const AuthContext = createContext(null)

const STORAGE_KEY = 'duoz.user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  // restore session on load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore corrupt storage
    }
    setReady(true)
  }, [])

  const persist = (u) => {
    setUser(u)
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    else localStorage.removeItem(STORAGE_KEY)
  }

  // --- fake async to mimic a real network call ---
  const login = async ({ email }) => {
    await new Promise((r) => setTimeout(r, 400))
    const u = { id: 'me', email, name: email.split('@')[0], profile: loadProfile() }
    persist(u)
    return u
  }

  const register = async ({ email, name }) => {
    await new Promise((r) => setTimeout(r, 500))
    const u = { id: 'me', email, name: name || email.split('@')[0], profile: null }
    persist(u)
    return u
  }

  const logout = () => persist(null)

  // profile (built during Onboarding) is stored alongside the user
  const saveProfile = (profile) => {
    localStorage.setItem('duoz.profile', JSON.stringify(profile))
    setUser((prev) => {
      const next = { ...prev, profile }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const value = {
    user,
    ready,
    isAuthed: !!user,
    hasProfile: !!user?.profile,
    login,
    register,
    logout,
    saveProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function loadProfile() {
  try {
    const raw = localStorage.getItem('duoz.profile')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
