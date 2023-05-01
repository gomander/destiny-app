import {
  AmmoType, DestinyIcon, ExplicitWeaponType, WeaponType
} from 'src/components/models'

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

function getEnumKeyByEnumValue<T extends {[index:string]:string}>(myEnum:T, enumValue:string):keyof T|null {
  let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : null;
}

export const getWeaponIconAndName = (weaponType: WeaponType, ammoType?: AmmoType) => {
  const explicitWeaponType = (weaponType === 'grenade launcher' && ammoType)
    ? ammoType + ' ' + weaponType
    : weaponType as unknown as ExplicitWeaponType
  const w = getEnumKeyByEnumValue(ExplicitWeaponType, explicitWeaponType)!
  return [DestinyIcon[w], capitalizeText(weaponType)]
}

export const swapUniqueFrames = (frameHash: number) => {
  if (frameHash === 1282254042) return 1294026524 // together forever
  if (frameHash === 2213377102) return 1458010786 // mida synergy
  if (frameHash === 3054949324) return 3983457027 // shot package
  if (frameHash === 216781713) return 3419274965 // häkke precision
  if (frameHash === 31057037) return 3449390870 // omolon adaptive
  if (frameHash === 3364911712) return 3920852688 // veist rapid-fire
  if (frameHash === 3468089894) return 1525239159 // aggressive smgs
  if (frameHash === 895140517) return 1636108362 // precision shotguns
  return frameHash
}

export const cleanUpFrameName = (frame: string) => {
  return frame
    .replace('Frame', '')
    .replace('Glaive', '')
}

const oldDupes = [
  528834068, // Braytech Werewolf
  1561006927, // Seventh Seraph Carbine
  3037520408, // Seventh Seraph Officer Revolver
  540880995, // Dark Decider
  1574601402, // Whistler's Whim
  711889599, // Whistler's Whim (Adept)
  3102421004, // Exalted Truth
  3920882229, // Exalted Truth (Adept)
  294129361, // The Title
  // 1096206669, // IKELOS_SG_v1.0.2
  // 1200824700, // IKELOS_HC_v1.0.2
  // 1253087083, // IKELOS_SR_v1.0.2
  // 2222560548, // IKELOS_SMG_v1.0.2
  2261046232, // Jurassic Green
  4281371574, 772231794, // Hung Jury SR4
  681067419, 4074251943, // Hung Jury SR4 (Adept)
  1532276803, // Allied Demand
  1506719573, // Cold Front
  2488587246, // The Hero's Burden
  1030895163, // Glacioclasm
  1999697514, // The Wizened Rebuke
  40394833, // The Militia's Birthright
  2378101424, // The Militia's Birthright (Adept)
  1697682876, // Astral Horizon
  532746994, // Astral Horizon (Adept)
  487361141, // Gunnora's Axe
  2185327324, // The Inquisitor
  2307365, // The Inquisitor (Adept)
  1094005544, // Mindbender's Ambition
  3169616514, // Bite of the Fox
  3183283212, // Wendigo GL3
  555148853, // Wendigo GL3 (Adept)
  47772649, // THE SWARM
  3836861464, // THE SWARM (Adept)
  66875353, // Avalanche
  3624844116, // Unwavering Duty
  2759251821, // Unwavering Duty (Adept)
  4009352833, // Roar of the Bear
  3400256755, // Zephyr
]

export const isOldDuplicate = (hash: number) => {
  return oldDupes.includes(hash)
}