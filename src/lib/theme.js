// Global color theme: neutral (default) / dark / light. Applied as a class on <html>.
const KEY = 'duoz.theme'
export const THEMES = ['neutral', 'dark', 'light']

export function loadTheme() {
  try { return localStorage.getItem(KEY) || 'neutral' } catch { return 'neutral' }
}

export function applyTheme(t) {
  const el = document.documentElement
  el.classList.remove('theme-dark', 'theme-light')
  if (t === 'dark') el.classList.add('theme-dark')
  else if (t === 'light') el.classList.add('theme-light')
  // neutral = no class (the default :root tokens)
}

export function saveTheme(t) {
  try { localStorage.setItem(KEY, t) } catch { /* ignore */ }
  applyTheme(t)
}
