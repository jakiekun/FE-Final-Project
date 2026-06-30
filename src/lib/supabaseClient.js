import { createClient } from '@supabase/supabase-js'

// Real Supabase client — activates only when BOTH env vars are set.
// Until then `supabase` is null and the app falls back to mock auth/data,
// so the demo never breaks.
//
// Set these in .env (local) and in Vercel → Settings → Environment Variables:
//   VITE_SUPABASE_URL=https://kserkrwlrhyalcmcshdz.supabase.co
//   VITE_SUPABASE_ANON_KEY=<your anon public key from Settings → API>

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && anonKey ? createClient(url, anonKey) : null
export const isSupabaseReady = Boolean(supabase)
