<template>
  <q-page class="q-pa-md flex-col gap">
    <h1>RAD Triumph Checklist</h1>

    <div class="row q-col-gutter-md items-stretch">
      <div class="col-grow col-lg-4">
        <q-card
          class="full-height"
          flat
        >
          <q-card-section class="flex-col gap">
            <div class="text-h6">Lookup user</div>
            <div class="flex gap">
              <find-player-form
                @add-player="addPlayer"
                @lookup-player="lookupPlayer"
              />
              <authenticate-button
                v-if="!userStore.membershipId"
                tooltip="Authenticate to automatically see your own triumphs"
              />
            </div>
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
          :to="{ params: { activity: raid.id }, query: route.query }"
          :disable="route.path.includes(raid.id)"
        />
      </q-card-section>
      <q-card-section class="flex gap-sm">
        <q-btn
          v-for="dungeon of dungeons"
          :label="dungeon.name"
          no-caps unelevated
          color="primary"
          :to="{ params: { activity: dungeon.id }, query: route.query }"
          :disable="route.path.includes(dungeon.id)"
        />
      </q-card-section>
    </q-card>

    <triumphs-list-table
      :title="currentRaid.name"
      :triumphs="currentRaidTriumphs"
      :players="players"
    />
  </q-page>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useGameStore, useUserStore } from 'stores'
  import { getPlayerByBungieName } from 'src/utils/api'
  import { showError } from 'src/utils/messenger'
  import AuthenticateButton from 'src/components/AuthenticateButton.vue'
  import FindPlayerForm from 'src/components/FindPlayerForm.vue'
  import TriumphsListTable from 'src/components/TriumphsListTable.vue'
  import type { BungieMember } from 'src/types'
  import { raids, dungeons } from 'src/data/raids'

  const route = useRoute()
  const router = useRouter()
  const gameStore = useGameStore()
  const userStore = useUserStore()

  const players = ref<BungieMember[]>([])

  const raidId = computed(() => route.params.activity?.toString())
  const urlPlayers = computed(() => route.query.players?.toString().split(','))

  const currentRaid = computed(() =>
    raids.find((raid) => raid.id === raidId.value) ||
    dungeons.find((dungeon) => dungeon.id === raidId.value) ||
    { name: '', id: '' }
  )
  const currentRaidTriumphs = computed(() =>
    gameStore.raidTriumphs.filter((entry) =>
      entry.name.includes(currentRaid.value.name)
    ).flatMap((entry) => entry.triumphs) || []
  )

  watch(urlPlayers, async (newValue, oldValue) => {
    if (newValue && newValue.join() !== oldValue?.join()) {
      await updatePlayers(newValue)
    } else if (!newValue && userStore.bungieMember) {
      players.value = [userStore.bungieMember]
    }
  }, { immediate: true })

  async function updatePlayers(playerIds: string[]) {
    const playersArray = await Promise.all(
      playerIds.map((player) => {
        const existing = players.value.find((p) => `${p.name}#${p.code}` === player)
        if (existing) return existing
        try {
          return getPlayerByBungieName(player)
        } catch (error) {
          showError(error)
          return null
        }
      })
    )
    players.value = playersArray
      .map((player) =>
        player && 'membershipId' in player
          ? ({
            id: player.membershipId,
            type: player.membershipType,
            name: player.bungieGlobalDisplayName,
            code: player.bungieGlobalDisplayNameCode || 0
          })
          : player
      )
      .filter((player): player is BungieMember => !!player)
  }

  function addPlayer(player: BungieMember) {
    router.push({
      query: {
        players: (
          route.query.players
            ? `${route.query.players},`
            : userStore.membershipId
              ? `${userStore.name}#${userStore.nameCode},`
              : ''
        ) + `${player.name}#${player.code}`
      }
    })
  }

  function lookupPlayer(player: BungieMember) {
    router.push({ query: { players: `${player.name}#${player.code}` } })
  }
</script>
