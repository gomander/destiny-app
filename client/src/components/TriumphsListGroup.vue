<template>
  <triumphs-list-table
    :title="title"
    :triumphs="triumphs"
    :players="players"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, toRef, watch } from 'vue'
import { getGroup } from '../utils/firebase'
import { getPlayerByBungieName } from '../utils/api'
import TriumphsListTable from './TriumphsListTable.vue'
import { BungieMember, Triumph } from '../types'
import { showError } from '../utils/messenger'

interface Props {
  title: string
  triumphs: Triumph[]
  groupId?: string
  players?: string[]
}
const props = defineProps<Props>()

const groupId = toRef(props, 'groupId')

const players = ref<BungieMember[]>([])

const updatePlayers = async () => {
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
