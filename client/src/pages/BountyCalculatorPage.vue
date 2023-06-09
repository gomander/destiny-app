<template>
  <q-page class="items-center justify-evenly q-pa-md q-gutter-y-md">
    <h1>Bounty XP Calculator</h1>

    <div class="row q-gutter-x-md items-center">
      <div>
        Characters:

        <q-slider
          v-model="state.characterCount"
          :min="1"
          :max="3"
          markers
          marker-labels
          class="col-12 col-sm-3 col-md-2 col-lg-1"
        />
      </div>

      <q-checkbox
        v-model="state.seasonPass"
        label="Season Pass"
        dense
      />

      <q-checkbox
        v-model="state.wellRested"
        label="Well Rested"
        dense
      />

      <div>
        Ghost XP mod:
      </div>

      <q-select
        v-model="state.ghostShellMod"
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
        v-model="state.sharedWisdom"
        :options="sharedWisdomTiers"
        emit-value
        map-options
        filled
        dense
        options-dense
      />
    </div>

    <div class="row q-gutter-x-md">
      <BountyTable v-for="character in state.characterCount"/>
    </div>

    <div>
      Stored XP: {{ storedXp }}
    </div>

    <div>
      <q-slider
        readonly
        :min="progressBase"
        :max="progressBase + 10"
        v-model="storedLevels"
        track-size="10px"
        thumb-size="0px"
        markers
        marker-labels
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { ghostMods, sharedWisdomTiers } from 'src/data/xp-modifiers'
import BountyTable from 'src/components/BountyTable.vue'
import { calculateXp } from 'src/utils/bounty-util'

const state = reactive({
  characterCount: 3,
  seasonPass: true,
  wellRested: true,
  ghostShellMod: ghostMods[0].value,
  sharedWisdom: 0
})

const storedXp = computed(() =>
  Math.floor(
    calculateXp(
      33 * state.characterCount,
      27 * state.characterCount,
      state.ghostShellMod,
      state.seasonPass,
      state.wellRested,
      state.sharedWisdom
    )
  )
)

const progressBase = computed(() => Math.floor(storedXp.value / 1000000) * 10)

const storedLevels = computed(() => storedXp.value / 100000)
</script>