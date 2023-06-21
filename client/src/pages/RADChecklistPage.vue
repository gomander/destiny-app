<template>
  <q-page class="q-pa-md q-gutter-y-md">
    <h1>Raid and Dungeon Checklist</h1>

    <div v-if="groupId">
      Group: {{ groupId }}
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
        :label="raid.name"
        no-caps
        color="primary"
        :to="`${path}/${raid.id}`"
        :disable="route.path.includes(raid.id)"
      />
    </div>

    <router-view/>

    <ul>
      <li
        v-for="triumph of currentRaidTriumphHashes"
      >
        {{ triumph }}
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStore } from 'src/stores/game-store'

const route = useRoute()
const gameStore = useGameStore()

const raids = [
  { name: 'Last Wish', id: 'last-wish' },
  { name: 'Garden of Salvation', id: 'garden-of-salvation' },
  { name: 'Deep Stone Crypt', id: 'deep-stone-crypt' },
  { name: 'Vault of Glass', id: 'vault-of-glass' },
  { name: 'Vow of the Disciple', id: 'vow-of-the-disciple' },
  { name: 'King\'s Fall', id: 'kings-fall' },
  { name: 'Root of Nightmares', id: 'root-of-nightmares' },
]

const groupId = route.params.id
const path = `/rad-checklist${groupId ? `/${groupId}` : ''}`
const currentRaid = computed(
  () => raids.find(raid => raid.id === route.path.split('/').at(-1))
)
const currentRaidTriumphHashes = computed(
  () => gameStore.raidTriumphs.find(
    entry => entry.name === currentRaid.value?.name
  )?.triumphHashes
)
</script>