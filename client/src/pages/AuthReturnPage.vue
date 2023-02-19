<template>
  <q-page class="items-center justify-evenly q-pa-md">
    <h1>Authenticating...</h1>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store'
import { useRoute, useRouter } from 'vue-router'
import * as api from 'src/utils/api'
import { onMounted } from 'vue'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const tokens = await api.getAccessTokenFromCode(route.query.code as string)
  userStore.accessToken = tokens.access_token
  userStore.membershipId = tokens.membership_id
  const membershipData = await api.getMembershipData(userStore.accessToken)
  userStore.bungieNetUser = membershipData.Response.bungieNetUser
  userStore.destinyMemberships = membershipData.Response.destinyMemberships
  userStore.primaryMembershipId = membershipData.Response.primaryMembershipId
  router.push({ path: '/' })
})
</script>