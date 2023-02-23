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
}
</script>