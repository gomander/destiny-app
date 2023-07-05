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
import { BungieMember, Triumph } from 'src/types/models'
import TriumphsListTable from './TriumphsListTable.vue'

interface Props {
  title: string
  triumphs: Triumph[]
  groupId: string
}
const props = defineProps<Props>()

const groupId = toRef(props, 'groupId')

const players = ref<BungieMember[]>([])

const updatePlayers = async () => {
  const group = await getGroup(groupId.value)
  if (!group) return
  players.value = group.players
}

watch(groupId, updatePlayers)
onMounted(updatePlayers)
</script>