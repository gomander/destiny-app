import {
  DestinyClass, DestinyItemSubType, DestinyObjectiveProgress, TierType
} from 'bungie-api-ts/destiny2'

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
  frame: string
  frameHash: number
  icon: string
  hash: number
  stats?: WeaponStats
}

export interface WeaponStats {
  range: number
  stability: number
  handling: number
  reloadSpeed: number
  zoom: number
  aimAssistance: number
  airborneEffectiveness: number
  recoilDirection: number
  magazine: number
  inventorySize: number
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

export type GameMode = 'pve' | 'pvp'

export interface Triumph {
  name: string
  description: string
  icon?: string
  hash: number
  required: boolean
}

export interface TriumphPlayer extends Triumph {
  complete: boolean | undefined
  objectives: DestinyObjectiveProgress[]
}

export interface TriumphCategory {
  name: string
  hash: number
  triumphHashes: number[]
  triumphs: Triumph[]
}

export interface PlayerTriumphs {
  name: string
  discriminator: string
  id: string
  triumphs: TriumphPlayer[]
}

export interface BungieMember {
  id: string
  type: number
  name: string
  code: number
}

export interface Group {
  creator: BungieMember
  players: BungieMember[]
}

export interface Armor {
  name: string
  icon: string
  hash: number
  slot: DestinyItemSubType
  class: DestinyClass
  rarity: TierType
  ornaments: number[]
  seasonIcon: string
}

export interface DarciApiError {
  status: 'error'
  data: { error: any }
}

export interface DarciApiSuccess<T> {
  status: 'success'
  data: T
}

export type DarciApiResponse<T> = DarciApiError | DarciApiSuccess<T>

export interface BungieTokens {
  access_token: string
  membership_id: string
}
