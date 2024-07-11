<template></template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDefinitionsStore } from 'src/stores/definitions-store'
import { useGameStore } from 'src/stores/game-store'
import * as api from 'src/utils/api'
import { isOldDuplicate, swapUniqueFrames } from 'src/utils/weapon-util'
import { filteredTriumphs } from 'src/utils/triumph-util'
import { showError } from 'src/utils/messenger'
import {
  DestinyDamageTypeDefinition, DestinyInventoryItemDefinition,
  DestinyItemSubType, DestinyItemType, DestinyPlugSetDefinition,
  DestinyPresentationNodeDefinition, DestinyRecordDefinition, TierType
} from 'bungie-api-ts/destiny2'
import {
  BungieDamageType, BungieItemSubType, BungieAmmoType, BungieWeaponSlot,
  BungieWeaponStat, DamageTypeEnum, WeaponType, AmmoType, WeaponSlot, Weapon,
  RaidTitleTriumphCategories, RaidTriumphCategories
} from 'src/types'
import { xpRewardTiers } from 'src/data/xp-modifiers'

const gameStore = useGameStore()
const definitionsStore = useDefinitionsStore()

onMounted(async () => {
  try {
    await getManifest()
    await Promise.all([
      getDamageTypeDefinitions(),
      getPlugSetDefinitions()
    ])
    await Promise.all([
      getInventoryItemDefinitions(),
      getRecordDefinitions(),
      getPresentationNodeDefinitions()
    ])
    fillTriumphCategories()
  } catch (error) {
    showError(error)
  }
})

async function getManifest() {
  try {
    definitionsStore.manifest = await api.getDestinyManifest()
  } catch (error) {
    showError(error)
  }
}

async function getDamageTypeDefinitions() {
  if (Object.keys(definitionsStore.damageTypeDefinitions).length) return
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

function createWeapon(item: DestinyInventoryItemDefinition): Weapon {
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
      range: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.range)?.value || 0,
      stability: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.stability)?.value || 0,
      handling: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.handling)?.value || 0,
      reloadSpeed: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.reloadSpeed)?.value || 0,
      zoom: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.zoom)?.value || 0,
      aimAssistance: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.aimAssistance)?.value || 0,
      airborneEffectiveness: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.airborneEffectiveness)?.value || 0,
      recoilDirection: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.recoilDirection)?.value || 0,
      magazine: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.magazine)?.value || 0,
      inventorySize: item.investmentStats.find(entry => entry.statTypeHash === BungieWeaponStat.inventorySize)?.value || 0,
    }
  }
  return weapon
}

async function getInventoryItemDefinitions() {
  if (!definitionsStore.manifest) return

  if (gameStore.manifestVersion === definitionsStore.manifest.version) return

  const items = await api.getDestinyManifestDefinition<DestinyInventoryItemDefinition>(
    definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition
  )

  const xpHashes = xpRewardTiers.map(tier => tier.hash)

  for (const key of Object.keys(items)) {
    const item = items[Number(key)]
    if (
      item.itemType === DestinyItemType.Mod &&
      item.itemCategoryHashes?.includes(2237038328) // intrinsic
    ) {
      definitionsStore.weaponFrameDefinitions[key] = item
    }

    if (
      item.itemType === DestinyItemType.Weapon &&
      item.itemCategoryHashes?.includes(1) && // weapon
      item.quality?.currentVersion === item.quality!.versions.length - 1 // newest version
    ) {
      definitionsStore.weaponDefinitions[key] = item
    }

    if (
      item.itemType === DestinyItemType.Bounty &&
      item.value.itemValue.filter(entry => xpHashes.includes(entry.itemHash)) // XP, XP+, or XP++
    ) {
      definitionsStore.bountyDefinitions.set(key, item)
    }

    if (
      item.itemType === DestinyItemType.Armor &&
      item.inventory?.tierType === TierType.Exotic &&
      item.collectibleHash // newest version
    ) {
      definitionsStore.armorDefinitions.set(key, item)
    }

    if (
      item.itemType === DestinyItemType.Mod &&
      item.itemSubType === DestinyItemSubType.Ornament &&
      item.inventory?.tierType === TierType.Exotic
    ) {
      gameStore.ornaments.push({
        name: item.displayProperties.name,
        icon: 'https://www.bungie.net' + item.displayProperties.icon,
        hash: item.hash
      })
    }
  }

  gameStore.manifestVersion = definitionsStore.manifest.version
  gameStore.weapons = []
  gameStore.craftableWeapons = []

  for (const key in definitionsStore.weaponDefinitions) {
    const item = definitionsStore.weaponDefinitions[Number(key)]
    if (
      item.inventory?.tierType === TierType.Superior &&
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

  gameStore.armor = []

  definitionsStore.armorDefinitions.forEach(item => {
    const ornaments: number[] = []
    const cosmeticSocketIndexes = item.sockets?.socketCategories.find(
      category => category.socketCategoryHash === 1926152773
    )?.socketIndexes || []
    if (cosmeticSocketIndexes.length > 1) {
      ornaments.push(
        ...definitionsStore.plugSetDefinitions.get(
          String(
            item.sockets?.socketEntries[
              cosmeticSocketIndexes.at(-1)!
            ].reusablePlugSetHash
          )
        )?.reusablePlugItems.map(item => item.plugItemHash).slice(1) || []
      )
    }
    gameStore.armor.push({
      name: item.displayProperties.name,
      icon: 'https://www.bungie.net' + item.displayProperties.icon,
      hash: item.hash,
      slot: item.itemSubType,
      class: item.classType,
      rarity: item.inventory!.tierType,
      ornaments,
      seasonIcon: item.iconWatermark
    })
  })
}

async function getPresentationNodeDefinitions() {
  if (!definitionsStore.manifest) return
  try {
    const nodes = await api.getDestinyManifestDefinition<DestinyPresentationNodeDefinition>(
      definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyPresentationNodeDefinition
    )
    for (const key of Object.keys(nodes)) {
      const node = nodes[Number(key)]
      definitionsStore.presentationNodeDefinitions.set(key, node)
    }
  } catch (error) {
    showError(error)
  }
}

async function getRecordDefinitions() {
  if (!definitionsStore.manifest) return
  try {
    const records = await api.getDestinyManifestDefinition<DestinyRecordDefinition>(
      definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyRecordDefinition
    )
    for (const key of Object.keys(records)) {
      const record = records[Number(key)]
      definitionsStore.recordDefinitions.set(key, record)
    }
  } catch (error) {
    showError(error)
  }
}

function fillTriumphCategories() {
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

async function getPlugSetDefinitions() {
  if (!definitionsStore.manifest) return
  try {
    const plugSets = await api.getDestinyManifestDefinition<DestinyPlugSetDefinition>(
      definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyPlugSetDefinition
    )
    for (const key of Object.keys(plugSets)) {
      const plugSet = plugSets[Number(key)]
      definitionsStore.plugSetDefinitions.set(key, plugSet)
    }
  } catch (error) {
    showError(error)
  }
}
</script>
