import {
  AutoRifleFrame, BowFrame, FusionRifleFrame, GlaiveFrame, GrenadeLauncherFrame,
  HandCannonFrame, LinearFusionRifleFrame, MachineGunFrame, PulseRifleFrame,
  RocketLauncherFrame, ScoutRifleFrame, ShotgunFrame, SidearmFrame,
  SniperRifleFrame, SubmachineGunFrame, SwordFrame, TraceRifleFrame, WeaponType
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
  const text = (ammoType ? ammoType + ' ' : '') + frame
  return capitalizeText(text) + 's'
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