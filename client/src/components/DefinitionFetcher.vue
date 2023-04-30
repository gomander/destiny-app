<template></template>

<script setup lang="ts">
import { DestinyInventoryItemDefinition } from 'bungie-api-ts/destiny2'
import { useGameStore } from 'src/stores/game-store'
import {
  BungieDamageType, BungieItemSubType, BungieAmmoType, BungieWeaponSlot
} from 'src/types/bungie'
import * as api from 'src/utils/api'
import {
  DamageType, WeaponType, AmmoType, WeaponSlot, WeaponFrame
} from './models'

const gameStore = useGameStore()

const getManifest = async () => {
  const res = await api.getDestinyManifest()
  gameStore.manifest = res.Response
}

getManifest().then(() => {
  getDamageTypeDefinitions().then(() => {
    getInventoryItemDefinitions()
  })
})

const getDamageTypeDefinitions = async () => {
  if (Object.keys(gameStore.damageTypeDefinitions).length) return
  const res = await api.getDestinyManifestDefinition(
    gameStore.manifest.jsonWorldComponentContentPaths.en.DestinyDamageTypeDefinition
  )
  for (const key in res) {
    if (res[key].displayProperties.name === 'Raid') continue
    gameStore.damageTypeDefinitions[key] = res[key]
  }
}

const getInventoryItemDefinitions = async () => {
  if (!gameStore.manifest.jsonWorldComponentContentPaths) await getManifest()
  const items = await api.getDestinyManifestDefinition(
    gameStore.manifest.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition
  ) as { [n: number]: DestinyInventoryItemDefinition }

  for (const key of Object.keys(items)) {
    const hash = Number(key)
    if (
      items[hash].itemType === 19 && // mod
      items[hash].itemCategoryHashes?.includes(2237038328) // intrinsic
    ) {
      gameStore.weaponFrameDefinitions[key] = items[hash]
    }

    if (
      items[hash].itemType === 3 && // weapon
      items[hash].itemCategoryHashes?.includes(1) && // weapon
      items[hash].quality?.versions.find( // unsunset
        (version) => version.powerCapHash === 2759499571 // 999990
      )
    ) {
      gameStore.weaponDefinitions[key] = items[hash]
    }
  }

  const getFrameNameFromHash = (hash: number) => {
    const frame = gameStore.weaponFrameDefinitions[hash]
    if (frame.displayProperties.description === 'Well-rounded, reliable, fires a 3-round burst.') {
      return 'adaptive burst'
    }
    return frame.displayProperties.name
      .toLowerCase()
      .replace('frame', '')
      .replace('glaive', '')
      .replace('häkke', '')
      .replace('omolon', '')
      .replace('veist', '')
      .replace('suros', '')
      .replace('mida synergy', 'lightweight')
      .replace('together forever', 'adaptive')
      .replace('legacy pr-55', 'lightweight')
      .trim()
  }

  for (const key in gameStore.weaponDefinitions) {
    const item = gameStore.weaponDefinitions[Number(key)]
    if (
      item.inventory?.recipeItemHash &&
      item.summaryItemHash === 3520001075 && // legendary
      item.sockets?.socketEntries[12]?.singleInitialItemHash !== 253922071 // empty enhancement socket
    ) {
      gameStore.craftableWeapons.push({
        name: item.displayProperties.name,
        damageType: BungieDamageType[item.defaultDamageType] as DamageType,
        damageTypeHash: item.damageTypeHashes[0],
        weaponType: BungieItemSubType[item.itemSubType] as WeaponType,
        ammoType: BungieAmmoType[item.equippingBlock!.ammoType] as AmmoType,
        slot: BungieWeaponSlot[item.equippingBlock!.equipmentSlotTypeHash] as WeaponSlot,
        frame: getFrameNameFromHash(item.sockets!.socketEntries[0].singleInitialItemHash) as WeaponFrame,
        frameHash: item.sockets?.socketEntries[0].singleInitialItemHash!,
        icon: 'https://www.bungie.net' + item.displayProperties.icon
      })
    }
  }
}
</script>