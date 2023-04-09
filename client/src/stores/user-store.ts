import { defineStore } from 'pinia'
import { Weapon } from 'src/components/models'

export const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      accessToken: '',
      membershipId: '',
      bungieNetUser: {} as any,
      destinyMemberships: [] as any[],
      primaryMembershipId: '',
      manifest: {} as any,
      inventoryItemDefinitions: {} as any,
      craftableWeapons: [] as Weapon[]
    }),
    persist: true
  }
)