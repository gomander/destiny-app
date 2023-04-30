import { defineStore } from 'pinia'
import { Weapon } from 'src/components/models'
import {
  DestinyManifest, DestinyInventoryItemDefinition, DestinyDamageTypeDefinition
} from 'bungie-api-ts/destiny2'

export const useGameStore = defineStore(
  'game',
  {
    state: () => ({
      manifest: {} as DestinyManifest,
      weapons: [] as Weapon[],
      craftableWeapons: [] as Weapon[],
      damageTypeDefinitions: {} as { [k: string]: DestinyDamageTypeDefinition },
      weaponDefinitions: {} as { [k: string]: DestinyInventoryItemDefinition },
      weaponFrameDefinitions: {} as { [k: string]: DestinyInventoryItemDefinition },
    }),
    persist: true
  }
)