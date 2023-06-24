<template>
  <div class="row">
    <div
      v-for="player of players"
      class="col"
    >
      <h3 class="col-header">
        {{ player?.profile.data?.userInfo.displayName }}
      </h3>

      <ul class="triumph-list q-mt-sm">
        <li
          v-for="triumph of props.triumphs"
          class="triumph"
        >
          <h4 class="triumph-name">{{ triumph.name }}</h4>
          <p class="triumph-description">{{ triumph.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { DestinyProfileResponse } from 'bungie-api-ts/destiny2'
import { getProfileData } from 'src/services/profile-service'
import { defaultGroup } from 'src/utils/triumph-util'
import { Triumph } from 'src/types/models'

interface Props {
  triumphs: Triumph[] | undefined
}

const props = defineProps<Props>()

const players: (DestinyProfileResponse | undefined)[] = []

onMounted(async () => {
  players.push(...await Promise.all(
    defaultGroup.map(player => getProfileData([100, 900], player))
  ))
})
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

    *
      margin: 0
</style>