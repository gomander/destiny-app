import { defineStore } from 'pinia'
import type {
  DestinyManifest, DestinyInventoryItemDefinition, DestinyDamageTypeDefinition,
  DestinyPresentationNodeDefinition, DestinyRecordDefinition
} from 'bungie-api-ts/destiny2'

export const useDefinitionsStore = defineStore('definitions', {
  state: () => ({
    manifest: null as DestinyManifest | null,
    damageTypeDefinitions: {} as { [k: string]: DestinyDamageTypeDefinition },
    weaponDefinitions: {} as { [k: string]: DestinyInventoryItemDefinition },
    weaponFrameDefinitions: {} as { [k: string]: DestinyInventoryItemDefinition },
    presentationNodeDefinitions: new Map<string, DestinyPresentationNodeDefinition>(),
    recordDefinitions: new Map<string, DestinyRecordDefinition>()
  })
})
