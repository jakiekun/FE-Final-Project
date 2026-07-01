// Mock player profiles for the Swipe/Discover deck.
// In Lesson 7 this will be replaced by a Supabase query.

const avatar = (seed) => `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}&backgroundColor=151a2e`

export const MOCK_PLAYERS = [
  {
    id: 'p1', name: 'NovaStrike', realName: 'Daniel', age: 19, region: 'Haifa',
    online: true, verified: true, rating: 4.8, vibe: 92, commends: ['Friendly', 'Good comms', 'Reliable'],
    avatar: avatar('NovaStrike'),
    games: [
      { id: 'valorant', rank: 'Diamond', roles: ['Duelist', 'Entry'], stats: { rr: '58', peak: 'Immortal 1' } },
      { id: 'cs2', rank: 'Legendary Eagle', roles: ['AWPer'], stats: { premier: '19,200', faceit: '9' } },
    ],
    availability: ['Evening', 'Night'],
    playstyles: ['Competitive', 'Ranked Grind', 'Aggressive'],
    bio: 'Looking for a stable Valorant duo. Climbing to Immortal this act. Mic always on.',
  },
  {
    id: 'p2', name: 'QuietAim', realName: 'Maya', age: 24, region: 'Tel Aviv',
    online: false, verified: true, rating: 4.9, vibe: 97, commends: ['Wholesome', 'Chill', 'Positive'],
    avatar: avatar('QuietAim'),
    games: [{ id: 'valorant', rank: 'Platinum', roles: ['Sentinel', 'Controller'] }],
    availability: ['Afternoon', 'Evening'],
    playstyles: ['Casual', 'Support', 'Quiet & Focused'],
    bio: 'Here to have fun, friendly lobbies only. No screaming please.',
  },
  {
    id: 'p3', name: 'MidOrFeed', realName: 'Yoav', age: 21, region: "Be'er Sheva",
    online: true, verified: false, rating: 4.2, vibe: 78, commends: ['Good comms', 'Shot-caller'],
    avatar: avatar('MidOrFeed'),
    games: [
      { id: 'lol', rank: 'Emerald', roles: ['Mid'], stats: { lp: '64' } },
      { id: 'dota2', rank: 'Ancient', roles: ['Mid (2)'], stats: { mmr: '5400' } },
    ],
    availability: ['Night'],
    playstyles: ['IGL / Leader', 'Social & Chatty'],
    bio: 'Mid laner who loves calling strats. Want a serious solo-queue partner.',
  },
  {
    id: 'p4', name: 'ApexPredatorIL', realName: 'Rotem', age: 27, region: 'Jerusalem',
    online: true, verified: true, rating: 4.6, vibe: 85, commends: ['Reliable', 'Shot-caller', 'Focused'],
    avatar: avatar('ApexPredatorIL'),
    games: [{ id: 'apex', rank: 'Master', roles: ['IGL', 'Fragger'], stats: { rp: '15,200' } }],
    availability: ['Evening', 'Night'],
    playstyles: ['Competitive', 'Aggressive', 'IGL / Leader'],
    bio: 'Apex ranked only. Looking for a permanent trio. Hit Predator twice.',
  },
  {
    id: 'p5', name: 'ChillFragger', realName: 'Eden', age: 18, region: 'Netanya',
    online: false, verified: false, rating: 4.0, vibe: 88, commends: ['Chill', 'Patient', 'Friendly'],
    avatar: avatar('ChillFragger'),
    games: [{ id: 'cs2', rank: 'Gold Nova', roles: ['Rifler', 'Support'], stats: { faceit: '4' } }],
    availability: ['Morning', 'Noon'],
    playstyles: ['Casual', 'Social & Chatty'],
    bio: 'Fairly new, want to improve with someone patient. No toxicity.',
  },
  {
    id: 'p6', name: 'BuildGodZ', realName: 'Itay', age: 22, region: 'Rishon LeZion',
    online: true, verified: true, rating: 4.7, vibe: 90, commends: ['Reliable', 'Positive', 'Grinder'],
    avatar: avatar('BuildGodZ'),
    games: [
      { id: 'fortnite', rank: 'Champion', stats: { points: '1,850' } },
      { id: 'valorant', rank: 'Ascendant', roles: ['Initiator'], stats: { rr: '31' } },
    ],
    availability: ['Afternoon', 'Evening', 'Night'],
    playstyles: ['Competitive', 'Ranked Grind'],
    bio: 'Fortnite + Valorant grinder. Online a lot, serious about improving.',
  },
]
