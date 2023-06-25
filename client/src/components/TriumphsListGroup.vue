<template>
  <div class="row">
    <div class="col-shrink q-pr-sm">
      <h3 class="col-header">
        Triumphs
      </h3>

      <ul class="triumph-list q-mt-sm">
        <li
          v-for="triumph of props.triumphs"
          class="triumph"
        >
          <h4 class="triumph-name">{{ triumph.name }}</h4>
        </li>
      </ul>
    </div>

    <div
      v-for="player of players"
      class="col-shrink q-px-sm"
    >
      <h3 class="col-header">
        {{ player.name }}
      </h3>

      <ul class="triumph-list q-mt-sm">
        <li
          v-for="triumph of props.triumphs"
          class="triumph"
        >
          <h4
            v-if="player.triumphs.find(t => t.hash === triumph.hash && t.complete)"
            class="triumph-data"
          >
            X
          </h4>

          <h4
            v-else
            class="triumph-data"
          >
            no
          </h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { DestinyProfileResponse } from 'bungie-api-ts/destiny2'
import {
  getProfileData,
  mapProfileRecordsToTriumphs
} from 'src/services/profile-service'
import { defaultGroup } from 'src/utils/triumph-util'
import { PlayerTriumphs, Triumph } from 'src/types/models'

interface Props {
  triumphs: Triumph[] | undefined
}

const props = defineProps<Props>()

const playerData = ref<DestinyProfileResponse[]>([])
const players = ref<PlayerTriumphs[]>([])
watch(playerData, () => {
  players.value = playerData.value.map(player => {
    if (!player?.profile.data?.userInfo.bungieGlobalDisplayNameCode) return
    if (!player.profileRecords.data) return
    const userInfo = player.profile.data.userInfo
    return {
      name: userInfo.bungieGlobalDisplayName,
      discriminator: String(userInfo.bungieGlobalDisplayNameCode),
      id: userInfo.membershipId,
      triumphs: mapProfileRecordsToTriumphs(player.profileRecords.data)
    }
  }).filter(player => player) as PlayerTriumphs[]
})

onMounted(async () => {
  playerData.value = (await Promise.all(
    defaultGroup.map(player => getProfileData([100, 900], player.id, player.type))
  )).filter(data => data) as DestinyProfileResponse[]
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

    &-name, &-data
      font-size: 100%
      line-height: 150%
      font-weight: bold

    *
      margin: 0
</style>