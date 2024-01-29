<template>
  <q-page class="q-pa-md flex-col gap">
    <h1>Raid Triumph Checklist</h1>

    <div class="row q-col-gutter-md items-stretch">
      <div class="col-grow col-lg-4">
        <q-card
          class="full-height"
          flat
        >
          <q-card-section class="flex-col gap">
            <div class="text-h6">Lookup user</div>
            <div class="flex gap">
              <find-player-form v-model="player"/>
              <authenticate-button
                v-if="!userStore.membershipId"
                tooltip="Authenticate to automatically see your own triumphs"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-grow col-lg-4">
        <q-card
          class="full-height"
          flat
        >
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

                  <q-tooltip v-if="!userStore.membershipId">
                    Authenticate with Bungie to create a group
                  </q-tooltip>
                </q-btn>
              </div>
              <create-group-form
                v-else
                v-on:create-group="createNewGroup"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-grow col-lg-4">
        <q-card
          class="full-height"
          flat
        >
          <q-card-section class="flex-col gap">
            <div class="text-h6">View an existing group</div>
            <group-form
              :groupId="groupId ?? ''"
              v-on:go-to-group="goToGroup"
              v-on:go-to-solo="goToSolo"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card flat>
      <q-card-section class="flex gap-sm">
        <q-btn
          v-for="raid of raids"
          :label="raid.name"
          no-caps unelevated
          color="primary"
          :to="`${path}/${raid.id}/${urlPlayers?.map(player => player.replace('#', '%23')).join('/')}`"
          :disable="route.path.includes(raid.id)"
        />
      </q-card-section>
    </q-card>

    <triumphs-list-group
      v-if="groupId"
      :title="currentRaid.name"
      :triumphs="currentRaidTriumphs"
      :groupId="groupId"
    />

    <triumphs-list-group
      v-else-if="urlPlayers?.length"
      :title="currentRaid.name"
      :triumphs="currentRaidTriumphs"
      :players="urlPlayers"
    />

    <triumphs-list-solo
      v-else
      :title="currentRaid.name"
      :triumphs="currentRaidTriumphs"
      :player="player"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from 'src/stores/game-store'
import { useUserStore } from 'src/stores/user-store'
import { createGroup } from 'src/utils/firebase'
import AuthenticateButton from 'src/components/AuthenticateButton.vue'
import CreateGroupForm from 'src/components/CreateGroupForm.vue'
import FindPlayerForm from 'src/components/FindPlayerForm.vue'
import GroupForm from 'src/components/GroupForm.vue'
import TriumphsListGroup from 'src/components/TriumphsListGroup.vue'
import TriumphsListSolo from 'src/components/TriumphsListSolo.vue'
import { BungieMember, Group } from 'src/types'
import raids from 'src/data/raids'

const route = useRoute()
const router = useRouter()
const gameStore = useGameStore()
const userStore = useUserStore()

const groupId = computed(() => route.params.id as string | undefined)
const raidId = computed(() => route.params.raid as string | undefined)
const urlPlayers = computed(() => route.params.players as string[] | undefined)

const path = computed(() =>
  `/checklists/raids${groupId.value ? `/${groupId.value}` : ''}`
)

const currentRaid = computed(() =>
  raids.find(raid => raid.id === raidId.value) || { name: '', id: '' }
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
  router.push(`/checklists/raids/${groupId}/${currentRaid.value.id}`)
}

const goToSolo = () => {
  router.push(`/checklists/raids/${currentRaid.value.id}`)
}

const showCreateGroupForm = ref(false)

const player = ref<BungieMember | null>(userStore.bungieMember)
watch(player, () => goToSolo())
</script>
