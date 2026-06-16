import { defineStore } from 'pinia'
import type { DamageType, TriumphCategory, Weapon, WeaponFrame } from 'src/types'

export const useGameStore = defineStore('game', {
  state: () => ({
    manifestVersion: '',
    weapons: [] as Weapon[],
    weaponFrames: [] as WeaponFrame[],
    damageTypes: [] as DamageType[],
    raidTriumphs: [] as TriumphCategory[]
  })
})
