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
