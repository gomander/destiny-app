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
      v-model="input"
      type="text"
      placeholder="Search players..."
      minlength="3"
      maxlength="30"
      debounce="500"
      dense filled
      :readonly="inputFinalized"
      class="find-player-input"
    >
      <q-tooltip>
        Must be an exact match on the name or the name#code, case insensitive
      </q-tooltip>

      <q-menu
        v-if="!inputFinalized"
        v-model="showMenu"
        fit auto-close no-focus
      >
        <q-list>
          <q-item
            v-for="option in options"
            clickable
            @click="selectPlayer(option)"
          >
            <q-item-section>
              <q-item-label>
                {{ option.name }}#{{ option.code }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-input>

    <q-btn
      v-if="!inputFinalized"
      type="submit"
      color="primary"
      no-caps unelevated
      icon="fas fa-search"
      :disable="disableSearch"
    >
      <q-tooltip>
        Search
      </q-tooltip>
    </q-btn>

    <q-btn
      v-if="inputFinalized"
      color="positive"
      no-caps unelevated
      icon="fas fa-check"
      disable
    >
      <q-tooltip>
        Player has been added!
      </q-tooltip>
    </q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { searchPlayersByBungieName, searchUsersByName } from 'src/utils/api'
import { showError, showNotification } from 'src/utils/messenger'
import { BungieMember } from 'src/types'

interface Props {
  modelValue: BungieMember | null
  disableOnFind?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const player = computed<BungieMember | null>({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const playerFound = computed(() => !!player.value)
const input = ref(
  playerFound.value
    ? `${props.modelValue?.name}#${props.modelValue?.code}`
    : ''
)

watch(player, () => {
  if (!player.value) return
  input.value = `${player.value.name}#${player.value.code}`
  showMenu.value = false
})

const inputFinalized = computed(() => playerFound.value && props.disableOnFind)
const disableSearch = computed(() =>
  input.value.length < 3 ||
  !/^.+\#\d{1,4}$/.test(input.value) ||
  inputFinalized.value
)

const search = async (e: Event) => {
  e.preventDefault()
  if (disableSearch.value) return
  const players = await searchPlayersByBungieName(input.value.trim())
  if (!players.length) return showNotification('Player not found!')
  player.value = {
    id: players[0].membershipId,
    type: players[0].membershipType,
    name: players[0].bungieGlobalDisplayName,
    code: players[0].bungieGlobalDisplayNameCode || 0
  }
}

const selectPlayer = (bungieMember: BungieMember) => {
  player.value = bungieMember
}

const showMenu = ref(false)

const options = ref<BungieMember[]>([])

const getOptions = async (query: string) => {
  try {
    if (query.includes('#')) {
      const results = await searchPlayersByBungieName(query)
      return results.map(result => ({
        id: result.membershipId,
        type: result.membershipType,
        name: result.bungieGlobalDisplayName,
        code: result.bungieGlobalDisplayNameCode || 0
      }))
    }
    const results = await searchUsersByName(query)
    return results.map(result => {
      const primaryMembership = result.destinyMemberships.find(
        membership => membership.applicableMembershipTypes.length > 0
      ) || result.destinyMemberships[0]
      return {
        id: primaryMembership?.membershipId || '',
        type: primaryMembership?.membershipType || 0,
        name: result.bungieGlobalDisplayName,
        code: result.bungieGlobalDisplayNameCode || 0
      }
    }).filter(player => player.code)
  } catch (error) {
    showError(error)
    return []
  }
}

watch(input, async () => {
  if (!input.value) return options.value = []
  options.value = (await getOptions(input.value)).slice(0, 10)
  showMenu.value = true
})
</script>
