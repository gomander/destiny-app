import { DestinyItemSubType } from 'bungie-api-ts/destiny2'
import { AmmoType, WeaponType, type Weapon } from 'src/types'

export function capitalizeText(s: string) {
  return s.toLowerCase()
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join('-')
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
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
      WeaponType.PulseRifle,
      WeaponType.Shotgun,
      WeaponType.Sidearm,
      WeaponType.SniperRifle,
      WeaponType.TraceRifle
    ]
  }
  if (ammoType === AmmoType.Heavy) {
    return [
      WeaponType.Bow,
      WeaponType.GrenadeLauncher,
      WeaponType.LinearFusionRifle,
      WeaponType.MachineGun,
      WeaponType.RocketLauncher,
      WeaponType.SniperRifle,
      WeaponType.Sword
    ]
  }
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
    case 1636108362: return 895140517 // Precision -> Precision (shotguns)
    case 2078075300: return 2622129339 // Support -> Support (Chrysura Melo)
    case 2235383762: return 2622129339 // Support -> Support (Cusp Sempiternal)
    case 2799967529: return 2622129339 // Support -> Support (DECATUR 02)
    case 3488129416: return 2622129339 // Support -> Support (Adamantite)
    case 3468089894: // Aggressive -> Aggressive
      switch (subType) {
        case DestinyItemSubType.Shotgun: return 3983457027
        case DestinyItemSubType.SubmachineGun: return 1525239159
      }
    default: return frameHash
  }
}

export function dedupeWeapons(weapons: Weapon[]) {
  const map = new Map()
  for (const weapon of weapons) {
    weapon.name = addSourceToNameIfDuplicate(weapon.hash, weapon.name)
    const existing = map.get(weapon.name)
    if (!existing || weapon.released > existing.released) {
      map.set(weapon.name, weapon)
    }
  }
  return Array.from(map.values())
}

function addSourceToNameIfDuplicate(weaponHash: number, weaponName: string) {
  switch (weaponHash) {
    case 4158265643: return 'Reckless Oracle (Pantheon)'
    case 1992309064: return 'Reckless Oracle (Garden of Salvation)'
    case 3647341740: return 'Zaouli\'s Bane (Pantheon)'
    case 431721920: return 'Zaouli\'s Bane (King\'s Fall)'
    case 830651379: return 'Chattering Bone (Pantheon)'
    case 501329015: return 'Chattering Bone (Last Wish)'
    case 3736001860: return 'Forbearance (Onslaught)'
    case 613334176: return 'Forbearance (Vow of the Disciple)'
    case 2731922624: return 'Succession (Onslaught)'
    case 2990047042: return 'Succession (Deep Stone Crypt)'
    default: return weaponName
  }
}
