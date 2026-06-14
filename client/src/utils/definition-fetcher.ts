import { useDefinitionsStore } from '../stores/definitions-store'
import { useGameStore } from '../stores/game-store'
import * as api from '../utils/api'
import { isOldDuplicate, swapUniqueFrames } from '../utils/weapon-util'
import { filteredTriumphs } from '../utils/triumph-util'
import { showError } from '../utils/messenger'
import {
  DestinyDamageTypeDefinition, DestinyInventoryItemDefinition,
  DestinyItemSubType, DestinyItemType, DestinyPresentationNodeDefinition,
  DestinyRecordDefinition, TierType
} from 'bungie-api-ts/destiny2'
import {
  BungieDamageType, BungieItemSubType, BungieAmmoType, BungieWeaponSlot,
  BungieWeaponStat, DamageTypeEnum, WeaponType, AmmoType, WeaponSlot,
  type Weapon, RaidTitleTriumphCategories, RaidTriumphCategories
} from '../types'

const gameStore = useGameStore()
const definitionsStore = useDefinitionsStore()

export async function useDefinitionFetcher() {
  try {
    await getManifest()
    await getDamageTypeDefinitions()
    await Promise.all([
      getInventoryItemDefinitions(),
      getRecordDefinitions()
    ])
    await getPresentationNodeDefinitions()
    console.log('filling triumph categories')
    fillTriumphCategories()
  } catch (error) {
    showError(error)
  }

  async function getManifest() {
    try {
      console.log('getting manifest')
      definitionsStore.manifest = await api.getDestinyManifest()
      console.log('got manifest')
    } catch (error) {
      console.error(error)
      showError(error)
    }
  }

  async function getDamageTypeDefinitions() {
    console.log('getting damage type definitions')
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
    console.log('got damage type definitions')
  }

  function createWeapon(item: DestinyInventoryItemDefinition): Weapon {
    const frameHash = swapUniqueFrames(
      item.sockets?.socketEntries[0].singleInitialItemHash || 0,
      item.itemSubType
    )
    const weapon: Weapon = {
      name: item.displayProperties.name,
      damageType: BungieDamageType[item.defaultDamageType] as DamageTypeEnum,
      damageTypeHash: item.damageTypeHashes[0],
      weaponType: BungieItemSubType[item.itemSubType] as WeaponType,
      ammoType: BungieAmmoType[item.equippingBlock?.ammoType || 0] as AmmoType,
      slot: BungieWeaponSlot[item.equippingBlock?.equipmentSlotTypeHash || 0] as WeaponSlot,
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
    console.log('getting inventory item definitions')

    if (!definitionsStore.manifest) return

    if (gameStore.manifestVersion === definitionsStore.manifest.version) return

    const items = await api.getDestinyManifestDefinition<DestinyInventoryItemDefinition>(
      definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition
    )

    console.log('iterating over inventory items')

    // console.log(JSON.stringify(items))

    for (const key of Object.keys(items)) {
      const item = items[Number(key)]
      // console.log(item.displayProperties.name)
      if (
        item.itemType === DestinyItemType.Mod &&
        item.itemCategoryHashes?.includes(2237038328) // intrinsic
      ) {
        definitionsStore.weaponFrameDefinitions[key] = item
      }

      if (
        item.itemType === DestinyItemType.Weapon &&
        item.itemCategoryHashes?.includes(1) && // weapon
        item.quality?.currentVersion === (item.quality?.versions.length || 0) - 1 // newest version
      ) {
        definitionsStore.weaponDefinitions[key] = item
      }
    }

    console.log('weapons and frames added to definitionsStore')

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

    console.log('manifest version and weapons added to gameStore')

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

    console.log('weapon frames added to gameStore')

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

    console.log('got inventory item definitions')
  }

  async function getPresentationNodeDefinitions() {
    console.log('getting presentation node definitions')
    if (!definitionsStore.manifest) return
    try {
      const nodes = await api.getDestinyManifestDefinition<DestinyPresentationNodeDefinition>(
        definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyPresentationNodeDefinition
      )
      for (const key of Object.keys(nodes)) {
        const node = nodes[Number(key)]
        definitionsStore.presentationNodeDefinitions.set(key, node)
      }
      console.log('got presentation node definitions')
    } catch (error) {
      console.error(error)
      showError(error)
    }
  }

  async function getRecordDefinitions() {
    console.log('getting record definitions')
    if (!definitionsStore.manifest) return
    try {
      const records = await api.getDestinyManifestDefinition<DestinyRecordDefinition>(
        definitionsStore.manifest.jsonWorldComponentContentPaths.en.DestinyRecordDefinition
      )
      for (const key of Object.keys(records)) {
        const record = records[Number(key)]
        definitionsStore.recordDefinitions.set(key, record)
      }
      console.log('got record definitions')
    } catch (error) {
      console.error(error)
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
}
