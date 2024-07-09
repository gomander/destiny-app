import { DestinyItemSubType } from 'bungie-api-ts/destiny2'
import {
  AmmoType, DestinyIcon, ExplicitWeaponType, WeaponType
} from 'src/types'

export const capitalizeText = (s: string) => {
  return s.toLowerCase()
    .split('-')
    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
    .join('-')
    .split(' ')
    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

export const getWeaponTypesOfAmmoType = (ammoType: AmmoType) => {
  if (ammoType === AmmoType.Primary) {
    return [
      WeaponType.AutoRifle,
      WeaponType.Bow,
      WeaponType.HandCannon,
      WeaponType.PulseRifle,
      WeaponType.ScoutRifle,
      WeaponType.Sidearm,
      WeaponType.SubmachineGun
    ]
  }
  if (ammoType === AmmoType.Special) {
    return [
      WeaponType.FusionRifle,
      WeaponType.Glaive,
      WeaponType.GrenadeLauncher,
      WeaponType.Shotgun,
      WeaponType.SniperRifle,
      WeaponType.TraceRifle
    ]
  }
  if (ammoType === AmmoType.Heavy) {
    return [
      WeaponType.GrenadeLauncher,
      WeaponType.LinearFusionRifle,
      WeaponType.MachineGun,
      WeaponType.RocketLauncher,
      WeaponType.Sword
    ]
  }
}
/**
 * Generic reverse-mapping function for string enums
 *
 * @param myEnum The enum to reverse-map
 * @param enumValue The value to look for
 * @returns The first string enum key that has the given value, or null
 */
function getEnumKeyByEnumValue<T extends { [index: string]: string }>(myEnum: T, enumValue: string): keyof T | null {
  const keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : null;
}

export const getWeaponIconAndName = (weaponType: WeaponType, ammoType?: AmmoType) => {
  const explicitWeaponType = (weaponType === 'grenade launcher' && ammoType)
    ? ammoType + ' ' + weaponType
    : weaponType as unknown as ExplicitWeaponType
  const w = getEnumKeyByEnumValue(ExplicitWeaponType, explicitWeaponType)!
  return [DestinyIcon[w], capitalizeText(weaponType)]
}

export const swapUniqueFrames = (
  frameHash: number, subType: DestinyItemSubType
) => {
  switch (frameHash) {
    case 1282254042: return 1294026524 // Together Forever -> Adaptive (Drang)
    case 2213377102: return 1458010786 // MIDA Synergy -> Lightweight (Mini-Tool)
    case 3054949324: return 3983457027 // Shot Package -> Aggressive (Felwinter's Lie)
    case 216781713: return 3419274965 // Häkke Precision -> Precision (rocket launchers)
    case 31057037: return 3449390870 // Omolon Adaptive -> Adaptive (sidearms)
    case 3364911712: return 3920852688 // VEIST Rapid-Fire -> Rapid-Fire (scout rifles)
    case 895140517: return 1636108362 // Precision -> Precision (shotguns)
    case 2189829540: return 1294026524 // Adaptive -> Adaptive (Rose)
    case 3468089894: // Aggressive -> Aggressive
      switch (subType) {
        case DestinyItemSubType.Shotgun: return 3983457027
        case DestinyItemSubType.SubmachineGun: return 1525239159
      }
    default: return frameHash
  }
}

export const cleanUpFrameName = (frame: string) => {
  return frame
    .replace('Frame', '')
    .replace('Glaive', '')
}

const oldDupes = [
  // Seventh Seraph
  1561006927, // Seventh Seraph Carbine
  3037520408, // Seventh Seraph Officer Revolver
  // Opulence
  2429822977, // Austringer
  79075821, // Drang (Baroque)
  174192097, // CALUS Mini-Tool
  4124357815, // The Epicurean
  2919334548, // Imperial Decree
  4190932264, // Beloved
  1642384931, // Fixed Odds
  // Undying
  2138599001, // Optative
  1167153950, // Adhortative
  2314999489, // Imperative
  2663204025, // Subjunctive
  // Dawn
  2723241847, // Patron of Lost Causes
  3850168899, // Martyr's Retribution
  946443267, // Line in the Sand
  // Arrivals
  614426548, // Falling Guillotine
  // Guardian Games
  294129361, 3559361670, // The Title
  1389546626, // Taraxippos
  // IKELOS v1.0.2
  // 1096206669, // IKELOS_SG_v1.0.2
  // 1200824700, // IKELOS_HC_v1.0.2
  // 1253087083, // IKELOS_SR_v1.0.2
  // 2222560548, // IKELOS_SMG_v1.0.2
  // Festival of the Lost
  528834068, // Braytech Werewolf
  2261046232, 2603335652, // Jurassic Green
  1280894514, // Mechabre
  // Iron Banner
  2014642399, // The Forward Path
  1942069133, 540880995, // Dark Decider
  3649055823, 4292849692, // Crimil's Dagger
  1189790632, // The Steady Hand
  701922966, // Finite Impactor
  4425887, // The Time-Worn Spire
  622058944, // Jorum's Claw
  3890960908, 1161561386, // The Guiding Sight
  1280933460, // Claws of the Wolf
  3424403076, // The Fool's Remedy
  982229638, 1532276803, // Allied Demand
  2909905776, 1865351684, 2488587246, // The Hero's Burden
  2961807684, 930590127, 1999697514, // The Wizened Rebuke
  94729174, 2326716489, 487361141, // Gunnora's Axe
  3169616514, // Bite of the Fox
  1972985595, // Swarm of the Raven
  308332265, 4009352833, // Roar of the Bear
  108221785, 1764868900, // Riiswalker
  4265183314, 3717177717, // Multimach CCX
  2189073092, // Lethal Abundance
  3434944005, 888872889, // Point of the Stag
  1870979911, // Orewing's Maul
  3434507093, // Occluded Finality
  432716552, // Shining Sphere
  // The Dawning
  1506719573, 2814093983, // Cold Front
  1030895163, 3573686365, // Glacioclasm
  66875353, 495940989, // Avalanche
  3400256755, 396910433, // Zephyr
  2812100428, // Stay Frosty
  // Trials of Osiris
  1574601402, // Whistler's Whim
  711889599, // Whistler's Whim (Adept)
  3102421004, // Exalted Truth
  3920882229, // Exalted Truth (Adept)
  3658188704, // The Messenger
  1173780905, // The Messenger (Adept)
  1697682876, // Astral Horizon
  532746994, // Astral Horizon (Adept)
  2185327324, // The Inquisitor
  2307365, // The Inquisitor (Adept)
  3624844116, // Unwavering Duty
  2759251821, // Unwavering Duty (Adept)
  2351180975, // Igneous Hammer
  2527666306, // Igneous Hammer (Adept)
  3164743584, 1401300690, // Eye of Sol
  3637570176, // Eye of Sol (Adept)
  1907698332, // The Summoner
  3514144928, // The Summoner (Adept)
  3682803680, // Shayura's Wrath
  4248997900, // Incisor
  // Trials of the Nine
  1503609584, // The Last Breath
  1909527966, // Prosecutor
  2850415209, // Judgment
  325519402, // Darkest Before
  3854037061, // A Swift Verdict
  2094938673, // Adjudicator
  // Vanguard
  1644162710, // Origin Story
  3393130645, // Positive Outlook
  2171006181, // Service Revolver
  339163900, // Nightshade
  1960218487, 3040742682, // Nameless Midnight
  1927800278, // Eternal Blazon
  819358961, // Spoiler Alert
  3445437901, // Main Ingredient
  3582424018, // Deadpan Delivery
  2290863050, 4083045006, // Persuader
  3551104348, // Double-Edged Answer
  // Nightfall
  1457979868, // Duty Bound
  4238497225, // D.F.A.
  2633186522, // Shadow Price
  233423981, 1821529912, // Warden's Law
  1071542914, // Horror's Least
  580961571, // Loaded Question
  805677041, // Buzzard
  4281371574, 772231794, 3832743906, // Hung Jury SR4
  681067419, 4074251943, // Hung Jury SR4 (Adept)
  3745974521, 40394833, // The Militia's Birthright
  2378101424, // The Militia's Birthright (Adept)
  4117693024, 1094005544, // Mindbender's Ambition
  578459533, 3183283212, // Wendigo GL3
  555148853, // Wendigo GL3 (Adept)
  47772649, // THE SWARM
  3836861464, // THE SWARM (Adept)
  2065081837, 2450917538, // Uzume RR4
  852228780, // Uzume RR4 (Adept)
  192784503, // Pre Astyanax IV
  1151688091, // Undercurrent
  990416096, // Silicon Neuroma
  1929278169, // BrayTech Osprey
  // Last Wish
  601592879, // Age-Old Bond
  2721249463, // Tyranny of Heaven
  654370424, // Nation of Beasts
  568515759, // Chattering Bone
  3799980700, // Transfiguration
  4094657108, // Techeun Force
  686951703, // The Supremacy
  2545083870, // Apex Predator
  // Solstice
  1856262127, 3240434620, // Something New
  2591111628, 233896077, // Compass Rose
  3256453690, // Crowning Duologue
  // Dreaming City
  640114618, // Tigerspite
  334171687, // Waking Vigil
  3242168339, // Vouchsafe
  346136302, // Retold Tale
  3297863558, // Twilight Oath
  3740842661, // Sleepless
  1644160541, // Abide the Return
  // Crucible
  1048266744, // Better Devils
  1325579289, 1402766122, // Retrofuturist
  468276817, // Nature of the Beast
  153979396, // Luna's Howl
  1674742470, // Autumn Wind
  962412079, // Last Perdition
  4193877020, // Does Not Compute
  3535742959, // Randy's Throwing Knife
  3993415705, // The Mountaintop
  3190698551, // Wishbringer
  4174481098, // Steel Sybil Z-14
  // Into the Light
  2499720827, // Midnight Coup
  3757612024, // Luna's Howl
  2533990645, // Blast Furnace
  3851176026, // Elsie's Rifle
  205225492, // Hung Jury SR4
  3098328572, // The Recluse
  4043921923, // The Mountaintop
  2480074702, // Forbearance
  570866107, // Succession
  2228325504, // Edge Transit
  211732170, // Hammerhead
  243425374, // Falling Guillotine
  // Leviathan
  1128225405, // Midnight Coup
  // Black Armory
  603242241, // Hammerhead
  // Gambit
  4077196130, // Trust
  324382200, // Breakneck
  1584643826, // Hush
  // Reckoning
  3116356268, // Spare Rations
  2744715540, // Bug-Out Bag
  755130877, // Last Man Standing
  1115104187, // Sole Survivor
  715338174, // Just in Case
  // EDZ
  3762467078, // Scathelocke
  2502422772, // Cartesian Coordinate
  731147177, // Hawthorne's Field-Forged Shotgun
  // Titan
  2145476623, // Annual Skate
  417474224, // Hoosegow
  287042892, // Negative Space
  // Nessus
  3762467076, // Uriel's Gift
  1911843791, // Last Hope
  3312073053, // Sheperd's Watch
  417474225, // Mos Epoch III
  // Io
  3762467079, // Valakadyn
  1983332562, // Berenger's Memory
  2502422775, // Tarantula
  // Mercury
  3285365666, // Jack Queen King 3
  2091737595, // Traveler's Judgment 5
  161537637, // Infinite Paths 8
  2248667690, 3393519051, // Perfect Paradox
  4105447487, // Elatha FR4
  // Dead Orbit
  582335600, // Dire Promise
  2625782213, // Contingency Plan
  48361212, // Controlling Vision
  1459443448, // Escape Velocity
  3252697558, 1946491241, // Truthteller
  2738174948, // Distant Tumulus
  // Future War Cult
  3854359821, // The Number
  408440598, // True Prophecy
  1342668638, // Pleiades Corrector
  2581162758, // Enigma's Draw
  293505772, // The Vision
  1339362514, // Stochastic Variable
  1006783454, // Timelines' Vertex
  3929685100, // The Deicide
  4272442416, // The Domino
  3329842376, // Memory Interdict
  // New Monarchy
  1760543913, // Legal Action II
  625672050, // Jian 7 Rifle
  1531295694, // Adverse Possession IX
  1443049976, // Interference VI
  2276266837, // Honor's Edge
  // World
  3778520450, // Halfdan-D
  1706536806, // The Old Fashioned
  3860697509, // Pribina-D
  1291586825, // Eystein-D
  1178397319, // Battle Scar
  925326394, // Black Scorpion-4sr
  1200414607, // The Showrunner
  566976653, // Antiope-D
  2517599010, // Death Adder
  2398848320, // Erentil FR4
  515224227, // First In, Last Out
  731147178, // Good Bone Structure
  3666954563, // Elegy-49
  218335759, // Edge Transit
  3005879473, // Crooked Fang-4fr
  1411084669, // Zenobia-D
  // Class swords
  1180270694, // Crown-Splitter
  1180270692, // Quickfang
]

export const isOldDuplicate = (hash: number) => {
  return oldDupes.includes(hash)
}
