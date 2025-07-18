import { defineStore } from 'pinia'
import {
  Armor, Bounty, DamageType, Ornament, TriumphCategory, Weapon, WeaponFrame
} from '../types'

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
      armor: [] as Armor[],
      ornaments: [] as Ornament[]
    }),
    persist: true
  }
)
