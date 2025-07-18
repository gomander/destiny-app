<template>
  <q-form
    class="flex-col gap min-width"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @submit="createGroup"
  >
    <ul class="player-list flex-col gap">
      <li
        v-for="(player, i) of players"
        class="row gap-sm"
      >
        <find-player-form
          v-model="players[i]"
          disable-on-find
        />

        <q-btn
          color="negative"
          no-caps unelevated
          @click="removePlayer(player)"
          icon="fas fa-x"
        >
          <q-tooltip>
            Remove player
          </q-tooltip>
        </q-btn>
      </li>
    </ul>

    <div class="flex gap-sm">
      <q-btn
        class="col"
        color="primary"
        no-caps unelevated
        @click="addPlayer"
        :disable="!allPlayersValid || players.length > 8"
      >
        Add player
      </q-btn>

      <q-btn
        class="col"
        type="submit"
        color="primary"
        no-caps unelevated
        :disable="formInvalid"
      >
        Create group
      </q-btn>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '../stores/user-store'
import FindPlayerForm from 'src/components/FindPlayerForm.vue'
import { BungieMember, Group } from '../types'

const emit = defineEmits(['createGroup'])

const userStore = useUserStore()

const players = ref<(BungieMember | null)[]>([])
if (userStore.membershipId) {
  players.value.push({
    id: userStore.primaryMembershipId,
    type: userStore.primaryMembershipType,
    name: userStore.name,
    code: userStore.nameCode
  })
}

const allPlayersValid = computed(
  () => players.value.filter(player => player).length === players.value.length
)
const formInvalid = computed(() => {
  const seen = new Set()
  const hasDuplicates = players.value.some(
    player => seen.size === seen.add(player?.id).size
  )
  return (
    hasDuplicates ||
    !allPlayersValid.value ||
    players.value.length < 2 ||
    players.value.length > 9
  )
})

const addPlayer = () => {
  players.value.push(null)
}

const removePlayer = (player: BungieMember | null) => {
  players.value = players.value.filter(p => p !== player)
}

const createGroup = () => {
  if (!userStore.bungieMember) return
  const group: Group = {
    creator: userStore.bungieMember,
    players: players.value.filter(player => player) as BungieMember[]
  }
  emit('createGroup', group)
}
</script>

<style scoped lang="sass">
.min-width
  width: fit-content
</style>
