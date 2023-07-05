<template>
  <q-page class="items-center justify-evenly q-pa-md">
    <h1>Authenticating...</h1>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'
import { useUserStore } from 'src/stores/user-store'
import * as api from 'src/utils/api'

const authStore = useAuthStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.query.state !== authStore.code) return

  const tokens = await api.getAccessTokenFromCode(route.query.code as string)
  console.log(tokens)
  if (!tokens) return
  userStore.accessToken = tokens.access_token
  userStore.membershipId = tokens.membership_id
  const membershipData = await api.getMembershipData(userStore.accessToken)
  if (!membershipData) return
  userStore.bungieNetUser = membershipData.bungieNetUser
  userStore.destinyMemberships = membershipData.destinyMemberships
  userStore.primaryMembershipId = membershipData.primaryMembershipId || membershipData.destinyMemberships[0].membershipId
  userStore.primaryMembershipType = membershipData.destinyMemberships.find(
    membership => membership.membershipId === userStore.primaryMembershipId
  )?.membershipType || membershipData.destinyMemberships[0].membershipType
  userStore.name = membershipData.bungieNetUser.displayName
  userStore.nameCode = membershipData.destinyMemberships[0].bungieGlobalDisplayNameCode || 0
  userStore.bungieMember = {
    id: userStore.primaryMembershipId,
    type: userStore.primaryMembershipType,
    name: userStore.name,
    code: userStore.nameCode
  }

  router.push({ path: authStore.location })
})
</script>