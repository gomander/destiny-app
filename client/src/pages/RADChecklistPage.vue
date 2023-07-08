<template>
  <q-page class="q-pa-md flex-col gap">
    <h1>Raid Triumph Checklist</h1>

    <div class="row q-col-gutter-md items-stretch">
      <div class="col-grow col-lg-6">
        <q-card flat>
          <q-card-section class="flex-col gap">
            <div class="text-h6">Create a new group</div>
            <div class="flex-col gap">
              <div
                v-if="!showCreateGroupForm"
                class="flex gap-sm"
              >
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
                v-else
                v-on:create-group="createNewGroup"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-grow col-lg-6">
        <q-card flat>
          <q-card-section class="flex-col gap">
            <div class="text-h6">View an existing group</div>
            <group-form
              :groupId="groupId"
              v-on:go-to-group="goToGroup"
              v-on:go-to-solo="goToSolo"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

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
      :title="currentRaid.name"
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
import { createGroup } from 'src/utils/firebase'
import AuthenticateButton from 'src/components/AuthenticateButton.vue'
import TriumphsListSolo from 'src/components/TriumphsListSolo.vue'
import TriumphsListGroup from 'src/components/TriumphsListGroup.vue'
import CreateGroupForm from 'src/components/CreateGroupForm.vue'
import GroupForm from 'src/components/GroupForm.vue'
import { Group } from 'src/types'

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
  () => gameStore.raidTriumphs.filter(
    entry => entry.name.includes(currentRaid.value.name)
  ).flatMap(entry => entry.triumphs) || []
)

const createNewGroup = async (group: Group) => {
  const path = await createGroup(group)
  if (!path) return
  showCreateGroupForm.value = false
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