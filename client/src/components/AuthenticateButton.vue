<template>
  <q-btn
    label="Authenticate with Bungie"
    :href="authorizationURL('123')"
    no-caps
    color="primary"
  />
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store'
import { authorizationURL } from 'src/utils/api'

const userStore = useUserStore()

// TODO: generate a random state to mitigate cross site request forgery
</script>