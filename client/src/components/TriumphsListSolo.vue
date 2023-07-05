<template>
  <triumphs-list-table
    :title="title"
    :triumphs="triumphs"
    :players="players"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from 'src/stores/user-store'
import TriumphsListTable from './TriumphsListTable.vue'
import { Triumph } from 'src/types'

const userStore = useUserStore()

interface Props {
  title: string
  triumphs: Triumph[]
}
const props = defineProps<Props>()

const players = computed(
  () => userStore.bungieMember ? [userStore.bungieMember] : []
)
</script>