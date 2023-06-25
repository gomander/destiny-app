<template>
  <q-table
    :title="props.title"
    :columns="columns"
    :rows="rows"
    row-key="triumph"
    :pagination="{ rowsPerPage: 0 }"
  />
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
import { QTableColumn } from 'quasar'

interface Props {
  title: string | undefined
  triumphs: Triumph[] | null | undefined
}

const props = defineProps<Props>()

const columns = ref<QTableColumn[]>([
  {
    name: 'triumphs',
    label: 'Triumphs',
    field: 'triumph',
    align: 'left'
  }
])
const rows = ref<{ [k: string]: string }[]>([])

const populateTableRows = () => {
  if (!props.triumphs) return
  rows.value = []
  for (const triumph of props.triumphs) {
    const row: { [k: string]: string } = {
      triumph: triumph.name
    }
    for (const player of players.value) {
      row[player.id] = player.triumphs.find(
        t => t.hash === triumph.hash
      )?.complete
        ? 'X'
        : ''
    }
    rows.value.push(row)
  }
}

watch(props, () => {
  populateTableRows()
})

const playerData = ref<DestinyProfileResponse[]>([])
const players = ref<PlayerTriumphs[]>([])
watch(playerData, () => {
  players.value = playerData.value.map(player => {
    if (!player?.profile.data?.userInfo.bungieGlobalDisplayNameCode) return
    if (!player.profileRecords.data) return
    const userInfo = player.profile.data.userInfo
    const newPlayer = {
      name: userInfo.bungieGlobalDisplayName,
      discriminator: String(userInfo.bungieGlobalDisplayNameCode),
      id: userInfo.membershipId,
      triumphs: mapProfileRecordsToTriumphs(player.profileRecords.data)
    }
    columns.value.push({
      name: newPlayer.id,
      label: newPlayer.name,
      field: newPlayer.id,
      align: 'center'
    })
    return newPlayer
  }).filter(player => player) as PlayerTriumphs[]
  populateTableRows()
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