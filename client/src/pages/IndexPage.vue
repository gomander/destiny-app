<template>
  <q-page class="items-center justify-evenly q-pa-md">
    <h1>Destiny</h1>

    <q-btn
      label="Authorize"
      :href="authUrl"
    />

    <q-btn
      label="Get manifest"
      @click="getManifest()"
    />

    <q-btn
      label="Get profile data"
      @click="getProfileData()"
    />

    <q-btn
      label="Get inventory item definitions"
      @click="getInventoryItemDefinitions()"
    />

    <div class="row wrap">
      <div style="width: 96px; height: 96px; background-image: url('https://www.bungie.net/common/destiny2_content/icons/0b00492a2f9613854b867c2b054a3784.jpg');">
      </div>
      <img src="https://www.bungie.net/common/destiny2_content/icons/0b00492a2f9613854b867c2b054a3784.jpg">
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store'
import {
  AmmoType, DamageType, WeaponFrame, WeaponType, WeaponSlot
} from 'src/components/models'
import {
  BungieAmmoType, BungieDamageType, BungieItemSubType, BungieRarity,
  BungieWeaponSlot
} from 'src/types/bungie';
import * as api from 'src/utils/api'

const userStore = useUserStore()

const authUrl = api.authorizationURL()

const getManifest = async () => {
  const res = await api.getDestinyManifest()
  userStore.manifest = res.Response
  console.log(userStore.manifest)
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
    userStore.inventoryItemDefinitions = await api.getDestinyManifestDefinition(
      userStore.manifest.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition
    )
  }

  const getFrameNameFromHash = (hash: number) => {
    const frame = userStore.inventoryItemDefinitions[hash]
    return (frame.displayProperties.name as string)
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
    const item = userStore.inventoryItemDefinitions[key]
    if (item.inventory?.recipeItemHash && item.inventory?.tierType === BungieRarity['legendary']) {
      userStore.craftableWeapons.push({
        name: item.displayProperties.name,
        damageType: BungieDamageType[item.defaultDamageType] as DamageType,
        weaponType: BungieItemSubType[item.itemSubType] as WeaponType,
        season: 1,
        ammoType: BungieAmmoType[item.equippingBlock.ammoType] as AmmoType,
        slot: BungieWeaponSlot[item.equippingBlock.equipmentSlotTypeHash] as WeaponSlot,
        frame: getFrameNameFromHash(item.sockets.socketEntries[0].singleInitialItemHash) as WeaponFrame
      })
    }
  }
  console.log(userStore.craftableWeapons)
}
</script>