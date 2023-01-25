import { Weapon, WeaponType, DamageType, AmmoType, WeaponSlot, BowFrame, AutoRifleFrame } from 'src/components/models'

export const weapons: Weapon[] = [
  {
    name: 'Firefright',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.AutoRifle,
    season: 17,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: AutoRifleFrame.Precision
  },
  {
    name: 'Fel Taradiddle',
    damageType: DamageType.Kinetic,
    weaponType: WeaponType.Bow,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Kinetic,
    frame: BowFrame.Lightweight
  },
  {
    name: 'Under Your Skin',
    damageType: DamageType.Void,
    weaponType: WeaponType.Bow,
    season: 16,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: BowFrame.Precision
  },
  {
    name: 'Tripwire Canary',
    damageType: DamageType.Arc,
    weaponType: WeaponType.Bow,
    season: 19,
    ammoType: AmmoType.Primary,
    slot: WeaponSlot.Energy,
    frame: BowFrame.Lightweight
  }
]