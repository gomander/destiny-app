import { defineStore } from 'pinia'
import type { DamageType, TriumphCategory, Weapon, WeaponFrame } from '../types'

export const useGameStore = defineStore(
  'game',
  {
    state: () => ({
      manifestVersion: '',
      appVersion: Number(process.env.VERSION),
      weapons: [] as Weapon[],
      weaponFrames: [] as WeaponFrame[],
      damageTypes: [] as DamageType[],
      raidTriumphs: [] as TriumphCategory[]
    }),
    persist: true
  }
)
