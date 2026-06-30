// External accounts a user can connect (for rank verification, friends, etc.).
// In Lesson 7 these become real OAuth flows; for now they toggle locally.

export const PLATFORMS = [
  { id: 'steam', name: 'Steam', icon: '🎮', color: '#1b2838', desc: 'Import CS2, Dota 2 & your library' },
  { id: 'riot', name: 'Riot Games', icon: '⚔️', color: '#d13639', desc: 'Verify Valorant / LoL / TFT rank' },
  { id: 'discord', name: 'Discord', icon: '💬', color: '#5865f2', desc: 'Let matches add you instantly' },
  { id: 'epic', name: 'Epic Games', icon: '🏗️', color: '#2a2a2a', desc: 'Connect Fortnite & Rocket League' },
  { id: 'battlenet', name: 'Battle.net', icon: '🛡️', color: '#148eff', desc: 'Overwatch 2 & Call of Duty' },
  { id: 'twitch', name: 'Twitch', icon: '📺', color: '#9146ff', desc: 'Show your streams on your profile' },
  { id: 'playstation', name: 'PlayStation', icon: '🎯', color: '#0070d1', desc: 'Sync your PSN profile' },
  { id: 'xbox', name: 'Xbox', icon: '🟢', color: '#107c10', desc: 'Sync your Xbox Live profile' },
]
