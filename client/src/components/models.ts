export enum DamageType {
  Kinetic = 'kinetic',
  Void = 'void',
  Arc = 'arc',
  Solar = 'solar',
  Stasis = 'stasis'
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

export type WeaponFrame = AutoRifleFrame | BowFrame | FusionRifleFrame |
  GlaiveFrame | GrenadeLauncherFrame | SpecialGrenadeLauncherFrame |
  HeavyGrenadeLauncherFrame | HandCannonFrame | LinearFusionRifleFrame |
  MachineGunFrame | PulseRifleFrame | RocketLauncherFrame | ScoutRifleFrame |
  ShotgunFrame | SidearmFrame | SniperRifleFrame | SubmachineGunFrame |
  SwordFrame | TraceRifleFrame

export enum AutoRifleFrame {
  HighImpact = 'high-impact',
  Precision = 'precision',
  Adaptive = 'adaptive',
  RapidFire = 'rapid-fire'
}

export enum BowFrame {
  Precision = 'precision',
  Lightweight = 'lightweight'
}

export enum FusionRifleFrame {
  HighImpact = 'high-impact',
  Precision = 'precision',
  Adaptive = 'adaptive',
  RapidFire = 'rapid-fire'
}

export enum GlaiveFrame {
  Adaptive = 'adaptive',
  Aggressive = 'aggressive'
}

export enum GrenadeLauncherFrame {
  Wave = 'wave',
  Lightweight = 'lightweight',
  Adaptive = 'adaptive',
  RapidFire = 'rapid-fire'
}

export enum SpecialGrenadeLauncherFrame {
  Wave = 'wave',
  Lightweight = 'lightweight'
}

export enum HeavyGrenadeLauncherFrame {
  Adaptive = 'adaptive',
  RapidFire = 'rapid-fire'
}

export enum HandCannonFrame {
  Aggressive = 'aggressive',
  Adaptive = 'adaptive',
  Precision = 'precision'
}

export enum LinearFusionRifleFrame {
  Precision = 'precision',
  Aggressive = 'aggressive'
}

export enum MachineGunFrame {
  HighImpact = 'high-impact',
  Adaptive = 'adaptive',
  RapidFire = 'rapid-fire'
}

export enum PulseRifleFrame {
  HighImpact = 'high-impact',
  Adaptive = 'adaptive',
  AggressiveBurst = 'aggressive burst',
  Lightweight = 'lightweight',
  RapidFire = 'rapid-fire'
}

export enum RocketLauncherFrame {
  HighImpact = 'high-impact',
  Precision = 'precision',
  Adaptive = 'adaptive',
  Aggressive = 'aggressive'
}

export enum ScoutRifleFrame {
  HighImpact = 'high-impact',
  Precision = 'precision',
  Lightweight = 'lightweight',
  RapidFire = 'rapid-fire'
}

export enum ShotgunFrame {
  Aggressive = 'aggressive',
  Precision = 'precision',
  PinpointSlug = 'pinpoint slug',
  Lightweight = 'lightweight',
  RapidFire = 'rapid-fire'
}

export enum SidearmFrame {
  Precision ='precision',
  Adaptive = 'adaptive',
  AggressiveBurst = 'aggressive burst',
  Lightweight = 'lightweight',
  RapidFire = 'rapid-fire',
  AdaptiveBurst = 'adaptive burst'
}

export enum SniperRifleFrame {
  Aggressive = 'aggressive',
  Adaptive = 'adaptive',
  RapidFire = 'rapid-fire'
}

export enum SubmachineGunFrame {
  Precision = 'precision',
  Aggressive = 'aggressive',
  Adaptive = 'adaptive',
  Lightweight = 'lightweight'
}

export enum SwordFrame {
  Adaptive = 'adpative',
  Vortex = 'vortex',
  Caster = 'caster'
}

export enum TraceRifleFrame { Adaptive = 'adaptive' }

export interface Weapon {
  name: string
  damageType: DamageType
  weaponType: WeaponType
  season: number
  ammoType: AmmoType
  slot: WeaponSlot
  frame: WeaponFrame
}