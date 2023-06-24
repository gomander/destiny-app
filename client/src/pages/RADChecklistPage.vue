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

    <div class="row">
      <div class="col">
        <h3 class="col-header">{{ userStore.bungieNetUser.uniqueName }}</h3>
        <ul class="triumph-list q-mt-sm">
          <li
            v-for="triumph of currentRaidTriumphs"
            class="triumph"
            :class="userStore.records.find(record => record.hash === triumph.hash)?.complete ? 'complete' : ''"
          >
            <img
              v-if="triumph.icon"
              :src="'https://bungie.net' + triumph.icon"
              width="32"
              height="32"
            />

            <div>
              <h4 class="triumph-name">{{ triumph.name }}</h4>
              <p class="triumph-description">{{ triumph.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStore } from 'src/stores/game-store'
import { useUserStore } from 'src/stores/user-store'

const route = useRoute()
const gameStore = useGameStore()
const userStore = useUserStore()

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
const currentRaidTriumphs = computed(
  () => gameStore.raidTriumphs.find(
    entry => entry.name === currentRaid.value?.name
  )?.triumphs
)
</script>

<style scoped lang="sass">
.complete
  color: $positive

.col-header
  font-size: 125%

.triumph-list
  list-style-type: none

  .triumph
    display: flex
    align-items: center
    gap: 1em

    &-name
      font-size: 100%
      line-height: 150%
      font-weight: bold

    *
      margin: 0
</style>