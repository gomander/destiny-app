<template>
  <q-table
    :title="props.title"
    :columns="columns"
    :rows="rows"
    row-key="triumph"
    :pagination="{ rowsPerPage: 0 }"
    separator="cell"
    flat bordered
  >
    <template v-slot:body-cell-triumphs="props">
      <q-td
        :props="props"
        class="triumph"
      >
        <div class="triumph-data">
          <img
            :src="'https://bungie.net' + props.value.icon"
            width="32"
            height="32"
          />
          <div>
            <h3 class="triumph-name">{{ props.value.name }}</h3>
            <p>{{ props.value.description }}</p>
          </div>
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell="props">
      <q-td
        :props="props"
        :class="props.value ? 'complete' : 'incomplete'"
      />
    </template>
  </q-table>
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
  triumphs: Triumph[] | undefined
}

const props = defineProps<Props>()

const columns = ref<QTableColumn[]>([
  {
    name: 'triumphs',
    label: 'Triumphs',
    field: 'triumph',
    align: 'left',
    sortable: true,
    sort: (a: Triumph, b: Triumph) => a.description > b.description ? 1 : -1
  }
])
const rows = ref<{ [k: string]: Triumph | boolean }[]>([])

const populateTableRows = () => {
  if (!props.triumphs) return
  rows.value = []
  for (const triumph of props.triumphs) {
    const row: { [k: string]: Triumph | boolean } = { triumph }
    for (const player of players.value) {
      row[player.id] = player.triumphs.find(
        t => t.hash === triumph.hash
      )?.complete || false
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
  background-color: $positive

.incomplete
  background-color: $negative

.col-header
  font-size: 150%

.triumph
  max-width: 30em

  &-data
    display: flex
    align-items: center
    gap: 1em

  &-name
    font-size: 100%
    line-height: 150%
    font-weight: bold

  *
    margin: 0
    white-space: normal
</style>