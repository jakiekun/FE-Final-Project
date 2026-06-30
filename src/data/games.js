// Catalog of supported games + their rank ladders.
// Used by Onboarding (pick games/rank) and filters.

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
    id: 'apex',
    name: 'Apex Legends',
    emoji: '🪂',
    color: '#da292a',
    ranks: ['Rookie', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Predator'],
  },
  {
    id: 'dota2',
    name: 'Dota 2',
    emoji: '🛡️',
    color: '#c23c2a',
    ranks: ['Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'],
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    emoji: '🏗️',
    color: '#9d4dff',
    ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Elite', 'Champion', 'Unreal'],
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
