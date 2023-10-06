interface AnnualRelease {
  title: string
  value: number
  subdivisions: number
}

const annualReleases = new Map<number, AnnualRelease>([
  [1, {
    title: 'Destiny 2',
    value: 1,
    subdivisions: 3
  }],
  [2, {
    title: 'Forsaken',
    value: 2,
    subdivisions: 4
  }],
  [3, {
    title: 'Shadowkeep',
    value: 3,
    subdivisions: 4
  }],
  [4, {
    title: 'Beyond Light',
    value: 4,
    subdivisions: 4
  }],
  [5, {
    title: 'Witch Queen',
    value: 5,
    subdivisions: 4
  }],
  [6, {
    title: 'Lightfall',
    value: 6,
    subdivisions: 4
  }],
  [7, {
    title: 'The Final Shape',
    value: 7,
    subdivisions: 3
  }]
])

interface PowerLevels {
  base: number | null
  soft: number | null
  powerful: number | null
  hard: number | null
}

interface SeasonalRelease {
  title: string
  value: number
  icons: string[]
  year?: AnnualRelease
  power?: PowerLevels
}

type HasIcon =
  | number | 'unknown' | 'the-dawning' | 'crimson-days' | 'solstice'
  | 'festival-of-the-lost' | 'the-revelry' | 'guardian-games'

const seasons = new Map<HasIcon, SeasonalRelease>([
  ['unknown', {
    title: 'Unknown',
    value: 1100,
    icons: []
  }],
  [1, {
    title: 'The Red War',
    value: 1,
    icons: [
      '/common/destiny2_content/icons/fb50cd68a9850bd323872be4f6be115c.png'
    ],
    year: annualReleases.get(1),
    power: {
      base: 10,
      soft: 260,
      powerful: 300,
      hard: 305
    }
  }],
  [2, {
    title: 'Curse of Osiris',
    value: 2,
    icons: [
      '/common/destiny2_content/icons/2c024f088557ca6cceae1e8030c67169.png'
    ],
    year: annualReleases.get(1),
    power: {
      base: 10,
      soft: 290,
      powerful: 330,
      hard: 335
    }
  }],
  ['the-dawning', {
    title: 'The Dawning',
    value: 1001,
    icons: [
      '/common/destiny2_content/icons/ad7fdb049d430c1fac1d20cf39059702.png'
    ]
  }
  ],
  ['crimson-days', {
    title: 'Crimson Days',
    value: 1002,
    icons: [
      '/common/destiny2_content/icons/04de56db6d59127239ed51e82d16c06c.png'
    ]
  }
  ],
  [3, {
    title: 'Warmind',
    value: 3,
    icons: [
      '/common/destiny2_content/icons/ed6c4762c48bd132d538ced83c1699a6.png'
    ],
    year: annualReleases.get(1),
    power: {
      base: 10,
      soft: 340,
      powerful: 380,
      hard: 385
    }
  }],
  ['solstice', {
    title: 'Solstice',
    value: 1003,
    icons: [
      '/common/destiny2_content/icons/52523b49e5965f6f33ab86710215c676.png'
    ]
  }],
  [4, {
    title: 'Season of the Outlaw',
    value: 4,
    icons: [
      '/common/destiny2_content/icons/1b6c8b94cec61ea42edb1e2cb6b45a31.png'
    ],
    year: annualReleases.get(2),
    power: {
      base: 340,
      soft: 500,
      powerful: 600,
      hard: null
    }
  }],
  ['festival-of-the-lost', {
    title: 'Festival of the Lost',
    value: 1004,
    icons: [
      '/common/destiny2_content/icons/f80e39c767f309f0b2be625dae0e3744.png'
    ]
  }],
  [5, {
    title: 'Season of the Forge',
    value: 5,
    icons: [
      '/common/destiny2_content/icons/448f071a7637fcefb2fccf76902dcf7d.png'
    ],
    year: annualReleases.get(2),
    power: {
      base: 340,
      soft: 600,
      powerful: 650,
      hard: null
    }
  }],
  [6, {
    title: 'Season of the Drifter',
    value: 6,
    icons: [
      '/common/destiny2_content/icons/1448dde4efdb57b07f5473f87c4fccd7.png'
    ],
    year: annualReleases.get(2),
    power: {
      base: 340,
      soft: 650,
      powerful: 700,
      hard: null
    }
  }],
  ['the-revelry', {
    title: 'The Revelry',
    value: 1005,
    icons: [
      '/common/destiny2_content/icons/65097e226318b8581ad535b33827e01a.png'
    ]
  }],
  [7, {
    title: 'Season of Opulence',
    value: 7,
    icons: [
      '/common/destiny2_content/icons/5364cc3900dc3615cb0c4b03c6221942.png'
    ],
    year: annualReleases.get(2),
    power: {
      base: 340,
      soft: 700,
      powerful: 750,
      hard: null
    }
  }],
  [8, {
    title: 'Season of the Undying',
    value: 8,
    icons: [
      '/common/destiny2_content/icons/2352f9d04dc842cfcdda77636335ded9.png',
      '/common/destiny2_content/icons/e8fe681196baf74917fa3e6f125349b0.png'
    ],
    year: annualReleases.get(3),
    power: {
      base: 750,
      soft: 900,
      powerful: 950,
      hard: 960
    }
  }],
  [9, {
    title: 'Season of Dawn',
    value: 9,
    icons: [
      '/common/destiny2_content/icons/3ba38a2b9538bde2b45ec9313681d617.png'
    ],
    year: annualReleases.get(3),
    power: {
      base: 750,
      soft: 910,
      powerful: 960,
      hard: 970
    }
  }],
  [10, {
    title: 'Season of the Worthy',
    value: 10,
    icons: [
      '/common/destiny2_content/icons/b12630659223b53634e9f97c0a0a8305.png'
    ],
    year: annualReleases.get(3),
    power: {
      base: 750,
      soft: 950,
      powerful: 1000,
      hard: 1010
    }
  }],
  ['guardian-games', {
    title: 'Guardian Games',
    value: 1006,
    icons: [
      '/common/destiny2_content/icons/efdb35540cd169fa6e334995c2ce87b6.png'
    ]
  }],
  [11, {
    title: 'Season of Arrivals',
    value: 11,
    icons: [
      '/common/destiny2_content/icons/4c25426263cacf963777cd4988340838.png'
    ],
    year: annualReleases.get(3),
    power: {
      base: 750,
      soft: 1000,
      powerful: 1050,
      hard: 1060
    }
  }],
  [12, {
    title: 'Season of the Hunt',
    value: 12,
    icons: [
      '/common/destiny2_content/icons/9e0f43538efe9f8d04546b4b0af6cc43.png',
      '/common/destiny2_content/icons/be3c0a95a8d1abc6e7c875d4294ba233.png'
    ],
    year: annualReleases.get(4),
    power: {
      base: 1050,
      soft: 1200,
      powerful: 1250,
      hard: 1260
    }
  }],
  [13, {
    title: 'Season of the Chosen',
    value: 13,
    icons: [
      '/common/destiny2_content/icons/5ac4a1d48a5221993a41a5bb524eda1b.png'
    ],
    year: annualReleases.get(4),
    power: {
      base: 1050,
      soft: 1250,
      powerful: 1300,
      hard: 1310
    }
  }],
  [14, {
    title: 'Season of the Splicer',
    value: 14,
    icons: [
      '/common/destiny2_content/icons/23968435c2095c0f8119d82ee222c672.png'
    ],
    year: annualReleases.get(4),
    power: {
      base: 1050,
      soft: 1260,
      powerful: 1310,
      hard: 1320
    }
  }],
  [15, {
    title: 'Season of the Lost',
    value: 15,
    icons: [
      '/common/destiny2_content/icons/d92e077d544925c4f37e564158f8f76a.png'
    ],
    year: annualReleases.get(4),
    power: {
      base: 1050,
      soft: 1270,
      powerful: 1320,
      hard: 1330
    }
  }],
  [16, {
    title: 'Season of the Risen',
    value: 16,
    icons: [
      '/common/destiny2_content/icons/b973f89ecd631a3e3d294e98268f7134.png',
      '/common/destiny2_content/icons/6e4fdb4800c34ccac313dd1598bd7589.png'
    ],
    year: annualReleases.get(5),
    power: {
      base: 1350,
      soft: 1500,
      powerful: 1550,
      hard: 1560
    }
  }],
  [17, {
    title: 'Season of the Haunted',
    value: 17,
    icons: [
      '/common/destiny2_content/icons/ab075a3679d69f40b8c2a319635d60a9.png'
    ],
    year: annualReleases.get(5),
    power: {
      base: 1350,
      soft: 1510,
      powerful: 1560,
      hard: 1570
    }
  }],
  [18, {
    title: 'Season of Plunder',
    value: 18,
    icons: [
      '/common/destiny2_content/icons/a3923ae7d2376a1c4eb0f1f154da7565.png'
    ],
    year: annualReleases.get(5),
    power: {
      base: 1350,
      soft: 1520,
      powerful: 1570,
      hard: 1580
    }
  }],
  [19, {
    title: 'Season of the Seraph',
    value: 19,
    icons: [
      '/common/destiny2_content/icons/e775dcb3d47e3d54e0e24fbdb64b5763.png'
    ],
    year: annualReleases.get(5),
    power: {
      base: 1350,
      soft: 1530,
      powerful: 1580,
      hard: 1590
    }
  }],
  [20, {
    title: 'Season of Defiance',
    value: 20,
    icons: [
      '/common/destiny2_content/icons/af00bdcd3e3b89e6e85c1f63ebc0b4e4.png',
      '/common/destiny2_content/icons/31445f1891ce9eb464ed1dcf28f43613.png'
    ],
    year: annualReleases.get(6),
    power: {
      base: 1600,
      soft: 1750,
      powerful: 1800,
      hard: 1810
    }
  }],
  [21, {
    title: 'Season of the Deep',
    value: 21,
    icons: [
      '/common/destiny2_content/icons/6026e9d64e8c2b19f302dafb0286897b.png'
    ],
    year: annualReleases.get(6),
    power: {
      base: 1600,
      soft: 1750,
      powerful: 1800,
      hard: 1810
    }
  }],
  [22, {
    title: 'Season of the Witch',
    value: 22,
    icons: [
      '/common/destiny2_content/icons/3de52d90db7ee2feb086ef6665b736b6.png'
    ],
    year: annualReleases.get(6),
    power: {
      base: 1600,
      soft: 1750,
      powerful: 1800,
      hard: 1810
    }
  }],
  [23, {
    title: 'Season of [Redacted]',
    value: 23,
    icons: [],
    year: annualReleases.get(6),
    power: {
      base: 1600,
      soft: null,
      powerful: null,
      hard: null
    }
  }],
  [24, {
    title: 'Echoes',
    value: 24,
    icons: [],
    year: annualReleases.get(7),
    power: {
      base: null,
      soft: null,
      powerful: null,
      hard: null
    }
  }],
  [25, {
    title: 'Revenant',
    value: 25,
    icons: [],
    year: annualReleases.get(7),
    power: {
      base: null,
      soft: null,
      powerful: null,
      hard: null
    }
  }],
  [26, {
    title: 'Heresy',
    value: 26,
    icons: [],
    year: annualReleases.get(7),
    power: {
      base: null,
      soft: null,
      powerful: null,
      hard: null
    }
  }]
])
export default seasons
