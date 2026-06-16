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
  import type { BungieMember, Triumph } from 'src/types'

  const props = defineProps<{
    title: string
    triumphs: Triumph[]
    player: BungieMember | null
  }>()

  const players = computed(() => props.player ? [props.player] : [])
</script>
