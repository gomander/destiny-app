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
  if (frameHash === 216781713) return 3419274965 // häkke precision
  if (frameHash === 31057037) return 3449390870 // omolon adaptive
  if (frameHash === 3364911712) return 3920852688 // veist rapid-fire
  return frameHash
}

export const cleanUpFrameName = (frame: string) => {
  return frame
    .replace('Frame', '')
    .replace('Glaive', '')
}