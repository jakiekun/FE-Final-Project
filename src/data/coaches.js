// Coaches & community mentors for DUOZ Academy.

const avatar = (seed) => `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}&backgroundColor=1d2440`

export const COACHES = [
  {
    id: 'c1', name: 'AscendArc', realName: 'Daniel', game: 'valorant', rank: 'Radiant',
    hours: '2,300', rating: 4.9, reviews: 420, tiers: ['Free', '$10', '$25', 'Monthly'],
    community: false, verified: true, languages: ['English', 'Hebrew'],
    specialties: ['Aim training', 'Game sense', 'Agent pools'],
    bio: 'Ex-semi-pro Radiant. I’ll fix your crosshair placement and decisions in 3 sessions.',
    avatar: avatar('AscendArc'),
  },
  {
    id: 'c2', name: 'MidControl', realName: 'Lena', game: 'lol', rank: 'Challenger',
    hours: '3,100', rating: 5.0, reviews: 512, tiers: ['$10', '$25', 'Monthly'],
    community: false, verified: true, languages: ['English'],
    specialties: ['Mid lane', 'Wave management', 'Macro'],
    bio: 'Challenger mid main. VOD reviews that actually move your rank.',
    avatar: avatar('MidControl'),
  },
  {
    id: 'c3', name: 'SmokeIGL', realName: 'Marco', game: 'cs2', rank: 'Global Elite',
    hours: '4,000', rating: 4.7, reviews: 210, tiers: ['Free', '$10'],
    community: false, verified: true, languages: ['English', 'Italian'],
    specialties: ['Utility usage', 'IGL / calling', 'Positioning'],
    bio: 'Teach you to think like an IGL. Smokes, defaults, mid-rounding.',
    avatar: avatar('SmokeIGL'),
  },
  {
    id: 'c4', name: 'ApexMentor', realName: 'Sara', game: 'apex', rank: 'Predator',
    hours: '1,900', rating: 4.8, reviews: 178, tiers: ['$10', '$25'],
    community: false, verified: true, languages: ['English', 'Spanish'],
    specialties: ['Rotations', 'Movement tech', 'Ranked grind'],
    bio: 'Multiple Predator seasons. Movement & rotations that win endgames.',
    avatar: avatar('ApexMentor'),
  },
  {
    id: 'c5', name: 'ChillHelper', realName: 'Yuki', game: 'valorant', rank: 'Diamond',
    hours: '900', rating: 4.6, reviews: 64, tiers: ['Free'],
    community: true, verified: false, languages: ['English'],
    specialties: ['Beginner friendly', 'Fundamentals', 'Positivity'],
    bio: 'Community mentor — I climbed from Iron and love helping new players. Free!',
    avatar: avatar('ChillHelper'),
  },
  {
    id: 'c6', name: 'BoostPad', realName: 'Tom', game: 'rocketleague', rank: 'Supersonic Legend',
    hours: '2,700', rating: 4.9, reviews: 305, tiers: ['Free', '$10', '$25', 'Monthly'],
    community: false, verified: true, languages: ['English', 'German'],
    specialties: ['Mechanics', 'Rotation', 'Boost management'],
    bio: 'SSL coach. Aerials, fast kickoffs, and clean rotations.',
    avatar: avatar('BoostPad'),
  },
  {
    id: 'c7', name: 'WardWizard', realName: 'Omer', game: 'lol', rank: 'Master',
    hours: '1,400', rating: 4.7, reviews: 88, tiers: ['Free'],
    community: true, verified: false, languages: ['English', 'Hebrew'],
    specialties: ['Support', 'Vision', 'Roaming'],
    bio: 'Community mentor for supports. Vision wins games — let me show you.',
    avatar: avatar('WardWizard'),
  },
]
