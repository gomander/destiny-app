<template>
  <triumphs-list-table
    :title="title"
    :triumphs="triumphs"
    :players="players"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TriumphsListTable from 'src/components/TriumphsListTable.vue'
import { BungieMember, Triumph } from 'src/types'

interface Props {
  title: string
  triumphs: Triumph[]
  player: BungieMember | null
}
const props = defineProps<Props>()

const players = computed(() => props.player ? [props.player] : [])
</script>
