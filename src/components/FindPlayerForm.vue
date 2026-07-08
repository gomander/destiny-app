<template>
  <q-form
    class="row gap-sm"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @submit="(e) => e.preventDefault()"
  >
    <q-input
      v-model="input"
      type="text"
      placeholder="Search players..."
      minlength="3"
      maxlength="30"
      debounce="500"
      dense filled
    >
      <q-menu
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
      type="button"
      color="primary"
      no-caps unelevated
      icon="fas fa-arrow-right"
      @click="lookupPlayer"
      :disable="disableSearch"
    >
      <q-tooltip class="text-body2">
        Go to player
      </q-tooltip>
    </q-btn>

    <q-btn
      type="button"
      color="primary"
      no-caps unelevated
      icon="fas fa-plus"
      @click="addPlayer"
      :disable="disableSearch"
    >
      <q-tooltip class="text-body2">
        Add player to group view
      </q-tooltip>
    </q-btn>
  </q-form>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { searchPlayersByBungieName, searchUsersByName } from 'src/utils/api'
  import { showError } from 'src/utils/messenger'
  import type { BungieMember } from 'src/types'

  const emit = defineEmits<{
    'add-player': [BungieMember]
    'lookup-player': [BungieMember]
  }>()

  const input = ref('')
  const selectedPlayer = ref<BungieMember | null>(null)
  const showMenu = ref(false)
  const options = ref<BungieMember[]>([])

  const disableSearch = computed(() =>
    input.value.length < 3 ||
    !/^.+\#\d{1,4}$/.test(input.value)
  )

  watch(input, async () => {
    let value = input.value.trim()
    if (!value) {
      options.value = []
      return
    }
    if (value.endsWith('#')) value = value.replace('#', '')
    options.value = (await getOptions(value)).slice(0, 10)
    showMenu.value = true
  })

  function selectPlayer(bungieMember: BungieMember) {
    input.value = `${bungieMember.name}#${bungieMember.code}`
    selectedPlayer.value = bungieMember
  }

  function addPlayer() {
    if (selectedPlayer.value) {
      emit('add-player', selectedPlayer.value)
      input.value = ''
    }
  }

  function lookupPlayer() {
    if (selectedPlayer.value) {
      emit('lookup-player', selectedPlayer.value)
      input.value = ''
    }
  }

  async function getOptions(query: string) {
    try {
      if (query.includes('#')) {
        const results = await searchPlayersByBungieName(query)
        return results.map((result) => ({
          id: result.membershipId,
          type: result.membershipType,
          name: result.bungieGlobalDisplayName,
          code: result.bungieGlobalDisplayNameCode || 0
        }))
      }
      const results = await searchUsersByName(query)
      return results.map((result) => {
        const primaryMembership = result.destinyMemberships.find((membership) =>
          membership.applicableMembershipTypes.length > 0
        ) || result.destinyMemberships[0]
        return {
          id: primaryMembership?.membershipId || '',
          type: primaryMembership?.membershipType || 0,
          name: result.bungieGlobalDisplayName,
          code: result.bungieGlobalDisplayNameCode || 0
        }
      }).filter((player) => player.code)
    } catch (error) {
      showError(error)
      return []
    }
  }
</script>
