<template>
  <q-table
    :title="title"
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
            <div class="flex gap-sm">
              <h3 class="triumph-name">{{ value.name }}</h3>
              <span
                v-if="!value.required"
                class="required-text"
              >
                (optional)
              </span>
            </div>
            <span class="triumph-description">{{ value.description }}</span>
          </div>
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell="{ value }: { value: TriumphPlayer }">
      <q-td class="no-padding full-height">
        <div class="row full-height triumph-completion">
          <div
            v-for="objective in value.objectives"
            class="col full-height objective"
            :class="objective.complete ? 'complete' : 'incomplete'"
          >
            <div class="absolute-full"></div>
          </div>

          <div class="flex flex-center absolute-full completion-icon">
            <i
              v-if="value.complete"
              class="fa-solid fa-check"
            />
            <i
              v-else-if="!value.objectives.find(obj => obj.complete)"
              class="fa-solid fa-xmark"
            />
            <span v-else>
              {{ value.objectives.filter(obj => obj.complete).length }} /
              {{ value.objectives.length }}
            </span>
          </div>
        </div>
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
import {
  getProfileData, mapProfileRecordsToTriumphs
} from 'src/services/profile-service'
import { QTableColumn } from 'quasar/dist/types/api/qtable'
import { DestinyProfileResponse } from 'bungie-api-ts/destiny2/interfaces'
import { BungieMember, PlayerTriumphs, Triumph, TriumphPlayer } from 'src/types'

interface Props {
  title: string
  triumphs: Triumph[]
  players: BungieMember[]
}
const props = defineProps<Props>()

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
interface Row { [k: string]: Triumph | TriumphPlayer | false }
const rows = ref<Row[]>([])
const loading = ref(true)
const filter = ref(null)
const filterMethod = (rows: readonly Row[], query: string) => {
  const lowerQuery = query.toLowerCase()
  if (query === 'required' || query === '!optional') {
    return rows.filter(row => (row.triumph as Triumph).required)
  } else if (query === 'optional' || query === '!required') {
    return rows.filter(row => !(row.triumph as Triumph).required)
  }
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
      ) || false
    }
    rows.value.push(row)
  }
}

watch(props, () => {
  populateTableRows()
})

const playersProp = toRef(props, 'players')
watch(playersProp, async () => {
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
      sortable: true,
      sort: (a: TriumphPlayer, b: TriumphPlayer) => {
        return (
          a.objectives.filter(obj => obj.complete).length / a.objectives.length -
          b.objectives.filter(obj => obj.complete).length / b.objectives.length
        )
      }
    })
    return newPlayer
  }).filter(player => player) as PlayerTriumphs[]
  populateTableRows()
})

const fetchPlayerData = async () => {
  return (await Promise.all(
    props.players.map(player => getProfileData([100, 900], player.id, player.type))
  )).filter(data => data) as DestinyProfileResponse[]
}

onMounted(async () => {
  loading.value = true
  playerData.value = await fetchPlayerData()
  loading.value = false
})
</script>

<style scoped lang="sass">
.complete
  background-color: $positive

.incomplete
  background-color: $negative

.completion-icon
  font-size: 1.5em
  color: #FFF8

.objective
  border: 0.1em solid #FFF1

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

.required-text
  font-weight: 300
  opacity: 50%
</style>