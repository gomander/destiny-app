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
    class="flex-col gap"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @submit="createGroup"
    @reset=""
  >
    <ul class="player-list flex-col gap">
      <li
        v-for="(player, i) of players"
        class="row gap-sm"
      >
        <find-player-form v-model="players[i]"/>

        <q-btn
          color="negative"
          no-caps unelevated
          @click="removePlayer(player)"
          icon="fas fa-x"
        />
      </li>
    </ul>

    <div class="flex gap-sm">
      <q-btn
        color="primary"
        no-caps unelevated
        @click="addPlayer"
        :disable="!allPlayersValid"
      >
        Add player
      </q-btn>

      <q-btn
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
import { useUserStore } from 'src/stores/user-store'
import FindPlayerForm from 'src/components/FindPlayerForm.vue'
import { BungieMember, Group } from 'src/types/models'

const emit = defineEmits(['createGroup'])

const userStore = useUserStore()

const players = ref<BungieMember[]>([])
if (userStore.membershipId) {
  players.value.push({
    id: userStore.primaryMembershipId,
    type: userStore.primaryMembershipType,
    name: userStore.name,
    code: userStore.nameCode
  })
}

const showForm = ref(false)
const allPlayersValid = computed(
  () => !players.value.find(player => !player.id)
)
const formInvalid = computed(() => {
  const seen = new Set()
  const hasDuplicates = players.value.some(
    player => seen.size === seen.add(player.id).size
  )
  return hasDuplicates || !allPlayersValid.value || players.value.length < 2
})

const addPlayer = () => {
  players.value.push({
    id: '',
    type: 0,
    name: '',
    code: 0
  })
}

const removePlayer = (player: BungieMember) => {
  players.value = players.value.filter(p => p !== player)
}

const createGroup = () => {
  const group: Group = {
    creator: userStore.bungieMember,
    players: players.value.filter(player => player.id)
  }
  emit('createGroup', group)
}
</script>

<style scoped lang="sass">
.player-list
  list-style-type: none
</style>