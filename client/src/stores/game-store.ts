import { defineStore } from 'pinia'
import {
  Armor, Bounty, DamageType, TriumphCategory, Weapon, WeaponFrame
} from 'src/types'

export const useGameStore = defineStore(
  'game',
  {
    state: () => ({
      manifestVersion: '',
      weapons: [] as Weapon[],
      craftableWeapons: [] as Weapon[],
      bounties: [] as Bounty[],
      weaponFrames: [] as WeaponFrame[],
      damageTypes: [] as DamageType[],
      raidTriumphs: [] as TriumphCategory[],
      armor: [] as Armor[]
    }),
    persist: true
  }
)
