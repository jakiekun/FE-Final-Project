import { supabase } from './supabaseClient.js'
import { MOCK_PLAYERS } from '../data/mockPlayers.js'

const dicebear = (s) => `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(s || 'x')}&backgroundColor=151a2e`
const fmtTime = (iso) => {
  try {
    const d = new Date(iso)
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  } catch {
    return ''
  }
}

const isGifUrl = (s) => typeof s === 'string' && (/\.gif($|\?)/i.test(s) || /giphy\.com|tenor\.com/i.test(s))
const mapMsg = (x, myId) => {
  const base = { id: x.id, from: x.sender === myId ? 'me' : 'them', time: fmtTime(x.created_at) }
  return isGifUrl(x.body) ? { ...base, type: 'gif', url: x.body } : { ...base, type: 'text', text: x.body }
}

// map a profiles row -> the shape PlayerCard/deck expects
export function mapProfile(row) {
  return {
    id: row.id,
    real: true,
    name: row.gamertag || (row.email || 'Player').split('@')[0],
    region: row.region || null,
    online: true,
    verified: !!row.verified,
    rating: row.rating ?? 5,
    vibe: 90,
    commends: ['Friendly'],
    avatar: row.avatar || dicebear(row.gamertag || row.id),
    games: Array.isArray(row.games) ? row.games : [],
    availability: Array.isArray(row.availability) ? row.availability : [],
    playstyles: Array.isArray(row.playstyles) ? row.playstyles : [],
    bio: row.bio || '',
  }
}

// Discover deck: real profiles first, padded with demo players when few exist.
export async function fetchDiscover(myId) {
  if (!supabase) return MOCK_PLAYERS
  try {
    let q = supabase.from('profiles').select('*').limit(40)
    if (myId) q = q.neq('id', myId)
    const { data, error } = await q
    if (error) throw error
    const real = (data || []).filter((r) => Array.isArray(r.games) && r.games.length > 0).map(mapProfile)
    const pad = real.length < 5 ? MOCK_PLAYERS : []
    return [...real, ...pad]
  } catch {
    return MOCK_PLAYERS
  }
}

// Record a like/skip. Returns { matched } for real (uuid) targets.
export async function recordSwipe(myId, target, liked) {
  if (!supabase || !myId || !target?.real) return { matched: false }
  try {
    await supabase.from('swipes').upsert({ swiper: myId, target: target.id, liked }, { onConflict: 'swiper,target' })
    if (!liked) return { matched: false }
    const { data } = await supabase
      .from('matches')
      .select('id')
      .or(`and(user_a.eq.${myId},user_b.eq.${target.id}),and(user_a.eq.${target.id},user_b.eq.${myId})`)
      .limit(1)
    return { matched: !!(data && data.length) }
  } catch {
    return { matched: false }
  }
}

// Real matches for the current user (null = use mock).
export async function fetchMatches(myId) {
  if (!supabase || !myId) return null
  try {
    const { data: rows } = await supabase
      .from('matches')
      .select('*')
      .or(`user_a.eq.${myId},user_b.eq.${myId}`)
      .order('created_at', { ascending: false })
    if (!rows || rows.length === 0) return []
    const otherIds = rows.map((r) => (r.user_a === myId ? r.user_b : r.user_a))
    const { data: profs } = await supabase.from('profiles').select('*').in('id', otherIds)
    const byId = Object.fromEntries((profs || []).map((p) => [p.id, p]))
    return rows.map((r) => {
      const oid = r.user_a === myId ? r.user_b : r.user_a
      const p = byId[oid]
      return {
        id: String(r.id),
        matchId: r.id,
        real: true,
        matchedAt: 'recently',
        player: p ? mapProfile(p) : { id: oid, name: 'Player', avatar: dicebear(oid), online: false, games: [] },
        messages: [],
      }
    })
  } catch {
    return []
  }
}

// Load a single real match thread (match row + other profile + messages).
export async function fetchThread(matchId, myId) {
  if (!supabase) return null
  try {
    const { data: m } = await supabase.from('matches').select('*').eq('id', matchId).maybeSingle()
    if (!m) return null
    const oid = m.user_a === myId ? m.user_b : m.user_a
    const { data: p } = await supabase.from('profiles').select('*').eq('id', oid).maybeSingle()
    const { data: msgs } = await supabase.from('messages').select('*').eq('match_id', matchId).order('created_at')
    return {
      id: String(matchId),
      matchId,
      player: p ? mapProfile(p) : { id: oid, name: 'Player', avatar: dicebear(oid), online: false, games: [] },
      matchedAt: 'recently',
      messages: (msgs || []).map((x) => mapMsg(x, myId)),
    }
  } catch {
    return null
  }
}

export async function sendMessageDB(matchId, myId, body) {
  if (!supabase) return
  try {
    await supabase.from('messages').insert({ match_id: matchId, sender: myId, body })
  } catch {
    // ignore
  }
}

// Subscribe to new messages on a match. Returns an unsubscribe fn.
export function subscribeMessages(matchId, myId, onInsert) {
  if (!supabase) return () => {}
  const channel = supabase
    .channel(`messages:${matchId}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `match_id=eq.${matchId}` }, (payload) => {
      onInsert(mapMsg(payload.new, myId))
    })
    .subscribe()
  return () => {
    try { supabase.removeChannel(channel) } catch { /* ignore */ }
  }
}
