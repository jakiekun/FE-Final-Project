import { useEffect, useRef } from 'react'

// Cloudflare Turnstile — bot/abuse protection for the auth forms.
// Renders ONLY when a real site key is configured (VITE_TURNSTILE_SITE_KEY).
// Without one we skip the widget entirely (no Cloudflare "Testing only" badge)
// and let the form proceed, so the live demo stays clean.
// Get a real key (free): https://dash.cloudflare.com/?to=/:account/turnstile
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
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
    // No real key → don't render the widget; let the form proceed.
    if (!SITE_KEY) {
      cbRef.current?.('no-captcha')
      return
    }
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
      .catch(() => cbRef.current?.('cf-unavailable'))
    return () => {
      cancelled = true
      try {
        if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
      } catch {
        // ignore
      }
    }
  }, [])

  if (!SITE_KEY) return null
  return <div ref={elRef} className="turnstile" />
}
