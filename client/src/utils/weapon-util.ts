import { DestinyItemSubType } from 'bungie-api-ts/destiny2'
import { AmmoType, WeaponType } from 'src/types'

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
    case 895140517: return 1636108362 // Precision -> Precision (shotguns)
    case 1888623310: return 1636108362 // MIDA Synergy -> Precision (MIDA Macro-Tool)
    case 2189829540: return 1294026524 // Adaptive -> Adaptive (Rose)
    case 1615948893: return 2928496916 // Together Forever -> Micro-Missle (Unfall)
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
