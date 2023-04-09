<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key=""
    separator="horizontal"
    hide-bottom
    dense
    :pagination="{ rowsPerPage: rows.length }"
  />
</template>

<script setup lang="ts">

const columns = [
  {
    name: 'source',
    label: 'Source',
    field: 'source',
    sortable: false
  },
  {
    name: 'weeklies',
    label: 'Weeklies',
    field: 'weeklies',
    sortable: false
  },
  {
    name: 'dailies',
    label: 'Dailies',
    field: 'dailies',
    sortable: false
  }
]

const rows = [
  {
    source: 'Suraya Hawthorne',
    weeklies: 8,
    dailies: null
  },
  {
    source: 'Petra Venj',
    weeklies: 7,
    dailies: 0
  },
  {
    source: 'Variks the Loyal',
    weeklies: 4,
    dailies: 0
  },
  {
    source: 'Eris Morn',
    weeklies: 2,
    dailies: 0
  },
  {
    source: 'Lectern of Enchantment',
    weeklies: 2,
    dailies: 0
  },
  {
    source: 'Shaw Han',
    weeklies: 2,
    dailies: 0
  },
  {
    source: 'Starhorse',
    weeklies: 1,
    dailies: 0
  },
  {
    source: 'Nimbus',
    weeklies: 1,
    dailies: 0
  },
  {
    source: 'Commander Zavala',
    weeklies: null,
    dailies: 7
  },
  {
    source: 'Lord Shaxx',
    weeklies: null,
    dailies: 7
  },
  {
    source: 'The Drifter',
    weeklies: null,
    dailies: 7
  },
  {
    source: 'Banshee-44',
    weeklies: null,
    dailies: 7
  }
]
rows.push({
    source: 'Miscellaneous',
    weeklies: null,
    dailies: 60 - rows.reduce((acc, row) => acc + Number(row.weeklies) + Number(row.dailies), 0)
})
rows.push({
  source: 'Total',
  weeklies: rows.reduce((acc, row) => acc + Number(row.weeklies), 0),
  dailies: rows.reduce((acc, row) => acc + Number(row.dailies), 0)
})
</script>