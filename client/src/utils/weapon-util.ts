import { DestinyItemSubType } from 'bungie-api-ts/destiny2'
import {
  AmmoType, DestinyIcon, ExplicitWeaponType, WeaponType
} from '../types'

export function capitalizeText(s: string) {
  return s.toLowerCase()
    .split('-')
    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
    .join('-')
    .split(' ')
    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

export function getWeaponTypesOfAmmoType(ammoType: AmmoType) {
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
      WeaponType.HandCannon,
      WeaponType.Shotgun,
      WeaponType.Sidearm,
      WeaponType.SniperRifle,
      WeaponType.TraceRifle,
      WeaponType.PulseRifle
    ]
  }
  if (ammoType === AmmoType.Heavy) {
    return [
      WeaponType.GrenadeLauncher,
      WeaponType.LinearFusionRifle,
      WeaponType.MachineGun,
      WeaponType.RocketLauncher,
      WeaponType.Sword,
      WeaponType.Bow
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
  const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : null;
}

export function getWeaponIconAndName(weaponType: WeaponType, ammoType?: AmmoType) {
  const explicitWeaponType = (weaponType === 'grenade launcher' && ammoType)
    ? `${ammoType} ${weaponType}`
    : weaponType as unknown as ExplicitWeaponType
  const w = getEnumKeyByEnumValue(ExplicitWeaponType, explicitWeaponType)
  if (!w) return ['', capitalizeText(weaponType)]
  return [DestinyIcon[w], capitalizeText(weaponType)]
}

export function swapUniqueFrames(
  frameHash: number, subType: DestinyItemSubType
) {
  switch (frameHash) {
    case 1282254042: return 1294026524 // Together Forever -> Adaptive (Drang)
    case 2213377102: return 1458010786 // MIDA Synergy -> Lightweight (Mini-Tool)
    case 3054949324: return 3983457027 // Shot Package -> Aggressive (Felwinter's Lie)
    case 216781713: return 3419274965 // Precision -> Precision (rocket launchers)
    case 31057037: return 3449390870 // Adaptive -> Adaptive (sidearms)
    case 3364911712: return 3920852688 // Rapid-Fire -> Rapid-Fire (scout rifles)
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

const oldDupes = [
  // Primary weapons
  // Auto rifles
  1457979868, 435216110, 89693562, // Duty Bound
  3762467078, 602618796, // Scathelocke
  2014642399, // The Forward Path
  1503609584, // The Last Breath
  821154603, // Gnawing Hunger
  1907698332, 1820994983, // The Summoner
  2723909519, // Arc Logic
  2496875173, 2557966895, // Sorrow's Verse
  4232480042, // VS Pyroelectric Propellant
  3778520450, // Halfdan-D
  1952163498, // Pluperfect
  1788603939, // Herod-C
  3428407746, 2189073092, // Lethal Abundance
  601592879, // Age-Old Bond
  3754408118, // The Riposte
  528834068, 2869466318, // BrayTech Werewolf
  324382200, 2026755633, // Breakneck
  1644162710, 2826850739, // Origin Story
  1561006927, 4070357005, // Seventh Seraph Carbine
  640114618, 2465372924, // Tigerspite
  4176873718, // Fair Judgment
  177568179, // Horror Story
  3393130645, 491078457, 1832481283, // Positive Outlook
  93253474, // The Ringing Nail
  1909527966, 3483591058, 880829467, // Prosecutor
  2633186522, 2322926844, // Shadow Price
  3854359821, // The Number
  3762467076, // Uriel's Gift
  1119734784, 2598420927, // Chroma Rush
  2598420927, // Steelfeather Repeater
  3385326721, 1992309064, // Reckless Oracle
  20935540, // Arctic Haze
  3762467079, // Valakadyn
  1942069133, 540880995, // Dark Decider
  3229982889, 2987244302, // Adamantite
  // Bows
  2271714488, // Convened Recurve
  211938782, // Whispering Slab
  1574601402, // Whistler's Whim
  3417731926, // Anamnesis
  2326578623, // Fortunate Star
  2721249463, // Tyranny of Heaven
  4095896073, // Accrued Redemption
  1621657423, // Biting Winds
  839344841, // Vengeful Whisper
  1584643826, 3962575203, // Hush
  192784503, 2932922810, // Pre Astyanax IV
  3434944005, 888872889, 3465233192, // Point of the Stag
  // Hand cannons
  2429822977, // Austringer
  1048266744, 4152016199, 2106353446, // Better Devils
  4238497225, 575830664, 2920548486, // D.F.A.
  582335600, // Dire Promise
  2171478765, // Fatebringer
  2850415209, 2969415423, 2226572694, // Judgment
  1128225405, 2763843898, // Midnight Coup
  3116356268, // Spare Rations
  1706536806, // The Old Fashioned
  235827225, // Eyasluna
  3102421004, 548809020, 3436626079, // Exalted Truth
  2575506895, // Kindled Orchid
  2145476623, // Annual Skate
  1123421440, // Epochal Integration
  431721920, // Zaouli's Bane
  701922966, // Finite Impactor
  3285365666, // Jack Queen King 3
  654370424, // Nation of Beasts
  2876244791, 3303271523, // The Palindrome
  334171687, // Waking Vigil
  3649055823, 4292849692, 198854575, // Crimil's Dagger
  3337727085, // Malediction
  3860697509, // Pribina-D
  1189790632, // The Steady Hand
  408440598, // True Prophecy
  1856262127, 3240434620, 586671776, // Something New
  1046651176, // Bottom Dollar
  1288422452, // Mos Athanor IV
  2351180975, 1973107014, // Igenous Hammer
  1872906663, // Modified B-7 Pistol
  233423981, 1821529912, 2152484073, // Warden's Law
  2485881870, // Unloved
  1246793994, // Maahes HC4
  2300143112, // Yesterday's Question
  882778888, // Rose
  2171006181, 834081972, 59060498, // Service Revolver
  3037520408, 1555959830, // Seventh Seraph Officer Revolver
  310708513, 2152350211, // Survivor's Epitaph
  1622998472, // Vulpecula
  2138599001, // Optative
  1141547457, // Frontier's Cry
  153979396, 2763843899, // Luna's Howl
  4077196130, 2850664015, // Trust
  468276817, // Nature of the Beast
  3318545829, // Sarpedon-D
  // Pulse rifles
  2712244741, 2199554524, // Bygones
  962412079, 188882152, // Last Perdition
  1141927949, // Yesteryear
  1167153950, // Adhortative
  622058944, 62937067, // Jorum's Claw
  625672050, // Jian 7 Rifle
  4156253727, // The Third Axiom
  3843477312, 2372514508, // Blast Furnace
  2408405461, // Sacred Provenance
  2313726158, // Belisarius-D
  2276328320, // Veles-X
  2023002233, // All or Nothing
  3969379530, // Aisha's Care
  157601190, 3538003989, // Joxer's Longsword
  233635202, // Cruel Mercy
  1216130969, 558794124, // Cold Denial
  1291586825, // Eystein-D
  1760543913, // Legal Action II
  3658188704, 3796795102, // The Messenger
  1780464822, // New Purpose
  435821041, 3733988413, // Relentless
  2372514509, // Elsie's Rifle
  208088207, // Premonition
  2050789284, // Stars in Shadow
  3218364298, // Redrix's Estoc
  1178397319, 2099894368, // Battle Scar
  568515759, // Chattering Bone
  339163900, 1974641289, 1559068369, // Nightshade
  2812100428, 1891321753, 1123433952, // Stay Frosty
  2342054803, // Ogma PR6
  161537637, 3233390913, // Infinite Paths 8
  1674742470, 3110377595, 2459087496, // Autumn Wind
  4425887, // The Time-Worn Spire
  1280933460, 1505862304, // Claws of the Wolf
  1621558458, 3433930495, // Gridskipper
  325519402, 435821040, // Darkest Before
  2261046232, 2603335652, 3103255595, // Jurassic Green
  299665907, // Outlast
  1071542914, 216983039, 1018012078, // Horror's Least
  // Scout rifles
  // Sidearms
  // Submachine guns
  // Special weapons
  // Fusion rifles
  // Glaives
  // Grenade launchers
  // Hand cannons
  2462965802, // Uncivil Discourse
  // Shotguns
  // Sidearms
  480368036, // Tinasha's Mastery
  3922217119, 837298567, // Lotus-Eater
  3381450498, // Indebted Kindness
  // Sniper rifles
  // Trace rifles
  // Pulse rifles
  42435996, 1715391576, // Mint Retrograde
  135971347, // Psi Aeterna IV
  // Heavy weapons
  // Grenade launchers
  // Linear fusion rifles
  // Machine guns
  // Rocket launchers
  // Swords
  // Bows
  649691506, // A Good Shout
  // 79075821, // Drang (Baroque)
  // 174192097, // CALUS Mini-Tool
  // 4124357815, // The Epicurean
  // 2919334548, // Imperial Decree
  // 4190932264, // Beloved
  // 1642384931, // Fixed Odds
  // 2314999489, // Imperative
  // 2663204025, // Subjunctive
  // 2723241847, // Patron of Lost Causes
  // 3850168899, // Martyr's Retribution
  // 946443267, // Line in the Sand
  // 614426548, // Falling Guillotine
  // 294129361, 3559361670, 655712834, // The Title
  // 1389546626, 3007479950, // Taraxippos
  // 657927352, // Hullabaloo
  // 1096206669, // IKELOS_SG_v1.0.2
  // 1200824700, // IKELOS_HC_v1.0.2
  // 1253087083, // IKELOS_SR_v1.0.2
  // 2222560548, // IKELOS_SMG_v1.0.2
  // 1280894514, 3871226707, // Mechabre
  // 413901114, // Acosmic
  // 4425887, // The Time-Worn Spire
  // 3890960908, 1161561386, // The Guiding Sight
  // 3424403076, // The Fool's Remedy
  // 982229638, 1532276803, // Allied Demand
  // 2909905776, 1865351684, 2488587246, // The Hero's Burden
  // 2961807684, 930590127, 1999697514, // The Wizened Rebuke
  // 94729174, 2326716489, 487361141, // Gunnora's Axe
  // 3169616514, // Bite of the Fox
  // 1972985595, // Swarm of the Raven
  // 308332265, 4009352833, // Roar of the Bear
  // 108221785, 1764868900, // Riiswalker
  // 4265183314, 3717177717, // Multimach CCX
  // 1870979911, // Orewing's Maul
  // 3434507093, // Occluded Finality
  // 432716552, // Shining Sphere
  // 829330711, // Peacebond
  // 1506719573, 2814093983, // Cold Front
  // 1030895163, 3573686365, 2728851518, // Glacioclasm
  // 66875353, 495940989, 4220529694, // Avalanche
  // 3400256755, 396910433, 1911078836, // Zephyr
  // 2680976411, // Albedo Wing
  // 1697682876, // Astral Horizon
  // 2185327324, 2653171212, // The Inquisitor
  // 3624844116, 906840740, // Unwavering Duty
  // 3164743584, 1401300690, // Eye of Sol
  // 3682803680, // Shayura's Wrath
  // 4248997900, // Incisor
  // 2638190703, // Aisha's Embrace
  // 2345794502, // Forgiveness
  // 958384347, // Tomorrow's Answer
  // 325519402, // Darkest Before
  // 3854037061, // A Swift Verdict
  // 2094938673, // Adjudicator
  // 1960218487, 3040742682, // Nameless Midnight
  // 1927800278, // Eternal Blazon
  // 819358961, // Spoiler Alert
  // 3445437901, // Main Ingredient
  // 3582424018, // Deadpan Delivery
  // 2290863050, 4083045006, // Persuader
  // 3551104348, // Double-Edged Answer
  // 4146702548, // Outrageous Fortune
  // 580961571, // Loaded Question
  // 805677041, // Buzzard
  // 4281371574, 772231794, 3832743906, // Hung Jury SR4
  // 3745974521, 40394833, // The Militia's Birthright
  // 4117693024, 1094005544, // Mindbender's Ambition
  // 578459533, 3183283212, // Wendigo GL3
  // 47772649, // THE SWARM
  // 2065081837, 2450917538, // Uzume RR4
  // 1151688091, // Undercurrent
  // 990416096, // Silicon Neuroma
  // 1929278169, // BrayTech Osprey
  // 1289000550, // PLUG ONE.1
  // 3799980700, // Transfiguration
  // 4094657108, // Techeun Force
  // 686951703, // The Supremacy
  // 2545083870, // Apex Predator
  // 2591111628, 233896077, // Compass Rose
  // 3256453690, // Crowning Duologue
  // 2965080304, // Yeartide Apex
  // 3977654524, // Festival Flight
  // 3242168339, // Vouchsafe
  // 346136302, // Retold Tale
  // 3297863558, // Twilight Oath
  // 3740842661, // Sleepless
  // 1644160541, // Abide the Return
  // 1325579289, 1402766122, // Retrofuturist
  // 1674742470, // Autumn Wind
  // 4193877020, // Does Not Compute
  // 3535742959, // Randy's Throwing Knife
  // 3993415705, // The Mountaintop
  // 3190698551, // Wishbringer
  // 4174481098, // Steel Sybil Z-14
  // 3354242550, // The Recluse
  // 205225492, // Hung Jury SR4
  // 3098328572, // The Recluse
  // 4043921923, // The Mountaintop
  // 2480074702, // Forbearance
  // 570866107, // Succession
  // 2228325504, // Edge Transit
  // 211732170, // Hammerhead
  // 243425374, // Falling Guillotine
  // 603242241, // Hammerhead
  // 2744715540, // Bug-Out Bag
  // 755130877, // Last Man Standing
  // 1115104187, // Sole Survivor
  // 715338174, // Just in Case
  // 2502422772, // Cartesian Coordinate
  // 731147177, // Hawthorne's Field-Forged Shotgun
  // 417474224, // Hoosegow
  // 287042892, // Negative Space
  // 1911843791, // Last Hope
  // 3312073053, // Sheperd's Watch
  // 417474225, // Mos Epoch III
  // 1983332562, // Berenger's Memory
  // 2502422775, // Tarantula
  // 2091737595, // Traveler's Judgment 5
  // 2248667690, 3393519051, // Perfect Paradox
  // 4105447487, // Elatha FR4
  // 2625782213, // Contingency Plan
  // 48361212, // Controlling Vision
  // 1459443448, // Escape Velocity
  // 3252697558, 1946491241, // Truthteller
  // 2738174948, // Distant Tumulus
  // 1342668638, // Pleiades Corrector
  // 2581162758, // Enigma's Draw
  // 293505772, // The Vision
  // 1339362514, // Stochastic Variable
  // 1006783454, // Timelines' Vertex
  // 3929685100, // The Deicide
  // 4272442416, // The Domino
  // 3329842376, // Memory Interdict
  // 1531295694, // Adverse Possession IX
  // 1443049976, // Interference VI
  // 2276266837, // Honor's Edge
  // 925326394, // Black Scorpion-4sr
  // 1200414607, // The Showrunner
  // 566976653, // Antiope-D
  // 2517599010, // Death Adder
  // 2398848320, // Erentil FR4
  // 515224227, // First In, Last Out
  // 731147178, // Good Bone Structure
  // 3666954563, // Elegy-49
  // 218335759, // Edge Transit
  // 3005879473, // Crooked Fang-4fr
  // 1411084669, // Zenobia-D
  // 1180270694, // Crown-Splitter
  // 1180270692, // Quickfang
  // 14929251, // Long Arm
  // 1460079227, // Liminal Vigil
  // 4193602194, // No Survivors
  // 1685406703, // Greasy Luck
  // 2982006965, // Wilderflight
  // 492673102, // New Pacific Epitaph
  // 1904170910, // A Sudden Death
  // 2730671571, // Terminus Horizon
  // 2760833884, // Cold Comfort
  // 304659313, // Ignition Code
  // 599895591, // Sojourner's Tale
  // 2209003210, // Zealot's Reward
  // 4020742303, // Prophet of Doom
  // 3454326177, // Omniscient Eye
  // 3186018373, // Vision of Confluence
  // 3197270240, // Found Verdict
  // 3653573172, // Praedyth's Revenge
  // 4050645223, // Hezen Vengeance
  // 2903168058, // Division
  // 3234363830, // Mirror Imago
  // 3228630258, // Afterlight
  // 3269398063, // Refusal of the Call
  // 4028298892, // Psychopomp
  // 727781522, // Eyes Unveiled
  // 1757177186, // Watchful Eye
  // 547165496, // Abyssal Edge
  // 607191995, // Hollow Words
  // 35794111, // Temptation's Hook
  // 3804242793, 3804242792, // Phoneutria Fera
  // 2888021252, 2888021253, // Trachinus
  // 407150810, 407150811, // Ribbontail
  // 2765451291, 2765451290, // Synanceia
]

export function isOldDuplicate(hash: number) {
  return oldDupes.includes(hash)
}
