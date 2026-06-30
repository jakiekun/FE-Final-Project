import { useEffect, useRef } from 'react'

// Cloudflare Turnstile — bot/abuse protection for the auth forms.
// Uses your real site key from VITE_TURNSTILE_SITE_KEY when set, otherwise
// falls back to Cloudflare's public TEST key (always passes) so the demo works.
// Get a real key (free): https://dash.cloudflare.com/?to=/:account/turnstile
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'
const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

let scriptPromise = null
function loadScript() {
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = SRC
    s.async = true
    s.defer = true
    s.onload = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })
  return scriptPromise
}

export default function Turnstile({ onVerify }) {
  const elRef = useRef(null)
  const cbRef = useRef(onVerify)
  cbRef.current = onVerify
  const widgetId = useRef(null)

  useEffect(() => {
    let cancelled = false
    loadScript()
      .then(() => {
        if (cancelled || !window.turnstile || !elRef.current) return
        widgetId.current = window.turnstile.render(elRef.current, {
          sitekey: SITE_KEY,
          theme: 'dark',
          callback: (token) => cbRef.current?.(token),
          'error-callback': () => cbRef.current?.(''),
          'expired-callback': () => cbRef.current?.(''),
        })
      })
      .catch(() => {
        // If Cloudflare can't load (offline/blocked), don't lock users out.
        cbRef.current?.('cf-unavailable')
      })
    return () => {
      cancelled = true
      try {
        if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
      } catch {
        // ignore
      }
    }
  }, [])

  return <div ref={elRef} className="turnstile" />
}
