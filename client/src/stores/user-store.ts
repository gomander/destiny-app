import { defineStore } from 'pinia'
import { Weapon } from 'src/components/models'
import {
  DestinyManifest, DestinyInventoryItemDefinition, DestinyDamageTypeDefinition
} from 'bungie-api-ts/destiny2'

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
      inventoryItemDefinitions: {} as { [n: number]: DestinyInventoryItemDefinition },
      craftableWeapons: [] as Weapon[],
      damageTypeDefinitions: {} as { [n: number]: DestinyDamageTypeDefinition },
      weaponFrameDefinitions: [] as DestinyInventoryItemDefinition[]
    }),
    persist: true
  }
)