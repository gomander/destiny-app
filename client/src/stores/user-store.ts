import { defineStore } from 'pinia'
import { Weapon } from 'src/components/models'
import { DestinyManifest, DestinyInventoryItemDefinition } from 'bungie-api-ts/destiny2'

export const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      accessToken: '',
      membershipId: '',
      bungieNetUser: {} as any,
      destinyMemberships: [] as any[],
      primaryMembershipId: '',
      manifest: {} as DestinyManifest,
      inventoryItemDefinitions: new Map<number, DestinyInventoryItemDefinition>(),
      craftableWeapons: [] as Weapon[]
    }),
    persist: true
  }
)