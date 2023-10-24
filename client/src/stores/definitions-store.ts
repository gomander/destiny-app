import { defineStore } from 'pinia'
import {
  DestinyManifest, DestinyInventoryItemDefinition, DestinyDamageTypeDefinition,
  DestinyPresentationNodeDefinition, DestinyRecordDefinition,
  DestinyPlugSetDefinition
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
      recordDefinitions: new Map<string, DestinyRecordDefinition>(),
      armorDefinitions: new Map<string, DestinyInventoryItemDefinition>(),
      plugSetDefinitions: new Map<string, DestinyPlugSetDefinition>()
    }),
    persist: false
  }
)
