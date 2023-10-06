<template>
  <q-page class="items-center justify-evenly q-pa-md">
    <h1>Historical Power Levels</h1>

    <q-table
      :rows="rows"
      :columns="columns"
      :pagination="{ rowsNumber: rows.length }"
      separator="cell"
      hide-bottom
    />
  </q-page>
</template>

<script setup lang="ts">
import seasons from 'src/data/seasons'

const columns = [
  {
    name: 'year',
    label: 'Year',
    field: 'year',
    sortable: false
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    sortable: false
  },
  {
    name: 'season',
    label: 'Season',
    field: 'season',
    sortable: false
  },
  {
    name: 'base',
    label: 'Base',
    field: 'base',
    sortable: false
  },
  {
    name: 'soft',
    label: 'Soft cap',
    field: 'soft',
    sortable: false
  },
  {
    name: 'powerful',
    label: 'Powerful cap',
    field: 'powerful',
    sortable: false
  },
  {
    name: 'pinnacle',
    label: 'Pinnacle cap',
    field: 'pinnacle',
    sortable: false
  }
]

const rows = Array.from(seasons).filter(
  season => typeof season[0] === 'number'
).map(season => season[1]).map(season => ({
  year: `${season.year?.title} - ${season.year?.value}`,
  name: season.title,
  season: season.value,
  base: season.power?.base,
  soft: season.power?.soft,
  powerful: season.power?.powerful,
  pinnacle: season.power?.hard
})).reverse()
</script>
