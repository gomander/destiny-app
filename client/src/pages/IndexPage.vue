<template>
  <q-page class="items-center justify-evenly q-pa-md">
    <h1>Destiny</h1>

    <div class="row q-gutter-md q-pb-md">
      <q-btn
        label="Authorize"
        :href="authUrl"
      />

      <q-btn
        label="Get profile data"
        @click="getProfileData()"
      />
    </div>

    <div>
      These buttons do stuff but it's not used anywhere yet. For now just ignore
      them and check out the other pages in the sidebar/hamburger menu.
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store'
import * as api from 'src/utils/api'

const userStore = useUserStore()

const authUrl = api.authorizationURL()

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
</script>