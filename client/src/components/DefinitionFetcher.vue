<template></template>

<script setup lang="ts">
import { useDefinitionsStore } from 'src/stores/definitions-store'
import { useGameStore } from 'src/stores/game-store'
import * as api from 'src/utils/api'
import { isOldDuplicate, swapUniqueFrames } from 'src/utils/weapon-util'
import { filteredTriumphs } from 'src/utils/triumph-util'
import {
  DestinyDamageTypeDefinition, DestinyInventoryItemDefinition,
  DestinyItemSubType, DestinyPresentationNodeDefinition, DestinyRecordDefinition
} from 'bungie-api-ts/destiny2'
import {
  BungieDamageType, BungieItemSubType, BungieAmmoType, BungieWeaponSlot,
  BungieWeaponStat, DamageTypeEnum, WeaponType, AmmoType, WeaponSlot, Weapon,
  RaidTitleTriumphCategories, RaidTriumphCategories
} from 'src/types'
import { xpRewardTiers } from 'src/data/xp-modifiers'

const gameStore = useGameStore()
const definitionsStore = useDefinitionsStore()

const getManifest = async () => {
  const manifest = await api.getDestinyManifest()
  if (!manifest) return
  definitionsStore.manifest = manifest
}

getManifest().then(async () => {
  await getDamageTypeDefinitions()
  await Promise.all([
    getInventoryItemDefinitions(),
    getRecordDefinitions(),
    getPresentationNodeDefinitions()
  ])
  fillTriumphCategories()
})

const getDamageTypeDefinitions = async () => {
  if (Object.keys(definitionsStore.damageTypeDefinitions).length) return
  if (!definitionsStore.manifest) await getManifest()
  if (!definitionsStore.manifest) return
  const damageTypes = await api.getDestinyManifestDefinition<DestinyDamageTypeDefinition>(
    definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyDamageTypeDefinition
  )
  for (const key of Object.keys(damageTypes)) {
    const damageType = damageTypes[Number(key)]
    if (damageType.displayProperties.name === 'Raid') continue
    definitionsStore.damageTypeDefinitions[key] = damageType
  }
}

const createWeapon = (item: DestinyInventoryItemDefinition): Weapon => {
  const frameHash = swapUniqueFrames(
    item.sockets?.socketEntries[0].singleInitialItemHash!,
    item.itemSubType
  )
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
      DestinyItemSubType.AutoRifle,
      DestinyItemSubType.Shotgun,
      DestinyItemSubType.Machinegun,
      DestinyItemSubType.HandCannon,
      DestinyItemSubType.FusionRifle,
      DestinyItemSubType.SniperRifle,
      DestinyItemSubType.PulseRifle,
      DestinyItemSubType.ScoutRifle,
      DestinyItemSubType.Sidearm,
      DestinyItemSubType.FusionRifleLine,
      DestinyItemSubType.SubmachineGun,
      DestinyItemSubType.TraceRifle
    ].includes(item.itemSubType)
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
  if (!definitionsStore.manifest) await getManifest()
  if (!definitionsStore.manifest) return
  const items = await api.getDestinyManifestDefinition<DestinyInventoryItemDefinition>(
    definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition
  )

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
      definitionsStore.bountyDefinitions.set(key, item)
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

  definitionsStore.bountyDefinitions.forEach(item => {
    const xpHash = item.value.itemValue.find(entry => xpHashes.includes(entry.itemHash))?.itemHash
    const xp = xpRewardTiers.find(tier => tier.hash === xpHash)?.label
    if (!xp || !xpHash) return
    gameStore.bounties.push({
      name: item.displayProperties.name,
      icon: item.displayProperties.icon,
      hash: item.hash,
      xp,
      xpHash
    })
  })

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
  if (!definitionsStore.manifest) await getManifest()
  if (!definitionsStore.manifest) return
  const nodes = await api.getDestinyManifestDefinition<DestinyPresentationNodeDefinition>(
    definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyPresentationNodeDefinition
  )

  for (const key of Object.keys(nodes)) {
    const node = nodes[Number(key)]
    definitionsStore.presentationNodeDefinitions.set(key, node)
  }
}

const getRecordDefinitions = async () => {
  if (!definitionsStore.manifest) await getManifest()
  if (!definitionsStore.manifest) return
  const records = await api.getDestinyManifestDefinition<DestinyRecordDefinition>(
    definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyRecordDefinition
  )

  for (const key of Object.keys(records)) {
    const record = records[Number(key)]
    definitionsStore.recordDefinitions.set(key, record)
  }
}

const fillTriumphCategories = () => {
  if (
    !definitionsStore.presentationNodeDefinitions.size ||
    !definitionsStore.recordDefinitions.size
  ) return
  const raidTriumphCategories = Object.values(RaidTriumphCategories)
  const raidTitleTriumphCategories = Object.values(RaidTitleTriumphCategories)
  gameStore.raidTriumphs = []
  definitionsStore.presentationNodeDefinitions.forEach((node, hash) => {
    if (raidTitleTriumphCategories.includes(Number(hash))) {
      gameStore.raidTriumphs.push({
        name: node.displayProperties.name,
        hash: node.hash,
        triumphHashes: node.children.records.map(
          record => record.recordHash
        ).filter(record => !filteredTriumphs.includes(record)),
        triumphs: []
      })
    }
  })
  definitionsStore.presentationNodeDefinitions.forEach((node, hash) => {
    if (raidTriumphCategories.includes(Number(hash))) {
      const titleCategory = gameStore.raidTriumphs.find(
        category => category.name === node.displayProperties.name
      )
      if (!titleCategory) return
      titleCategory.triumphHashes = [...new Set([
        titleCategory.triumphHashes,
        node.children.records.map(
          records => records.recordHash
        ).filter(record => !filteredTriumphs.includes(record))
      ].flat())]
    }
  })
  gameStore.raidTriumphs.forEach(triumphCategory => {
    triumphCategory.triumphHashes.forEach(hash => {
      const record = definitionsStore.recordDefinitions.get(String(hash))
      if (!record) return
      const required = !!definitionsStore.presentationNodeDefinitions.get(
        String(triumphCategory.hash)
      )?.children.records.find(r => r.recordHash === record.hash)
      triumphCategory.triumphs.push({
        name: record.displayProperties.name,
        description: record.displayProperties.description,
        icon: record.displayProperties.icon,
        hash: record.hash,
        required: required
      })
    })
  })
}
</script>
