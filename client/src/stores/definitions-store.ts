import { defineStore } from 'pinia'
import {
  DestinyManifest, DestinyInventoryItemDefinition, DestinyDamageTypeDefinition
} from 'bungie-api-ts/destiny2'

export const useDefinitionsStore = defineStore(
  'definitions',
  {
    state: () => ({
      manifest: {} as DestinyManifest,
      damageTypeDefinitions: {} as { [k: string]: DestinyDamageTypeDefinition },
      weaponDefinitions: {} as { [k: string]: DestinyInventoryItemDefinition },
      weaponFrameDefinitions: {} as { [k: string]: DestinyInventoryItemDefinition },
      bountyDefinitions: {} as { [k: string]: DestinyInventoryItemDefinition },
    }),
    persist: false
  }
)