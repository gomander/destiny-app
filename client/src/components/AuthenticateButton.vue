<template>
  <q-btn
    label="Authenticate with Bungie"
    :href="authorizationURL(authStore.code)"
    no-caps
    color="primary"
  >
    <q-tooltip v-if="tooltip">
      {{ tooltip }}
    </q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth-store'
import { authorizationURL } from '../utils/api'

interface Props { tooltip?: string }
const props = defineProps<Props>()

const authStore = useAuthStore()
authStore.location = location.pathname
authStore.code = crypto.randomUUID().split('-')[0]
</script>
