export enum DamageTypeEnum {
  Kinetic = 'kinetic',
  Void = 'void',
  Arc = 'arc',
  Solar = 'solar',
  Stasis = 'stasis',
  Strand = 'strand'
}

export enum WeaponType {
  AutoRifle = 'auto rifle',
  Bow = 'bow',
  FusionRifle = 'fusion rifle',
  Glaive = 'glaive',
  GrenadeLauncher = 'grenade launcher',
  HandCannon = 'hand cannon',
  LinearFusionRifle = 'linear fusion rifle',
  MachineGun = 'machine gun',
  PulseRifle = 'pulse rifle',
  RocketLauncher = 'rocket launcher',
  ScoutRifle = 'scout rifle',
  Shotgun = 'shotgun',
  Sidearm = 'sidearm',
  SniperRifle = 'sniper rifle',
  SubmachineGun = 'submachine gun',
  Sword = 'sword',
  TraceRifle = 'trace rifle'
}

export enum ExplicitWeaponType {
  AutoRifle = 'auto rifle',
  Bow = 'bow',
  FusionRifle = 'fusion rifle',
  Glaive = 'glaive',
  GrenadeLauncher = 'grenade launcher',
  SpecialGrenadeLauncher = 'special grenade launcher',
  HeavyGrenadeLauncher = 'heavy grenade launcher',
  HandCannon = 'hand cannon',
  LinearFusionRifle = 'linear fusion rifle',
  MachineGun = 'machine gun',
  PulseRifle = 'pulse rifle',
  RocketLauncher = 'rocket launcher',
  ScoutRifle = 'scout rifle',
  Shotgun = 'shotgun',
  Sidearm = 'sidearm',
  SniperRifle = 'sniper rifle',
  SubmachineGun = 'submachine gun',
  Sword = 'sword',
  TraceRifle = 'trace rifle'
}

export enum AmmoType {
  Primary = 'primary',
  Special = 'special',
  Heavy = 'heavy'
}

export enum WeaponSlot {
  Kinetic = 'kinetic',
  Energy = 'energy',
  Power = 'power'
}

export interface Weapon {
  name: string
  damageType: DamageTypeEnum
  damageTypeHash: number
  weaponType: WeaponType
  ammoType: AmmoType
  slot: WeaponSlot
  frameHash: number
  icon: string
  hash: number
}

export interface Bounty {
  name: string,
  icon: string,
  hash: number,
  xp: string
  xpHash: number
}

export interface WeaponFrame {
  name: string,
  icon: string,
  description: string,
  hash: number
}

export interface DamageType {
  name: string,
  icon: string,
  description: string,
  hash: number
}

export enum DestinyIcon {
  AutoRifle = '',
  Bow = '',
  FusionRifle = '',
  Glaive = '',
  GrenadeLauncher = '',
  SpecialGrenadeLauncher = '',
  HeavyGrenadeLauncher = '',
  HandCannon = '',
  LinearFusionRifle = '',
  MachineGun = '',
  PulseRifle = '',
  RocketLauncher = '',
  ScoutRifle = '',
  Shotgun = '',
  Sidearm = '',
  SniperRifle = '',
  SubmachineGun = '',
  Sword = '',
  TraceRifle = '',
  Helmet = '',
  Gauntlets = '',
  ChestArmor = '',
  LegArmor = '',
  ClassArmor = '',
  Primary = '',
  Special = '',
  Heavy = '',
  Titan = '',
  Warlock = '',
  Hunter = '',
  Overload = '',
  Barrier = '',
  Unstoppable = ''
}