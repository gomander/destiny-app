<template></template>

<script setup lang="ts">
import { DestinyInventoryItemDefinition } from 'bungie-api-ts/destiny2'
import { useGameStore } from 'src/stores/game-store'
import {
  BungieDamageType, BungieItemSubType, BungieAmmoType, BungieWeaponSlot
} from 'src/types/bungie'
import * as api from 'src/utils/api'
import { DamageType, WeaponType, AmmoType, WeaponSlot, Weapon } from './models'
import { isOldDuplicate, swapUniqueFrames } from 'src/utils/weapon-util'
import { xpRewardTiers } from 'src/data/xp-modifiers'

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

const createWeapon = (item: DestinyInventoryItemDefinition): Weapon => {
  return {
    name: item.displayProperties.name,
    damageType: BungieDamageType[item.defaultDamageType] as DamageType,
    damageTypeHash: item.damageTypeHashes[0],
    weaponType: BungieItemSubType[item.itemSubType] as WeaponType,
    ammoType: BungieAmmoType[item.equippingBlock!.ammoType] as AmmoType,
    slot: BungieWeaponSlot[item.equippingBlock!.equipmentSlotTypeHash] as WeaponSlot,
    frameHash: swapUniqueFrames(item.sockets?.socketEntries[0].singleInitialItemHash!),
    icon: 'https://www.bungie.net' + item.displayProperties.icon,
    hash: item.hash
  }
}

const getInventoryItemDefinitions = async () => {
  if (!gameStore.manifest.jsonWorldComponentContentPaths) await getManifest()
  const items = await api.getDestinyManifestDefinition(
    gameStore.manifest.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition
  ) as { [n: number]: DestinyInventoryItemDefinition }

  const xpHashes = xpRewardTiers.map(tier => tier.hash)

  for (const key of Object.keys(items)) {
    const item = items[Number(key)]
    if (
      item.itemType === 19 && // mod
      item.itemCategoryHashes?.includes(2237038328) // intrinsic
    ) {
      gameStore.weaponFrameDefinitions[key] = item
    }

    if (
      item.itemType === 3 && // weapon
      item.itemCategoryHashes?.includes(1) && // weapon
      item.quality?.currentVersion === item.quality!.versions.length - 1 && // newest version
      item.quality.versions[item.quality.currentVersion].powerCapHash === 2759499571 // 999990
    ) {
      gameStore.weaponDefinitions[key] = item
    }

    if (
      item.itemType === 26 && // bounty
      item.value.itemValue.filter(entry => xpHashes.includes(entry.itemHash)) // XP, XP+, or XP++
    ) {
      gameStore.bountyDefinitions[key] = item
    }
  }

  gameStore.weapons = []
  gameStore.craftableWeapons = []

  for (const key in gameStore.weaponDefinitions) {
    const item = gameStore.weaponDefinitions[Number(key)]
    if (
      item.inventory?.tierTypeName === 'Legendary' &&
      !/^.+ \((?!Baroque)\w+\)$/.test(item.displayProperties.name) && // adept
      !isOldDuplicate(item.hash)
    ) {
      const weapon = createWeapon(item)
      gameStore.weapons.push(weapon)
      if (
        item.inventory?.recipeItemHash &&
        item.sockets?.socketEntries[12]?.singleInitialItemHash !== 253922071 // empty enhancement socket
      ) {
        gameStore.craftableWeapons.push(weapon)
      }
    }
  }

  gameStore.bounties = []

  for (const key in gameStore.bountyDefinitions) {
    const item = gameStore.bountyDefinitions[Number(key)]
    const xpHash = item.value.itemValue.find(entry => xpHashes.includes(entry.itemHash))?.itemHash
    const xp = xpRewardTiers.find(tier => tier.hash === xpHash)?.label
    if (!(xp && xpHash)) continue
    gameStore.bounties.push({
      name: item.displayProperties.name,
      icon: item.displayProperties.icon,
      hash: item.hash,
      xp,
      xpHash
    })
  }
}
</script>