import { defineStore } from 'pinia'
import { Bounty, DamageType, Weapon, WeaponFrame } from 'src/components/models'

export const useGameStore = defineStore(
  'game',
  {
    state: () => ({
      weapons: [] as Weapon[],
      craftableWeapons: [] as Weapon[],
      bounties: [] as Bounty[],
      weaponFrames: [] as WeaponFrame[],
      damageTypes: [] as DamageType[]
    }),
    persist: true
  }
)