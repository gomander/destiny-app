<template>
  <q-page class="row">
    <div class="items-center justify-evenly q-pa-md q-gutter-y-md col-shrink">
      <h1>Bounty XP Calculator</h1>

      <div class="row q-gutter-x-md items-center">
        <div>
          Characters:

          <q-slider
            v-model="state.characterCount"
            :min="1"
            :max="3"
            track-size="6px"
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

        <div>Ghost XP mod:</div>

        <q-select
          v-model="state.ghostShellMod"
          :options="ghostMods"
          emit-value
          map-options
          filled
          dense
          options-dense
        />

        <div>Shared Wisdom:</div>

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

      <div class="row q-gutter-md q-mt-none">
        <BountyTable v-for="_character in state.characterCount"/>
      </div>

      <div>
        Stored XP: {{ storedXp }}

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
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { calculateXp } from 'src/utils/bounty-util'
import BountyTable from 'src/components/BountyTable.vue'
import { ghostMods, sharedWisdomTiers } from 'src/data/xp-modifiers'

const state = reactive({
  characterCount: 3,
  seasonPass: true,
  wellRested: true,
  ghostShellMod: ghostMods[0].value,
  sharedWisdom: sharedWisdomTiers.at(-1)!.value
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
