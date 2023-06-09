import { defineStore } from 'pinia'
import { Bounty, IDamageType, Weapon, WeaponFrame } from 'src/components/models'

export const useGameStore = defineStore(
  'game',
  {
    state: () => ({
      weapons: [] as Weapon[],
      craftableWeapons: [] as Weapon[],
      bounties: [] as Bounty[],
      weaponFrames: [] as WeaponFrame[],
      damageTypes: [] as IDamageType[]
    }),
    persist: true
  }
)