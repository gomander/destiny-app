<template>
  <q-page class="items-center justify-evenly q-pa-md">
    <h1>Destiny</h1>

    <q-btn
      label="Authorize"
      :href="authUrl"
    ></q-btn>
  </q-page>
</template>

<script setup lang="ts">
import * as api from 'src/utils/api'

const authUrl = api.authorizationURL()
</script>