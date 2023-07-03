<template>
  <q-btn
    v-if="!showForm"
    color="primary"
    no-caps unelevated
    @click="showForm = true"
    :disable="!userStore.membershipId"
  >
    Create new group
  </q-btn>

  <q-form
    v-if="showForm"
    class="q-gutter-sm"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @submit="createGroup"
    @reset=""
  >
    <ul class="player-list">
      <li
        v-for="player of players"
        class="row q-gutter-x-sm"
      >
        <q-input
          type="text"
          label="ID"
          minlength="15"
          maxlength="25"
          v-model="player.id"
          dense filled
        />

        <q-input
          type="number"
          label="Type"
          min="1"
          max="10"
          v-model="player.type"
          dense filled
        />

        <q-btn
          color="negative"
          no-caps unelevated
          @click="removePlayer(player)"
          icon="fas fa-x"
        />
      </li>
    </ul>

    <q-btn
      color="primary"
      no-caps unelevated
      @click="addPlayer"
      :disable="!allPlayersValid"
    >
      Add player
    </q-btn>

    <q-btn
      color="primary"
      no-caps unelevated
      @click="createGroup"
      :disable="formInvalid"
    >
      Create group
    </q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from 'src/stores/user-store'
import { BungieMember, Group } from 'src/types/models'

const emit = defineEmits(['createGroup'])

const userStore = useUserStore()

const players = ref<BungieMember[]>([])
if (userStore.membershipId) {
  players.value.push({
    id: userStore.primaryMembershipId,
    type: Number(userStore.primaryMembershipType)
  })
}

const showForm = ref(false)
const allPlayersValid = computed(() => !players.value.find(player => (
  !Number(player.id) ||
  !Number(player.type) ||
  Number(player.type) > 10 ||
  Number(player.type) < 1
)))
const formInvalid = computed(() => {
  const seen = new Set()
  const hasDuplicates = players.value.some(
    player => seen.size === seen.add(player.id).size
  )
  return hasDuplicates || !allPlayersValid.value || players.value.length < 2
})

const addPlayer = () => {
  players.value.push({ id: '', type: 0 })
}

const removePlayer = (player: BungieMember) => {
  players.value = players.value.filter(p => p !== player)
}

const createGroup = () => {
  const group: Group = {
    creator: {
      id: userStore.primaryMembershipId,
      type: userStore.primaryMembershipType
    },
    players: players.value.map(player => (
      { id: player.id, type: Number(player.type) }
    ))
  }
  emit('createGroup', group)
}
</script>

<style scoped lang="sass">
.player-list
  list-style-type: none
  display: flex
  flex-flow: column
  gap: 1em
</style>