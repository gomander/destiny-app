<template></template>

<script setup lang="ts">
import { DestinyInventoryItemDefinition, DestinyPresentationNodeDefinition } from 'bungie-api-ts/destiny2'
import { useGameStore } from 'src/stores/game-store'
import { useDefinitionsStore } from 'src/stores/definitions-store'
import {
  BungieDamageType, BungieItemSubType, BungieAmmoType, BungieWeaponSlot,
  BungieWeaponStat, RaidTriumphCategories
} from 'src/types/bungie'
import * as api from 'src/utils/api'
import {
  DamageTypeEnum, WeaponType, AmmoType, WeaponSlot, Weapon
} from 'src/types/models'
import { isOldDuplicate, swapUniqueFrames } from 'src/utils/weapon-util'
import { xpRewardTiers } from 'src/data/xp-modifiers'

const gameStore = useGameStore()
const definitionsStore = useDefinitionsStore()

const getManifest = async () => {
  const res = await api.getDestinyManifest()
  definitionsStore.manifest = res.Response
}

getManifest().then(async () => {
  await getDamageTypeDefinitions()
  await Promise.all([
    getInventoryItemDefinitions(),
    getPresentationNodeDefinitions()
  ])
})

const getDamageTypeDefinitions = async () => {
  if (Object.keys(definitionsStore.damageTypeDefinitions).length) return
  const res = await api.getDestinyManifestDefinition(
    definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyDamageTypeDefinition
  )
  for (const key in res) {
    if (res[key].displayProperties.name === 'Raid') continue
    definitionsStore.damageTypeDefinitions[key] = res[key]
  }
}

const createWeapon = (item: DestinyInventoryItemDefinition): Weapon => {
  const frameHash = swapUniqueFrames(item.sockets?.socketEntries[0].singleInitialItemHash!)
  const weapon: Weapon = {
    name: item.displayProperties.name,
    damageType: BungieDamageType[item.defaultDamageType] as DamageTypeEnum,
    damageTypeHash: item.damageTypeHashes[0],
    weaponType: BungieItemSubType[item.itemSubType] as WeaponType,
    ammoType: BungieAmmoType[item.equippingBlock!.ammoType] as AmmoType,
    slot: BungieWeaponSlot[item.equippingBlock!.equipmentSlotTypeHash] as WeaponSlot,
    frame: definitionsStore.weaponFrameDefinitions[frameHash].displayProperties.name,
    frameHash,
    icon: 'https://www.bungie.net' + item.displayProperties.icon,
    hash: item.hash
  }
  if (
    [
      BungieItemSubType['auto rifle'],
      BungieItemSubType['shotgun'],
      BungieItemSubType['machine gun'],
      BungieItemSubType['hand cannon'],
      BungieItemSubType['fusion rifle'],
      BungieItemSubType['sniper rifle'],
      BungieItemSubType['pulse rifle'],
      BungieItemSubType['scout rifle'],
      BungieItemSubType['sidearm'],
      BungieItemSubType['linear fusion rifle'],
      BungieItemSubType['submachine gun'],
      BungieItemSubType['trace rifle']
    ].includes(item.itemSubType as unknown as BungieItemSubType)
  ) {
    weapon.stats = {
      range: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.range)!.value,
      stability: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.stability)!.value,
      handling: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.handling)!.value,
      reloadSpeed: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.reloadSpeed)!.value,
      zoom: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.zoom)!.value,
      aimAssistance: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.aimAssistance)!.value,
      airborneEffectiveness: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.airborneEffectiveness)!.value,
      recoilDirection: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.recoilDirection)!.value,
      magazine: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.magazine)!.value,
      inventorySize: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.inventorySize)!.value,
    }
  }
  return weapon
}

const getInventoryItemDefinitions = async () => {
  if (!definitionsStore.manifest.jsonWorldComponentContentPaths) await getManifest()
  const items = await api.getDestinyManifestDefinition(
    definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition
  ) as { [n: number]: DestinyInventoryItemDefinition }

  const xpHashes = xpRewardTiers.map(tier => tier.hash)

  for (const key of Object.keys(items)) {
    const item = items[Number(key)]
    if (
      item.itemType === 19 && // mod
      item.itemCategoryHashes?.includes(2237038328) // intrinsic
    ) {
      definitionsStore.weaponFrameDefinitions[key] = item
    }

    if (
      item.itemType === 3 && // weapon
      item.itemCategoryHashes?.includes(1) && // weapon
      item.quality?.currentVersion === item.quality!.versions.length - 1 && // newest version
      item.quality.versions[item.quality.currentVersion].powerCapHash === 2759499571 // 999990
    ) {
      definitionsStore.weaponDefinitions[key] = item
    }

    if (
      item.itemType === 26 && // bounty
      item.value.itemValue.filter(entry => xpHashes.includes(entry.itemHash)) // XP, XP+, or XP++
    ) {
      definitionsStore.bountyDefinitions[key] = item
    }
  }

  gameStore.weapons = []
  gameStore.craftableWeapons = []

  for (const key in definitionsStore.weaponDefinitions) {
    const item = definitionsStore.weaponDefinitions[Number(key)]
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

  for (const key in definitionsStore.bountyDefinitions) {
    const item = definitionsStore.bountyDefinitions[Number(key)]
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

  gameStore.weaponFrames = []

  for (const key in definitionsStore.weaponFrameDefinitions) {
    const item = definitionsStore.weaponFrameDefinitions[Number(key)]
    gameStore.weaponFrames.push({
      name: item.displayProperties.name,
      icon: item.displayProperties.icon,
      description: item.displayProperties.description,
      hash: item.hash
    })
  }

  gameStore.damageTypes = []

  for (const key in definitionsStore.damageTypeDefinitions) {
    const damageType = definitionsStore.damageTypeDefinitions[Number(key)]
    gameStore.damageTypes.push({
      name: damageType.displayProperties.name,
      icon: damageType.displayProperties.icon,
      description: damageType.displayProperties.description,
      hash: damageType.hash
    })
  }
}

const getPresentationNodeDefinitions = async () => {
  console.log(definitionsStore.manifest.jsonWorldComponentContentPaths.en)
  if (!definitionsStore.manifest.jsonWorldComponentContentPaths) await getManifest()
  const nodes = await api.getDestinyManifestDefinition(
    definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyPresentationNodeDefinition
  ) as { [n: number]: DestinyPresentationNodeDefinition }

  gameStore.raidTriumphs = []

  for (const key of Object.keys(nodes)) {
    const node = nodes[Number(key)]

    if (Object.values(RaidTriumphCategories).includes(node.hash)) {
      definitionsStore.presentationNodeDefinitions[key] = node
      gameStore.raidTriumphs.push({
        name: node.displayProperties.name,
        hash: node.hash,
        triumphHashes: node.children.records.map(record => record.recordHash)
      })
    }
  }
}

const getRecordDefinitions = async () => {

}
</script>