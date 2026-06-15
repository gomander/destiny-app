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
  1251729046, // Steelfeather Repeater
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
  568515759, 501329015, // Chattering Bone
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
  542573208, // Last Rite
  8293111, 4249949938, // Long Arm
  4193877020, // Does Not Compute
  2314999489, // Imperative
  3890960908, 1161561386, // The Guiding Sight
  3799980700, // Transfiguration
  3504336176, // Night Watch
  2723241847, 2249996761, // Patron of Lost Causes
  3423493037, // Red Tape
  1389546626, 3007479950, 2595813005, // Taraxippos
  3242168339, 355922321, // Vouchsafe
  1342668638, // Pleiades Corrector
  1927800278, // Eternal Blazon
  4281371574, 772231794, 3832743906, 1453235079, // Hung Jury SR4
  1960218487, 3040742682, 996109059, 3470514298, // Nameless Midnight
  3612142623, // Live Fire
  222606050, // Glissando-47
  3907337522, 444627789, // Oxygen SR3
  3186018373, // Vision of Confluence
  1531295694, // Adverse Possession IX
  1931556011, // No Feelings
  3535742959, 3292795429, 3975115486, // Randy's Throwing Knife
  2638190703, // Aisha's Embrace
  925326394, // Black Scorpion-4sr
  2625782213, // Contingency Plan
  2226158470, // Unworthy
  // Sidearms
  829330711, 3437370193, // Peacebond
  3618823368, // Evening SI4
  1911843791, // Last Hope
  2009277538, // The Last Dance
  293505772, // The Vision
  2091737595, // Traveler's Judgment 5
  982229638, 1532276803, 3166250992, // Allied Demand
  805677041, 213264394, // Buzzard
  48361212, // Controlling Vision
  2362471600, // Drang
  79075821, // Drang (Baroque)
  409551876, 2839128618, // The Keening
  2659286158, // Compact Defender
  3138208275, 2575844666, // Liminal Vigil
  2121785039, // Brass Attacks
  2992463569, // Division
  2345794502, // Forgiveness
  819358961, 2588048270, // Spoiler Alert
  3937866388, // Seventh Seraph SI-2
  3998080529, // Heliocentric QSC
  1051949956, // Anonymous Autumn
  2581162758, // Enigma's Draw
  2199171672, // Lonesome
  3854037061, // A Swift Verdict
  414045521, // Insurmountable
  378498222, 1409524486, // Punching Out
  3424403076, // The Fool's Remedy
  // Submachine guns
  3877448149, // Mirror Imago
  2909905776, 1865351684, 2488587246, 1028124540, // The Hero's Burden
  2744715540, // Bug-Out Bag
  3926811686, // Parabellum
  149110926, // Whatchamacallit
  1506719573, 2814093983, // Cold Front
  4039572196, // The Immortal
  294129361, 3559361670, 655712834, 55393445, // The Title
  3000847393, // Unforgiven
  3262192268, 4228149269, // No Survivors
  2770035786, // M-17 "Fast Talker"
  1459443448, // Escape Velocity
  4265183314, 3717177717, 3211624072, // Multimach CCX
  1200414607, // The Showrunner
  2349907931, 1066772626, // Prolonged Engagement
  3354242550, 1050806815, // The Recluse
  174192097, // CALUS Mini-Tool
  2517599010, 2742490609, // Death Adder
  3089417788, // MIDA Mini-Tool
  2988121501, 3021407779, // Out of Bounds
  1339362514, // Stochastic Variable
  2663204025, // Subjunctive
  2094938673, 1013434963, // Adjudicator
  566976653, // Antiope-D
  2510526114, 673621062, // Unending Tempest
  811403305, // Synchronic Roulette
  4277547616, // Every Waking Moment
  3682803680, 2022294213, // Shayura's Wrath
  3276304504, // Perfect Pitch
  766323545, // Seventh Seraph VY-7
  // Special weapons
  // Fusion rifles
  933455006, // Burden of Guilt
  1084190509, // Pressurized Precision
  1834313033, // Afterlight
  93061497, // VS Gravitic Arrest
  2931957300, // Dream Breaker
  1006783454, // Timelines' Vertex
  4094657108, // Techeun Force
  74733286, // Nox Sidereal IV
  1824586582, // Resounding
  3512349612, // Coriolis Force
  963710795, // Aurvandil FR6
  2767393525, // Nox Perennial V
  2398848320, // Erentil FR4
  1030895163, 3573686365, 2728851518, // Glacioclasm
  4105447487, // Elatha FR4
  580961571, 3125454907, // Loaded Question
  2961807684, 930590127, 1999697514, 2290416, // The Wizened Rebuke
  4124357815, // The Epicurean
  607191995, // Hollow Words
  3445437901, 253196586, 2901221332, // Main Ingredient
  1289000550, 3293524502, // PLUG ONE.1
  2715240478, 1323862250, // Riptide
  1644680957, 3613444087, // Null Composure
  2209003210, // Zealot's Reward
  2502422772, 2481881293, // Cartesian Coordinate
  // Glaives
  3269398063, 2671849376, // Refusal of the Call
  3001205424, // Ecliptic Distaff
  2298039571, // Rake Angle
  2680976411, 1845372864, // Albedo Wing
  1757202961, 2934305134, // Greasy Luck
  267672635, // Backfang
  // Grenade launchers
  3718184802, // Ouster Engine
  1762785663, // VS Velocity Baton
  4028298892, 3840794631, // Psychopomp
  2599338624, // Liturgy
  2306182339, 1206729100, // Wilderflight
  1332123064, // Wild Style
  304659313, // Ignition Code
  3745974521, 40394833, // Militia's Birthright
  2026087437, // Lingering Dread
  1870979911, // Orewing's Maul
  3252697558, 1946491241, // Truthteller
  4255586669, // Empty Vessel
  2060863616, 2461640837, // Salvager's Salvo
  3993415705, 568611922, // The Mountaintop
  1125217994, 2059741649, // New Pacific Epitaph
  1218113510, // Tusk of the Boar
  3850168899, // Martyr's Retribution
  613334176, 568611921, // Forebearance
  1151688091, // Undercurrent
  // Hand cannons
  2462965802, // Uncivil Discourse
  // Shotguns
  1697682876, 2653171213, // Astral Horizon
  2919334548, // Imperial Decree
  4097972038, 1976481399, // A Sudden Death
  838556752, // Python
  1179141605, // Felwinter's Lie
  755130877, 4287947559, // Last Man Standing
  4117693024, 1094005544, 1586231351, // Mindbender's Ambition
  3582424018, // Deadpan Delivery
  3197270240, // Found Verdict
  3649985571, // Arcane Embrace
  731147177, // Hawthorne's Field-Forged Shotgun
  3216652511, // Reckless Endangerment
  108221785, 1764868900, 557165046, // Riiswalker
  1325579289, 1402766122, 1612781792, // Retrofuturist
  1821724780, // Seventh Seraph CQC-12
  499245245, // Ded Gramarye IV
  2891672170, // Xenoclast IV
  2782847179, // Blasphemer
  2821430069, // Fortissimo-11
  4037745684, // Bonechiller
  3360937899, // Unvoiced
  599895591, // Sojourner's Tale
  515224227, // First In, Last Out
  731147178, // Good Bone Structure
  94729174, 2326716489, 487361141, // Gunnora's Axe
  2185327324, 2653171212, 51129316, // The Inquisitor
  2035738085, // Deadlock
  3184681056, // Fractethyst
  346136302, 871900124, // Retold Tale
  2591111628, 233896077, 4169225313, // Compass Rose
  2563012876, // Matador 64
  4020742303, // Prophet of Doom
  2248667690, 3393519051, 1298672084, // Perfect Paradox
  1664372054, // Threat Level
  2573900604, // Basso Ostinato
  3929685100, // The Deicide
  3190698551, // Wishbringer
  // Sidearms
  480368036, // Tinasha's Mastery
  3922217119, 837298567, // Lotus-Eater
  3381450498, // Indebted Kindness
  // Sniper rifles
  3164743584, 1401300690, 627188188, // Eye of Sol
  3312073053, // Shepherd's Watch
  1645386487, // Tranquility
  4164201232, // 1000 Yard Stare
  3666954563, // Elegy-49
  4190932264, // Beloved
  4272442416, // The Domino
  2065081837, 2450917538, 42874240, // Uzume RR4
  4184808992, 891765152, // Adored
  2073794990, // Mercurial Overreach
  1115104187, 1150492185, // Sole Survivor
  3169616514, 1403800851, // Bite of the Fox
  990416096, // Silicon Neuroma
  690412397, // Something Something
  2990047042, 3612338554, // Succession
  3473290087, 232119851, // Frozen Orbit
  4166221755, // Trophy Hunter
  1893967086, // Keen Thistle
  1106635211, // Last Foray
  1280894514, 3871226707, 2477980485, // Mechabre
  3434507093, 852551895, // Occluded Finality
  1449922174, // Tatara Gaze
  3215649176, // The Helmsman
  3380742308, // Alone as a god
  3653573172, // Praedyth's Revenge
  686951703, // The Supremacy
  2806569825, // Naeem's Lance
  2290863050, 4083045006, // Persuader
  2738174948, // Distant Tumulus
  3454326177, // Omniscient Eye
  3297863558, 1874424704, // Twilight Oath
  2164448701, // Apostate
  // Trace rifles
  4248997900, // Incisor
  1303313141, // Unsworn
  2029899814, // Keraunios
  // Pulse rifles
  42435996, 1715391576, // Mint Retrograde
  135971347, // Psi Aeterna IV
  // Heavy weapons
  // Grenade launchers
  218335759, 568611923, // Edge Transit
  3329842376, // Memory Interdict
  616582330, // Cry Mutiny
  736901634, // Doomsday
  1443049976, // Interference VI
  578459533, 3183283212, 1854753404, // Wendigo GL3
  2738601016, // Cataphract GL3
  657927352, 2666273249, // Hullabaloo
  413901114, 425681240, // Acosmic
  1983332562, // Berenger's Memory
  1972985595, // Swarm of the Raven
  2066434718, // Canis Major
  4146702548, // Outrageous Fortune
  1762785662, // VS Chill Inhibitor
  // Linear fusion rifles
  3483485727, // Mistral Lift
  3652506829, // Stormchaser
  2591257541, // Scintillation
  3005879473, // Crooked Fang-4fr
  727781522, 615373993, // Eyes Unveiled
  946443267, // Line in the Sand
  2502422775, // Tarantula
  1399243961, // Reed's Regret
  3221722018, // Laser Painter
  // Machine guns
  603242241, 1896309757, // Hammerhead
  66875353, 495940989, 4220529694, // Avalanche
  3624844116, 906840740, // Unwavering Duty
  3325778512, // A Fine Memorial
  3105930175, // Chain of Command
  2187717691, // Circular Logic
  1757177186, 768610585, // Watchful Eye
  1496419775, // Bane of Sorrow
  1642384931, // Fixed Odds
  2582755344, // Seventh Seraph SAW
  47772649, // THE SWARM
  487205709, 3984556130, // Terminus Horizon
  2896109856, // Archon's Thunder
  4176551594, // Qua Vinctus IV
  1766088024, // Thermal Erosion
  1600633250, // 21% Delirium
  // Rocket launchers
  2186258845, // Bellowing Giant
  2545083870, // Apex Predator
  417474224, // Hoosegow
  432716552, // Shining Sphere
  4255171531, 3960301269, // The Hothead
  694275488, 2511482352, // Cynosure
  991314988, // Bad Omens
  4050645223, // Hezen Vengeance
  3067821200, // Heretic
  417474225, // Mos Epoch III
  839786290, 291447487, // Cold Comfort
  1929278169, // BrayTech Osprey
  958384347, 3009199534, // Tomorrow's Answer
  308332265, 4009352833, 2231910050, // Roar of the Bear
  3740842661, 2140635451, // Sleepless
  725408022, // Ascendancy
  1289324202, // Pyroclastic Flow
  42351395, // Subzero Salvo
  1411084669, // Zenobia-D
  3256453690, 4106757302, // Crowning Duologue
  // Swords
  3551104348, // Double-Edged Answer
  4174481098, // Steel Sybil Z-14
  1644160541, 250721843, // Abide the Return
  715338174, // Just in Case
  287042892, // Negative Space
  2276266837, // Honor's Edge
  3400256755, 396910433, 1911078836, 601948197, // Zephyr
  1180270694, // Crown-Splitter
  3438139008, // Chivalric Fire
  1313528549, // Sola's Scar
  35794111, 1587953057, // Temptation's Hook
  3668817296, // Dragoncult Sickle
  1180270692, // Quickfang
  614426548, 1815105249, // Falling Guillotine
  2889501828, 189854537, // The Slammer
  1479562935, // Aurora Dawn
  547165496, 4221591387, // Abyssal Edge
  // Bows
  649691506, // A Good Shout
]

export function isOldDuplicate(hash: number) {
  return oldDupes.includes(hash)
}
