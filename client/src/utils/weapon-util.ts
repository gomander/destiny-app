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
  // Guardian Games
  294129361, // The Title
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
  540880995, // Dark Decider
  1532276803, // Allied Demand
  2488587246, // The Hero's Burden
  1999697514, // The Wizened Rebuke
  487361141, // Gunnora's Axe
  3169616514, // Bite of the Fox
  1972985595, // Swarm of the Raven
  4009352833, // Roar of the Bear
  // The Dawning
  1506719573, // Cold Front
  1030895163, // Glacioclasm
  66875353, // Avalanche
  3400256755, // Zephyr
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
  // Nightfall
  4281371574, 772231794, // Hung Jury SR4
  681067419, 4074251943, // Hung Jury SR4 (Adept)
  40394833, // The Militia's Birthright
  2378101424, // The Militia's Birthright (Adept)
  1094005544, // Mindbender's Ambition
  3183283212, // Wendigo GL3
  555148853, // Wendigo GL3 (Adept)
  47772649, // THE SWARM
  3836861464, // THE SWARM (Adept)
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
  1856262127, // Something New
  2591111628, // Compass Rose
]

export const isOldDuplicate = (hash: number) => {
  return oldDupes.includes(hash)
}
