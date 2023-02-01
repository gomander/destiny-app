import {
  AmmoType, AutoRifleFrame, BowFrame, DamageType, FusionRifleFrame, GlaiveFrame,
  GrenadeLauncherFrame, HandCannonFrame, HeavyGrenadeLauncherFrame,
  LinearFusionRifleFrame, MachineGunFrame, PulseRifleFrame, RocketLauncherFrame,
  ScoutRifleFrame, ShotgunFrame, SidearmFrame, SniperRifleFrame,
  SpecialGrenadeLauncherFrame, SubmachineGunFrame, SwordFrame, TraceRifleFrame,
  WeaponType
} from 'src/components/models'

export const getFrameTypeFromWeaponType = (weaponType: WeaponType) => {
  if (weaponType === WeaponType.AutoRifle) return AutoRifleFrame
  if (weaponType === WeaponType.Bow) return BowFrame
  if (weaponType === WeaponType.FusionRifle) return FusionRifleFrame
  if (weaponType === WeaponType.Glaive) return GlaiveFrame
  if (weaponType === WeaponType.GrenadeLauncher) return GrenadeLauncherFrame
  if (weaponType === WeaponType.HandCannon) return HandCannonFrame
  if (weaponType === WeaponType.LinearFusionRifle) return LinearFusionRifleFrame
  if (weaponType === WeaponType.MachineGun) return MachineGunFrame
  if (weaponType === WeaponType.PulseRifle) return PulseRifleFrame
  if (weaponType === WeaponType.RocketLauncher) return RocketLauncherFrame
  if (weaponType === WeaponType.ScoutRifle) return ScoutRifleFrame
  if (weaponType === WeaponType.Shotgun) return ShotgunFrame
  if (weaponType === WeaponType.Sidearm) return SidearmFrame
  if (weaponType === WeaponType.SniperRifle) return SniperRifleFrame
  if (weaponType === WeaponType.SubmachineGun) return SubmachineGunFrame
  if (weaponType === WeaponType.Sword) return SwordFrame
  if (weaponType === WeaponType.TraceRifle) return TraceRifleFrame
}

export const getTableTitle = (frame: string, ammoType?: string) => {
  return capitalizeText(frame) + 's'
}

export const capitalizeText = (s: string) => {
  return s.toLowerCase()
    .split('-')
    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
    .join('-')
    .split(' ')
    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

export const getAvailableDamageTypes = (weaponType: WeaponType, ammoType?: AmmoType) => {
  const damageTypes = [
    DamageType.Kinetic,
    DamageType.Stasis,
    DamageType.Void,
    DamageType.Arc,
    DamageType.Solar
  ]
  if (weaponCannotBeKinetic(weaponType, ammoType)) {
    damageTypes.shift()
  }
  return damageTypes
}

const weaponCannotBeKinetic = (weaponType: WeaponType, ammoType?: AmmoType) => {
  return (
    weaponType === WeaponType.FusionRifle ||
    weaponType === WeaponType.Glaive ||
    weaponType === WeaponType.LinearFusionRifle ||
    weaponType === WeaponType.MachineGun ||
    weaponType === WeaponType.RocketLauncher ||
    weaponType === WeaponType.Sword ||
    weaponType === WeaponType.TraceRifle ||
    ammoType === AmmoType.Heavy
  )
}

export const getAvailableFrames = (weaponType: WeaponType, ammoType?: AmmoType) => {
  if (weaponType === WeaponType.GrenadeLauncher) {
    if (ammoType === AmmoType.Special) {
      return SpecialGrenadeLauncherFrame
    }
    if (ammoType === AmmoType.Heavy) {
      return HeavyGrenadeLauncherFrame
    }
  }
  return getFrameTypeFromWeaponType(weaponType)
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