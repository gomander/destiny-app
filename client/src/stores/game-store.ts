import { defineStore } from 'pinia'
import {
  Bounty, DamageType, TriumphCategory, Weapon, WeaponFrame
} from 'src/types'

export const useGameStore = defineStore(
  'game',
  {
    state: () => ({
      weapons: [] as Weapon[],
      craftableWeapons: [] as Weapon[],
      bounties: [] as Bounty[],
      weaponFrames: [] as WeaponFrame[],
      damageTypes: [] as DamageType[],
      raidTriumphs: [] as TriumphCategory[]
    }),
    persist: true
  }
)