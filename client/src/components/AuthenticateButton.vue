<template>
  <q-btn
    label="Authenticate with Bungie"
    :href="authorizationURL(authStore.code)"
    no-caps
    color="primary"
  />
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth-store'
import { authorizationURL } from 'src/utils/api'

const authStore = useAuthStore()
authStore.location = location.pathname
authStore.code = crypto.randomUUID().split('-')[0]
</script>