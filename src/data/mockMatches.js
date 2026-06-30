// Mock matches + chat threads. Replaced by Supabase Realtime in a later lesson.
import { MOCK_PLAYERS } from './mockPlayers.js'

const byId = (id) => MOCK_PLAYERS.find((p) => p.id === id)

export const MOCK_MATCHES = [
  {
    id: 'm1',
    player: byId('p1'),
    matchedAt: 'Today',
    messages: [
      { id: 1, from: 'them', text: 'Hey! Saw you’re Diamond — wanna grind ranked tonight?', time: '20:14' },
      { id: 2, from: 'me', text: 'For sure! I’m free from 21:00', time: '20:16' },
      { id: 3, from: 'them', text: 'Perfect, adding you now. Keep the mic on 🎧', time: '20:17' },
    ],
  },
  {
    id: 'm2',
    player: byId('p4'),
    matchedAt: 'Yesterday',
    messages: [
      { id: 1, from: 'them', text: 'Looking for a trio in Apex, are you serious about ranked?', time: '18:02' },
      { id: 2, from: 'me', text: 'Totally. What rank are you?', time: '18:30' },
    ],
  },
  {
    id: 'm3',
    player: byId('p6'),
    matchedAt: '3 days ago',
    messages: [
      { id: 1, from: 'me', text: 'Saw you’re Champion in Fortnite, respect 🔥', time: '12:40' },
    ],
  },
]

export const getMatch = (id) => MOCK_MATCHES.find((m) => m.id === id)
