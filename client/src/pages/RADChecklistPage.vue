<template>
  <q-page class="q-pa-md flex-col gap">
    <h1>Raid and Dungeon Checklist</h1>

    <div
      class="flex-col gap"
      v-if="!showCreateGroupForm"
    >
      <div class="flex gap-sm">
        <q-btn
          color="primary"
          no-caps unelevated
          @click="showCreateGroupForm = true"
          :disable="!userStore.membershipId"
        >
          Create new group
        </q-btn>

        <authenticate-button v-if="!userStore.membershipId"/>
      </div>

      <create-group-form
        v-if="!groupId && showCreateGroupForm"
        v-on:create-group="createNewGroup"
      />
    </div>

    <group-form
      :groupId="groupId"
      v-on:go-to-group="goToGroup"
      v-on:go-to-solo="goToSolo"
    />

    <div class="flex gap-sm">
      <q-btn
        v-for="raid of raids"
        :label="raid.name"
        no-caps unelevated
        color="primary"
        :to="`${path}/${raid.id}`"
        :disable="route.path.includes(raid.id)"
      />
    </div>

    <triumphs-list-solo
      v-if="!groupId"
      :triumphs="currentRaidTriumphs"
    />

    <triumphs-list-group
      v-else
      :title="currentRaid.name"
      :triumphs="currentRaidTriumphs"
      :groupId="groupId"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from 'src/stores/game-store'
import { useUserStore } from 'src/stores/user-store'
import AuthenticateButton from 'src/components/AuthenticateButton.vue'
import TriumphsListSolo from 'src/components/TriumphsListSolo.vue'
import TriumphsListGroup from 'src/components/TriumphsListGroup.vue'
import CreateGroupForm from 'src/components/CreateGroupForm.vue'
import GroupForm from 'src/components/GroupForm.vue'
import { createGroup } from 'src/utils/firebase'
import { Group } from 'src/types/models'

const route = useRoute()
const router = useRouter()
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

const groupId = computed(() => route.params.id as string)

const path = computed(() => `/rad-checklist${groupId.value ? `/${groupId.value}` : ''}`)

const currentRaid = computed(() =>
  raids.find(raid => raid.id === route.path.split('/').at(-1)) ||
  { name: '', id: '' }
)
const currentRaidTriumphs = computed(
  () => gameStore.raidTriumphs.find(
    entry => entry.name === currentRaid.value.name
  )?.triumphs || []
)

const createNewGroup = async (group: Group) => {
  const path = await createGroup(group)
  goToGroup(path)
}

const goToGroup = (groupId: string) => {
  router.push(`/rad-checklist/${groupId}/${currentRaid.value.id || ''}`)
}

const goToSolo = () => {
  router.push(`/rad-checklist/${currentRaid.value.id || ''}`)
}

const showCreateGroupForm = ref(false)
</script>

<style scoped lang="sass">
.group-input
  max-width: 8em
</style>