<template>
  <triumphs-list-table
    :title="title"
    :triumphs="triumphs"
    :players="players"
  />
</template>

<script setup lang="ts">
  import { onMounted, ref, toRef, watch } from 'vue'
  import { getGroup } from 'src/utils/firebase'
  import { getPlayerByBungieName } from 'src/utils/api'
  import { showError } from 'src/utils/messenger'
  import TriumphsListTable from 'src/components/TriumphsListTable.vue'
  import type { BungieMember, Triumph } from 'src/types'

  const props = defineProps<{
    title: string
    triumphs: Triumph[]
    groupId?: string
    players?: string[]
  }>()

  const groupId = toRef(props, 'groupId')

  const players = ref<BungieMember[]>([])

  async function updatePlayers() {
    if (!groupId.value) {
      const playersArray = await Promise.all(
        props.players?.map(name => {
          try {
            return getPlayerByBungieName(name)
          } catch (error) {
            showError(error)
            return null
          }
        }) || []
      )
      players.value = []
      for (const player of playersArray) {
        if (!player) continue
        players.value.push({
          id: player.membershipId,
          type: player.membershipType,
          name: player.bungieGlobalDisplayName,
          code: player.bungieGlobalDisplayNameCode || 0
        })
      }
      return
    }
    const group = await getGroup(groupId.value)
    if (!group) return
    players.value = group.players
  }

  watch(groupId, updatePlayers)
  onMounted(updatePlayers)
</script>
