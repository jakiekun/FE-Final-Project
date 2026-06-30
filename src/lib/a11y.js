// User-controllable accessibility preferences, persisted to localStorage and
// applied as classes on <html>. Helps users who can't change OS-level settings.

const KEY = 'duoz.a11y'
export const DEFAULT_A11Y = { reduceMotion: false, contrast: false }

export function loadA11y() {
  try {
    return { ...DEFAULT_A11Y, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return { ...DEFAULT_A11Y }
  }
}

export function applyA11y(prefs) {
  const el = document.documentElement
  el.classList.toggle('a11y-reduce-motion', !!prefs.reduceMotion)
  el.classList.toggle('a11y-contrast', !!prefs.contrast)
}

export function saveA11y(prefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs))
  } catch {
    // ignore
  }
  applyA11y(prefs)
}

// Should motion be suppressed? (OS preference OR in-app toggle)
export function prefersReducedMotion() {
  try {
    if (document.documentElement.classList.contains('a11y-reduce-motion')) return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}
