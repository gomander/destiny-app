<template>
  <q-page class="q-pa-md q-gutter-y-sm">
    <h1>Raid and Dungeon Checklist</h1>

    <div v-if="!groupId">
      <q-btn
        label="Create group"
        no-caps
        color="primary"
      />
    </div>

    <q-form
      class="row q-gutter-sm"
      @submit="goToGroup"
      @reset="goToSolo"
    >
      <q-input
        class="group-input"
        type="text"
        label="Group"
        maxlength="7"
        v-model="groupInput"
        dense filled
      />

      <q-btn
        type="submit"
        color="primary"
        no-caps unelevated
        :disable="!/\w\w\w\-\w\w\w/.test(groupInput)"
      >
        Go
      </q-btn>

      <q-btn
        type="reset"
        color="primary"
        no-caps unelevated
        :disable="!groupId"
      >
        Solo
      </q-btn>
    </q-form>

    <div class="row q-gutter-sm">
      <q-btn
        v-for="raid of raids"
        :label="raid.name"
        no-caps unelevated
        color="primary"
        :to="`${path}/${raid.id}`"
        :disable="route.path.includes(raid.id)"
      />
    </div>

    <TriumphsListSolo
      v-if="!groupId"
      :triumphs="currentRaidTriumphs"
    />

    <TriumphsListGroup
      v-else
      :title="currentRaid?.name"
      :triumphs="currentRaidTriumphs"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from 'src/stores/game-store'
import TriumphsListSolo from 'src/components/TriumphsListSolo.vue'
import TriumphsListGroup from 'src/components/TriumphsListGroup.vue'

const route = useRoute()
const router = useRouter()
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

const groupId = computed(() => route.params.id as string)
const groupInput = ref(groupId.value)
watch(groupId, () => groupInput.value = groupId.value)

const path = computed(() => `/rad-checklist/${groupId.value || ''}`)

const currentRaid = computed(
  () => raids.find(raid => raid.id === route.path.split('/').at(-1))
)
const currentRaidTriumphs = computed(
  () => gameStore.raidTriumphs.find(
    entry => entry.name === currentRaid.value?.name
  )?.triumphs
)

const goToGroup = (e: Event) => {
  e.preventDefault()
  router.push(`/rad-checklist/${groupInput.value}/${currentRaid.value?.id || ''}`)
}

const goToSolo = () => {
  router.push(`/rad-checklist/${currentRaid.value?.id || ''}`)
}
</script>

<style scoped lang="sass">
.group-input
  max-width: 8em
</style>