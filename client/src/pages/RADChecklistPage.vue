<template>
  <q-page class="q-pa-md q-gutter-y-md">
    <h1>Raid and Dungeon Checklist</h1>

    <div v-if="route.params.id">
      {{ route.params.id }}
    </div>

    <div v-else>
      <q-btn
        label="Create group"
        no-caps
        color="primary"
      />
    </div>

    <div class="row q-gutter-sm">
      <q-btn
        v-for="raid of raids"
        :label="raid.title"
        no-caps
        color="primary"
        :to="`${path}/${raid.id}`"
        :disable="route.path.includes(raid.id)"
      />
    </div>

    <router-view/>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const path = computed(() => `/rad-checklist${route.params.id ? `/${route.params.id}` : ''}`)

const raids = [
  {
    title: 'Last Wish',
    id: 'last-wish'
  },
  {
    title: 'Garden of Salvation',
    id: 'garden-of-salvation'
  },
  {
    title: 'Deep Stone Crypt',
    id: 'deep-stone-crypt'
  },
  {
    title: 'Vault of Glass',
    id: 'vault-of-glass'
  },
  {
    title: 'Vow of the Disciple',
    id: 'vow-of-the-disciple'
  },
  {
    title: 'King\'s Fall',
    id: 'kings-fall'
  },
  {
    title: 'Root of Nightmares',
    id: 'root-of-nightmares'
  }
]
</script>