// Catalog of supported games, rank ladders and in-game roles.

export const GAMES = [
  { id: 'valorant', name: 'Valorant', emoji: '🎯', color: '#ff4655',
    ranks: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'] },
  { id: 'cs2', name: 'CS2', emoji: '🔫', color: '#f0a020',
    ranks: ['Silver', 'Gold Nova', 'Master Guardian', 'DMG', 'Legendary Eagle', 'Supreme', 'Global Elite'] },
  { id: 'lol', name: 'League of Legends', emoji: '⚔️', color: '#1e9de3',
    ranks: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'] },
  { id: 'dota2', name: 'Dota 2', emoji: '🛡️', color: '#c23c2a',
    ranks: ['Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'] },
  { id: 'apex', name: 'Apex Legends', emoji: '🪂', color: '#da292a',
    ranks: ['Rookie', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Predator'] },
  { id: 'fortnite', name: 'Fortnite', emoji: '🏗️', color: '#9d4dff',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Elite', 'Champion', 'Unreal'] },
  { id: 'overwatch2', name: 'Overwatch 2', emoji: '🧡', color: '#f99e1a',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Champion', 'Top 500'] },
  { id: 'r6siege', name: 'Rainbow Six Siege', emoji: '🌈', color: '#3a7bd5',
    ranks: ['Copper', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Champion'] },
  { id: 'rocketleague', name: 'Rocket League', emoji: '🚗', color: '#1f8fff',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Champion', 'Grand Champion', 'Supersonic Legend'] },
  { id: 'cod', name: 'Call of Duty', emoji: '💥', color: '#5a6b2f',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Crimson', 'Iridescent', 'Top 250'] },
  { id: 'pubg', name: 'PUBG', emoji: '🪖', color: '#f2a900',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Conqueror'] },
  { id: 'marvelrivals', name: 'Marvel Rivals', emoji: '🦸', color: '#e23636',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Grandmaster', 'Celestial', 'Eternity', 'One Above All'] },
  { id: 'tft', name: 'Teamfight Tactics', emoji: '♟️', color: '#c89b3c',
    ranks: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'] },
  { id: 'sf6', name: 'Street Fighter 6', emoji: '🥊', color: '#ffb000',
    ranks: ['Rookie', 'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Legend'] },
  { id: 'tekken8', name: 'Tekken 8', emoji: '👊', color: '#7b2fff',
    ranks: ['Beginner', 'Garyu', 'Fujin', 'Tekken King', 'Tekken Emperor', 'Tekken God', 'God of Destruction'] },
  { id: 'overwatch_mlbb', name: 'Mobile Legends', emoji: '📱', color: '#3aa0ff',
    ranks: ['Warrior', 'Elite', 'Master', 'Grandmaster', 'Epic', 'Legend', 'Mythic', 'Mythical Glory'] },
  { id: 'honorofkings', name: 'Honor of Kings', emoji: '👑', color: '#e0b34a',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'King', 'Glory King'] },
  { id: 'eafc', name: 'EA FC', emoji: '⚽', color: '#19c37d',
    ranks: ['Division 10', 'Division 7', 'Division 5', 'Division 3', 'Division 1', 'Elite'] },
  { id: 'freefire', name: 'Free Fire', emoji: '🔥', color: '#ff7a00',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Heroic', 'Grandmaster'] },
  { id: 'brawlstars', name: 'Brawl Stars', emoji: '⭐', color: '#ffcc00',
    ranks: ['Bronze', 'Silver', 'Gold', 'Diamond', 'Mythic', 'Legendary', 'Masters', 'Pro'] },
]

// In-game roles / positions per game (researched).
export const GAME_ROLES = {
  dota2: ['Carry (1)', 'Mid (2)', 'Offlane (3)', 'Soft Support (4)', 'Hard Support (5)'],
  lol: ['Top', 'Jungle', 'Mid', 'Bot / ADC', 'Support'],
  valorant: ['Duelist', 'Initiator', 'Controller', 'Sentinel', 'IGL'],
  cs2: ['AWPer', 'Rifler', 'Entry Fragger', 'IGL', 'Support', 'Lurker'],
  apex: ['Fragger', 'IGL', 'Support', 'Anchor'],
  overwatch2: ['Tank', 'DPS', 'Support'],
  r6siege: ['Entry', 'Support', 'Anchor', 'Roamer', 'IGL'],
  rocketleague: ['Striker', 'Midfield', 'Goalkeeper'],
  cod: ['Slayer', 'Objective / Anchor', 'Support', 'IGL'],
  pubg: ['IGL', 'Fragger', 'Support', 'Sniper'],
  marvelrivals: ['Vanguard (Tank)', 'Duelist (DPS)', 'Strategist (Support)'],
  honorofkings: ['Jungle', 'Mid', 'Clash Lane', 'Farm Lane', 'Roam'],
  overwatch_mlbb: ['Gold Lane', 'EXP Lane', 'Mid Lane', 'Jungle', 'Roam'],
}

export const PLAYSTYLES = [
  'Competitive', 'Casual', 'Ranked Grind', 'IGL / Leader',
  'Support', 'Aggressive', 'Quiet & Focused', 'Social & Chatty',
]

export const TIME_SLOTS = ['Morning', 'Noon', 'Afternoon', 'Evening', 'Night']

export const getGame = (id) => GAMES.find((g) => g.id === id)
export const getRoles = (id) => GAME_ROLES[id] || []

// --------------------------------------------------------------------------
// Rank metadata — tier color, fallback icon, and a 0–10 tier level used to
// render game-like medal emblems (wings/stars scale with tier).
// --------------------------------------------------------------------------
const RANK_RULES = [
  { re: /(radiant|challenger|unreal|conqueror|one above all|supersonic|top 250|top 500|global elite|eternity|glory|god of destruction|mythical|elite$)/i, color: '#ffd24d', icon: '✨', tier: 10 },
  { re: /(immortal|grandmaster|celestial|legend|tekken god|heroic|king)/i, color: '#ff2d9b', icon: '👑', tier: 9 },
  { re: /(master|supreme|champion|mythic|emperor)/i, color: '#a855f7', icon: '🔮', tier: 8 },
  { re: /(ascendant|divine|crimson|fujin|epic)/i, color: '#14b8a6', icon: '🔺', tier: 7 },
  { re: /(diamond|dmg|iridescent|tekken king)/i, color: '#6bd6ff', icon: '💎', tier: 6 },
  { re: /emerald/i, color: '#2ecc71', icon: '🟢', tier: 5 },
  { re: /(platinum|garyu)/i, color: '#2dd4bf', icon: '💠', tier: 4 },
  { re: /(gold|legendary eagle|ancient|archon|division 3|division 1)/i, color: '#ffcf4d', icon: '🥇', tier: 3 },
  { re: /(silver|crusader|guardian|elite|division 5)/i, color: '#c7ccd6', icon: '🥈', tier: 2 },
  { re: /(bronze|herald|nova|warrior|division 7)/i, color: '#cd7f32', icon: '🥉', tier: 1 },
  { re: /(iron|copper|rookie|beginner|division 10)/i, color: '#8a8f9c', icon: '⚙️', tier: 0 },
]

export function getRankMeta(rank) {
  if (!rank) return { color: '#8a8f9c', icon: '🎮', tier: 0 }
  for (const r of RANK_RULES) if (r.re.test(rank)) return { color: r.color, icon: r.icon, tier: r.tier }
  return { color: 'var(--color-primary)', icon: '🎮', tier: 3 }
}
