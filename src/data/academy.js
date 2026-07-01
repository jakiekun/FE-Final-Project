// DUOZ Academy — guides, camps, leaderboard, growth path, coach availability.

// ---- Learn: guide categories per game ----
export const GUIDE_ICON = {
  Aim: '🎯', Economy: '💰', 'Agent Guides': '🦸', 'Map Guides': '🗺️', Crosshair: '➕', Positioning: '📍',
  'Utility / Nades': '💣', 'Map Callouts': '📢', 'Wave Management': '🌊', Trading: '⚔️', Vision: '👁️',
  Macro: '🧠', 'Champion Guides': '🏆', Itemization: '🛡️', 'Last Hitting': '🎯', 'Lane Control': '🛣️',
  Warding: '👁️', 'Hero Guides': '🦸', 'Item Timings': '⏱️', 'Map Awareness': '🗺️', Movement: '🏃',
  Rotations: '🔄', 'Legend Guides': '🦸', Endgame: '🏁', 'Ability Usage': '✨', 'Team Comp': '🧩', 'Ult Economy': '⚡',
}
export const GUIDE_CATEGORIES = {
  valorant: ['Aim', 'Economy', 'Agent Guides', 'Map Guides', 'Crosshair', 'Positioning'],
  cs2: ['Aim', 'Utility / Nades', 'Economy', 'Map Callouts', 'Crosshair', 'Positioning'],
  lol: ['Wave Management', 'Trading', 'Vision', 'Macro', 'Champion Guides', 'Itemization'],
  dota2: ['Last Hitting', 'Lane Control', 'Warding', 'Hero Guides', 'Item Timings', 'Map Awareness'],
  apex: ['Movement', 'Rotations', 'Aim', 'Legend Guides', 'Positioning', 'Endgame'],
  overwatch2: ['Aim', 'Ability Usage', 'Positioning', 'Hero Guides', 'Team Comp', 'Ult Economy'],
}

// ---- Training Camps (group events + watch party) ----
export const CAMPS = [
  { id: 'cmp1', title: 'Free Aim Camp', game: 'valorant', host: 'AscendArc', hostRank: 'Radiant', day: 'Saturday', time: '19:00', slots: 100, joined: 63, price: 'Free', live: true, channel: 'valorant', viewers: '12.4K' },
  { id: 'cmp2', title: 'Economy & Utility Bootcamp', game: 'cs2', host: 'SmokeIGL', hostRank: 'Global Elite', day: 'Sunday', time: '20:00', slots: 60, joined: 41, price: '$10', live: false, channel: 'esl_csgo', viewers: null },
  { id: 'cmp3', title: 'Wave Management Masterclass', game: 'lol', host: 'MidControl', hostRank: 'Challenger', day: 'Wednesday', time: '18:30', slots: 80, joined: 77, price: 'Free', live: true, channel: 'riotgames', viewers: '8.1K' },
  { id: 'cmp4', title: 'Movement & Rotations', game: 'apex', host: 'ApexMentor', hostRank: 'Predator', day: 'Friday', time: '21:00', slots: 50, joined: 22, price: '$10', live: false, channel: 'playapex', viewers: null },
]

// ---- Coaching leaderboards ----
export const ACADEMY_LEADERBOARD = {
  coaches: [
    { name: 'MidControl', tag: '🏆 Challenger', score: '512 sessions' },
    { name: 'BoostPad', tag: '🚗 SSL', score: '388 sessions' },
    { name: 'AscendArc', tag: '✨ Radiant', score: '361 sessions' },
  ],
  mentors: [
    { name: 'ChillHelper', tag: '🏅 Mentor', score: '1,240 XP' },
    { name: 'WardWizard', tag: '🏅 Mentor', score: '980 XP' },
    { name: 'CalmCarry', tag: '🏅 Mentor', score: '870 XP' },
  ],
  students: [
    { name: 'RisingNova', tag: '📈 +2 ranks', score: 'Gold → Diamond' },
    { name: 'GrindSet', tag: '📈 +2 ranks', score: 'Silver → Plat' },
    { name: 'NoLifeGG', tag: '📈 +1 rank', score: 'Plat → Diamond' },
  ],
}

// ---- Graduate path ----
export const GRADUATE_STAGES = [
  { key: 'student', name: 'Student', icon: '🎒', desc: 'Learning the fundamentals' },
  { key: 'player', name: 'Regular Player', icon: '🎮', desc: 'Grinding & climbing' },
  { key: 'mentor', name: 'Mentor', icon: '🏅', desc: 'Giving back — free community coaching' },
  { key: 'coach', name: 'Verified Coach', icon: '🎖️', desc: 'Verified, top-rated, can charge' },
]

// ---- Improvement graph ----
export const SKILLS = [
  { name: 'Aim', value: 4 },
  { name: 'Map Knowledge', value: 7 },
  { name: 'Communication', value: 6 },
  { name: 'Game Sense', value: 2 },
]
export const SKILL_MAX = 8

// ---- Daily challenges ----
export const CHALLENGES = [
  { id: 'ch1', text: 'Don’t reload after every kill', done: false },
  { id: 'ch2', text: 'Use utility 20 times', done: true },
  { id: 'ch3', text: 'Survive 3 clutch rounds', done: false },
  { id: 'ch4', text: 'Keep comms positive all game', done: false },
]

export const GOALS = ['Reach Diamond', 'Reach Immortal', 'Hit Global Elite', 'Climb to Master', 'Just improve & have fun']

// ---- Coach availability (weekly days + time slots + blocked dates) ----
// day numbers: 0=Sun … 6=Sat
const DEFAULT_AVAIL = { days: [1, 3, 5, 6], slots: ['18:00', '19:00', '20:00', '21:00'], blocked: [] }
const COACH_AVAIL = {
  c1: { days: [0, 2, 4, 6], slots: ['17:00', '18:00', '19:00', '20:00', '21:00'], blocked: [] },
  c2: { days: [1, 2, 3, 4, 5], slots: ['16:00', '17:00', '18:00'], blocked: [] },
  c3: { days: [5, 6, 0], slots: ['19:00', '20:00', '21:00', '22:00'], blocked: [] },
  c4: { days: [2, 4, 6], slots: ['20:00', '21:00', '22:00'], blocked: [] },
  c5: { days: [0, 1, 2, 3, 4, 5, 6], slots: ['15:00', '16:00', '17:00', '18:00'], blocked: [] },
  c6: { days: [3, 4, 5, 6], slots: ['18:00', '19:00', '20:00'], blocked: [] },
  c7: { days: [1, 3, 5], slots: ['17:00', '18:00', '19:00'], blocked: [] },
}
export const getAvail = (coachId) => COACH_AVAIL[coachId] || DEFAULT_AVAIL
