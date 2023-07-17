import { defineStore } from 'pinia'
import {
  DestinyManifest, DestinyInventoryItemDefinition, DestinyDamageTypeDefinition,
  DestinyPresentationNodeDefinition, DestinyRecordDefinition
} from 'bungie-api-ts/destiny2'

export const useDefinitionsStore = defineStore(
  'definitions',
  {
    state: () => ({
      manifest: null as DestinyManifest | null,
      damageTypeDefinitions: {} as { [k: string]: DestinyDamageTypeDefinition },
      weaponDefinitions: {} as { [k: string]: DestinyInventoryItemDefinition },
      weaponFrameDefinitions: {} as { [k: string]: DestinyInventoryItemDefinition },
      bountyDefinitions: new Map<string, DestinyInventoryItemDefinition>(),
      presentationNodeDefinitions: new Map<string, DestinyPresentationNodeDefinition>(),
      recordDefinitions: new Map<string, DestinyRecordDefinition>()
    }),
    persist: false
  }
)