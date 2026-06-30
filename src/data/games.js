// Catalog of supported games + their rank ladders.
// Used by Onboarding (pick games/rank), filters, Coaching, Esports, Tournaments.

export const GAMES = [
  {
    id: 'valorant',
    name: 'Valorant',
    emoji: '🎯',
    color: '#ff4655',
    ranks: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'],
  },
  {
    id: 'cs2',
    name: 'CS2',
    emoji: '🔫',
    color: '#f0a020',
    ranks: ['Silver', 'Gold Nova', 'Master Guardian', 'DMG', 'Legendary Eagle', 'Supreme', 'Global Elite'],
  },
  {
    id: 'lol',
    name: 'League of Legends',
    emoji: '⚔️',
    color: '#1e9de3',
    ranks: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
  },
  {
    id: 'dota2',
    name: 'Dota 2',
    emoji: '🛡️',
    color: '#c23c2a',
    ranks: ['Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'],
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    emoji: '🪂',
    color: '#da292a',
    ranks: ['Rookie', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Predator'],
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    emoji: '🏗️',
    color: '#9d4dff',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Elite', 'Champion', 'Unreal'],
  },
  {
    id: 'overwatch2',
    name: 'Overwatch 2',
    emoji: '🧡',
    color: '#f99e1a',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Champion', 'Top 500'],
  },
  {
    id: 'r6siege',
    name: 'Rainbow Six Siege',
    emoji: '🌈',
    color: '#3a7bd5',
    ranks: ['Copper', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Champion'],
  },
  {
    id: 'rocketleague',
    name: 'Rocket League',
    emoji: '🚗',
    color: '#1f8fff',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Champion', 'Grand Champion', 'Supersonic Legend'],
  },
  {
    id: 'cod',
    name: 'Call of Duty',
    emoji: '💥',
    color: '#5a6b2f',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Crimson', 'Iridescent', 'Top 250'],
  },
  {
    id: 'pubg',
    name: 'PUBG',
    emoji: '🪖',
    color: '#f2a900',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Conqueror'],
  },
  {
    id: 'marvelrivals',
    name: 'Marvel Rivals',
    emoji: '🦸',
    color: '#e23636',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Grandmaster', 'Celestial', 'Eternity', 'One Above All'],
  },
  {
    id: 'tft',
    name: 'Teamfight Tactics',
    emoji: '♟️',
    color: '#c89b3c',
    ranks: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
  },
  {
    id: 'sf6',
    name: 'Street Fighter 6',
    emoji: '🥊',
    color: '#ffb000',
    ranks: ['Rookie', 'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Legend'],
  },
]

export const PLAYSTYLES = [
  'Competitive',
  'Casual',
  'Ranked Grind',
  'IGL / Leader',
  'Support',
  'Aggressive',
  'Quiet & Focused',
  'Social & Chatty',
]

export const TIME_SLOTS = ['Morning', 'Noon', 'Afternoon', 'Evening', 'Night']

export const getGame = (id) => GAMES.find((g) => g.id === id)

// --------------------------------------------------------------------------
// Rank metadata — maps any rank label to a tier color + icon, for glowing
// rank badges. Checked in order (highest tier first).
// --------------------------------------------------------------------------
const RANK_RULES = [
  { re: /(radiant|challenger|unreal|conqueror|one above all|supersonic|top 250|top 500|global elite|eternity)/i, color: '#ffd24d', icon: '✨' },
  { re: /(immortal|grandmaster|celestial|legend|god)/i, color: '#ff2d9b', icon: '👑' },
  { re: /(master|supreme|champion)/i, color: '#a855f7', icon: '🔮' },
  { re: /(ascendant|divine)/i, color: '#14b8a6', icon: '🔺' },
  { re: /diamond|dmg|crimson|iridescent/i, color: '#6bd6ff', icon: '💎' },
  { re: /emerald/i, color: '#2ecc71', icon: '🟢' },
  { re: /platinum/i, color: '#2dd4bf', icon: '💠' },
  { re: /(gold|legendary eagle|ancient|archon)/i, color: '#ffcf4d', icon: '🥇' },
  { re: /(silver|crusader|guardian)/i, color: '#c7ccd6', icon: '🥈' },
  { re: /(bronze|herald|nova)/i, color: '#cd7f32', icon: '🥉' },
  { re: /(iron|copper|rookie|beginner)/i, color: '#8a8f9c', icon: '⚙️' },
]

export function getRankMeta(rank) {
  if (!rank) return { color: '#8a8f9c', icon: '🎮' }
  for (const r of RANK_RULES) if (r.re.test(rank)) return { color: r.color, icon: r.icon }
  return { color: 'var(--color-primary)', icon: '🎮' }
}
