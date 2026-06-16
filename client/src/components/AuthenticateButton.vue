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
  import { useAuthStore } from 'stores'
  import { authorizationURL } from 'src/utils/api'

  const props = defineProps<{ tooltip?: string }>()

  const authStore = useAuthStore()

  authStore.prepareAuth(location.pathname)
</script>
