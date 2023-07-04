<template>
  <q-form
    class="row gap-sm"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @submit="search"
    @reset=""
  >
    <q-input
      type="text"
      label="Username"
      minlength="3"
      maxlength="30"
      v-model="usernameInput"
      dense filled
      :readonly="playerFound"
    />

    <q-btn
      v-if="!playerFound"
      type="submit"
      color="primary"
      no-caps unelevated
      icon="fas fa-search"
      :disable="disableSearch"
    />

    <q-btn
      v-if="playerFound"
      color="positive"
      no-caps unelevated
      icon="fas fa-check"
      disable
    />
  </q-form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { searchPlayer } from 'src/utils/api'
import { showNotification } from 'src/utils/messenger'
import { BungieMember } from 'src/types/models'

interface Props { modelValue: BungieMember }
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const player = computed<BungieMember>({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const playerFound = computed(() => !!player.value.id)
const usernameInput = ref(
  playerFound.value
    ? `${props.modelValue.name}#${props.modelValue.code}`
    : ''
)

const disableSearch = computed(() =>
  usernameInput.value.length < 3 ||
  !/^.+\#\d{1,4}$/.test(usernameInput.value) ||
  playerFound.value
)

const search = async (e: Event) => {
  e.preventDefault()
  if (disableSearch.value) return
  const players = await searchPlayer(usernameInput.value.trim())
  if (!players.length) return showNotification('Player not found!')
  player.value = {
    id: players[0].membershipId,
    type: players[0].membershipType,
    name: players[0].bungieGlobalDisplayName,
    code: players[0].bungieGlobalDisplayNameCode || 0
  }
}
</script>