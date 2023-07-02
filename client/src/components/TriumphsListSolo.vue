<template>
  <div class="col">
    <h3 class="col-header">{{ userStore.bungieNetUser.uniqueName }}</h3>
    <ul class="triumph-list q-mt-sm">
      <li
        v-for="triumph of triumphs"
        class="triumph"
        :class="getTriumphCompleted(triumph.hash)"
      >
        <img
          v-if="triumph.icon"
          :src="'https://bungie.net' + triumph.icon"
          width="32"
          height="32"
        />

        <div>
          <h4 class="triumph-name">{{ triumph.name }}</h4>
          <span class="triumph-description">{{ triumph.description }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store'
import { Triumph } from 'src/types/models'

const userStore = useUserStore()

interface Props { triumphs: Triumph[] }

const props = defineProps<Props>()

const getTriumphCompleted = (hash: number) => {
  return userStore.records.find(record => record.hash === hash)?.complete
    ? 'complete'
    : ''
}
</script>

<style scoped lang="sass">
.complete
  color: $positive

.col-header
  font-size: 125%

.triumph-list
  list-style-type: none

  .triumph
    display: flex
    align-items: center
    gap: 1em

    &-name
      font-size: 100%
      line-height: 150%
      font-weight: bold

    &-description
      white-space: normal
</style>