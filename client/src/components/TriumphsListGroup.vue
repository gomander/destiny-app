<template>
  <q-table
    :title="props.title"
    :columns="columns"
    :rows="rows"
    row-key="triumph"
    :pagination="{ rowsPerPage: 0 }"
    separator="cell"
    :loading="loading"
    :filter="filter"
    :filter-method="filterMethod"
    flat bordered
  >
    <template v-slot:body-cell-triumphs="{ value }: { value: Triumph }">
      <q-td class="triumph">
        <div class="triumph-data">
          <img
            :src="'https://bungie.net' + value.icon"
            width="32"
            height="32"
          />
          <div>
            <h3 class="triumph-name">{{ value.name }}</h3>
            <span class="triumph-description">{{ value.description }}</span>
          </div>
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell="{ value }">
      <q-td
        class="text-center"
        :class="value ? 'complete' : 'incomplete'"
      >
        <i v-if="value" class="fa-solid fa-check"/>
        <i v-else class="fa-solid fa-xmark"/>
      </q-td>
    </template>

    <template v-slot:top-right>
      <q-input
        type="text"
        dense
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
    </template>

    <template v-slot:no-data>
      {{ title ? 'Fetching data from Bungie...' : 'Select a raid' }}
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { onMounted, ref, toRef, watch } from 'vue'
import { QTableColumn } from 'quasar'
import { DestinyProfileResponse } from 'bungie-api-ts/destiny2'
import {
  getProfileData,
  mapProfileRecordsToTriumphs
} from 'src/services/profile-service'
import { getGroup } from 'src/utils/firebase'
import { PlayerTriumphs, Triumph } from 'src/types/models'

interface Props {
  title: string
  triumphs: Triumph[]
  groupId: string
}
const props = defineProps<Props>()

const groupId = toRef(props, 'groupId')

const columns = ref<QTableColumn[]>([])
const resetColumns = () => {
  columns.value = [{
    name: 'triumphs',
    label: 'Triumphs',
    field: 'triumph',
    align: 'left',
    sortable: true,
    sort: (a: Triumph, b: Triumph) => a.description > b.description ? 1 : -1
  }]
}
resetColumns()
interface Row { [k: string]: Triumph | boolean }
const rows = ref<Row[]>([])
const loading = ref(true)
const filter = ref(null)
const filterMethod = (rows: readonly Row[], query: string) => {
  const lowerQuery = query.toLowerCase()
  return rows.filter((row: Row) => {
    const triumph = row.triumph as Triumph
    return (
      triumph.name.toLowerCase().includes(lowerQuery) ||
      triumph.description.toLowerCase().includes(lowerQuery)
    )
  })
}

const populateTableRows = () => {
  if (!props.triumphs) return
  rows.value = []
  for (const triumph of props.triumphs) {
    const row: Row = { triumph }
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

watch(groupId, async () => {
  loading.value = true
  resetColumns()
  playerData.value = await fetchPlayerData()
  loading.value = false
})

const playerData = ref<DestinyProfileResponse[]>([])
const players = ref<PlayerTriumphs[]>([])
watch(playerData, () => {
  players.value = playerData.value.map(player => {
    if (!player.profile.data?.userInfo.bungieGlobalDisplayNameCode) return
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
      align: 'center',
      sortable: true
    })
    return newPlayer
  }).filter(player => player) as PlayerTriumphs[]
  populateTableRows()
})

onMounted(async () => {
  playerData.value = await fetchPlayerData()
  loading.value = false
})

const fetchPlayerData = async () => {
  const group = await getGroup(props.groupId)
  return (await Promise.all(
    group.players.map(player => getProfileData([100, 900], player.id, player.type))
  )).filter(data => data) as DestinyProfileResponse[]
}
</script>

<style scoped lang="sass">
.complete, .incomplete
  font-size: 1.75em
  color: #FFF8
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

  &-description
    white-space: normal
</style>