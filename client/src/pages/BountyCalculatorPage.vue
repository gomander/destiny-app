<template>
  <q-page class="items-center justify-evenly q-pa-md q-gutter-y-md">
    <h1>Bounty XP Calculator</h1>

    <div class="row q-gutter-x-md items-center">
      <div>
        Characters:

        <q-slider
          v-model="characterCount"
          :min="1"
          :max="3"
          markers
          marker-labels
          class="col-12 col-sm-3 col-md-2 col-lg-1"
        />
      </div>

      <q-checkbox
        v-model="seasonPass"
        label="Season Pass"
        dense
      />

      <q-checkbox
        v-model="wellRested"
        label="Well Rested"
        dense
      />

      <div>
        Ghost XP mod:
      </div>

      <q-select
        v-model="ghostShellMod"
        :options="ghostMods"
        emit-value
        map-options
        filled
        dense
        options-dense
      />

      <div>
        Shared Wisdom:
      </div>

      <q-select
        v-model="sharedWisdom"
        :options="sharedWisdomTiers"
        emit-value
        map-options
        filled
        dense
        options-dense
      />
    </div>

    <div class="row q-gutter-x-md">
      <BountyTable v-for="character in characterCount"/>
    </div>

    <div>
      Stored XP: {{ storedXp }}
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ghostMods, sharedWisdomTiers } from 'src/data/xp-modifiers'
import BountyTable from 'src/components/BountyTable.vue'
import { calculateXp } from 'src/utils/bounty-util'

const characterCount = ref(3)
const seasonPass = ref(true)
const wellRested = ref(true)
const ghostShellMod = ref(ghostMods[0].value)
const sharedWisdom = ref(0)

const storedXp = computed(() =>
  Math.floor(
    calculateXp(
      102,
      78,
      ghostShellMod.value,
      seasonPass.value,
      wellRested.value,
      sharedWisdom.value
    )
  )
)
</script>