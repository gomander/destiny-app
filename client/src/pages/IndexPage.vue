<template>
  <q-page class="items-center justify-evenly q-pa-md">
    <h1>Destiny</h1>

    <q-btn
      label="Authorize"
      :href="authUrl"
    />

    <q-btn
      label="Get profile data"
      @click="getProfileData()"
    />

    <q-btn
      label="Get inventory item definitions"
      @click="getInventoryItemDefinitions()"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store'
import {
  AmmoType, DamageType, WeaponFrame, WeaponType, WeaponSlot
} from 'src/components/models'
import {
  BungieAmmoType, BungieDamageType, BungieItemSubType, BungieWeaponSlot
} from 'src/types/bungie';
import * as api from 'src/utils/api'

const userStore = useUserStore()

const authUrl = api.authorizationURL()

const getManifest = async () => {
  const res = await api.getDestinyManifest()
  userStore.manifest = res.Response
}

getManifest().then(() => {
  getDamageTypeDefinitions()
})

const getDamageTypeDefinitions = async () => {
  const res = await api.getDestinyManifestDefinition(
    userStore.manifest.jsonWorldComponentContentPaths.en.DestinyDamageTypeDefinition
  )
  for (const damageType in res) {
    userStore.damageTypeDefinitions[Number(damageType)] = res[damageType]
  }
}

const getProfileData = async (
  components = [100, 200, 201]
) => {
  const destinyProfile = await api.getDestinyProfileData(
    components,
    userStore.primaryMembershipId,
    userStore.destinyMemberships.find(
      m => m.membershipId === userStore.primaryMembershipId
    ).membershipType,
    userStore.accessToken
  )
  console.log('Destiny 2 profile:', destinyProfile)
}

const getInventoryItemDefinitions = async () => {
  if (!userStore.manifest.jsonWorldComponentContentPaths) await getManifest()
  if (!Object.keys(userStore.inventoryItemDefinitions).length) {
    const items = await api.getDestinyManifestDefinition(
      userStore.manifest.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition
    )
    for (const item in items) {
      userStore.inventoryItemDefinitions[Number(item)] = items[item]
    }
  }

  const getFrameNameFromHash = (hash: number) => {
    const frame = userStore.inventoryItemDefinitions[hash]!
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

  for (const key in userStore.inventoryItemDefinitions) {
    const item = userStore.inventoryItemDefinitions[Number(key)]
    if (item.inventory?.recipeItemHash) {
      userStore.craftableWeapons.push({
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