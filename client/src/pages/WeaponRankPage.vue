<template>
  <q-page class="items-center justify-evenly q-pa-md q-gutter-y-md">
    <h1>Weapon Ranking</h1>

    <div class="row wrap q-gutter-md q-mt-none controls-row">
      <q-btn-toggle
        v-model="gameMode"
        :options="gameModes"
        no-caps
      />

      <q-select
        v-model="weaponType"
        :options="weaponTypes"
        emit-value
        map-options
        filled
        dense
        options-dense
        label="Weapon type"
        class="col"
      />

      <q-select
        v-model="slot"
        :options="weaponSlots"
        emit-value
        map-options
        filled
        dense
        options-dense
        label="Slot"
        class="col"
      />

      <q-select
        v-model="damageType"
        :options="damageTypes"
        emit-value
        map-options
        filled
        dense
        options-dense
        label="Damage type"
        class="col"
      />

      <q-select
        v-model="frame"
        filled
        dense
        label="Frame"
        class="col"
        :options="frames"
        option-label="name"
        option-value="hash"
      />
    </div>

    <div class="row q-gutter-md q-mt-none">
      <q-markup-table
        class="col-shrink"
        v-if="weaponsWithScores.length"
      >
        <thead>
          <tr>
            <th class="text-left">Place</th>
            <th class="text-left">Weapon</th>
            <th class="text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, i) of weaponsWithScores">
            <td>{{ i + 1 }}.</td>
            <td class="weapon">
              <img
                :src="entry.weapon.icon"
                :alt="entry.weapon.name"
                :title="entry.weapon.name"
              />
              <div>{{ entry.weapon.name }}</div>
            </td>
            <td>{{ entry.score }}</td>
          </tr>
        </tbody>
      </q-markup-table>

      <div v-else>No weapons meet your criteria!</div>

      <div class="col-shrink q-gutter-y-md">
        <q-btn-toggle
          v-model="weightMode"
          :options="weightModes"
          no-caps
        />

        <div class="q-gutter-md q-mt-none">
          <q-input
            type="number"
            v-model.number="weights.range"
            filled
            dense
            label="Range"
            :disable="weightMode === 'default'"
          />

          <q-input
            type="number"
            v-model.number="weights.stability"
            filled
            dense
            label="Stability"
            :disable="weightMode === 'default'"
          />

          <q-input
            type="number"
            v-model.number="weights.handling"
            filled
            dense
            label="Handling"
            :disable="weightMode === 'default'"
          />

          <q-input
            type="number"
            v-model.number="weights.reloadSpeed"
            filled
            dense
            label="Reload speed"
            :disable="weightMode === 'default'"
          />

          <q-input
            type="number"
            v-model.number="weights.aimAssistance"
            filled
            dense
            label="Aim assistance"
            :disable="weightMode === 'default'"
          />

          <q-input
            type="number"
            v-model.number="weights.zoom"
            filled
            dense
            label="Zoom"
            :disable="weightMode === 'default'"
          />

          <q-input
            type="number"
            v-model.number="weights.airborneEffectiveness"
            filled
            dense
            label="Airborne Effectiveness"
            :disable="weightMode === 'default'"
          />

          <q-input
            type="number"
            v-model.number="weights.magazine"
            filled
            dense
            label="Magazine Size"
            :disable="weightMode === 'default'"
          />

          <q-input
            type="number"
            v-model.number="weights.inventorySize"
            filled
            dense
            label="Reserves (PvE only)"
            :disable="weightMode === 'default' || gameMode === 'pvp'"
          />

          <q-input
            type="number"
            v-model.number="weights.recoilDirection"
            filled
            dense
            label="Recoil direction"
            :disable="weightMode === 'default'"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useGameStore } from 'src/stores/game-store'
import {
  DamageTypeEnum, GameMode, WeaponSlot, WeaponStats, WeaponType
} from 'src/types'

const gameStore = useGameStore()

const PVE_STAT_MODIFIERS: WeaponStats = {
  range: 3,
  stability: 1,
  handling: 1,
  reloadSpeed: 3,
  zoom: 2,
  aimAssistance: 1,
  airborneEffectiveness: 1,
  recoilDirection: 3,
  magazine: 4,
  inventorySize: 5
}

const PVP_STAT_MODIFIERS: WeaponStats = {
  range: 6,
  stability: 3,
  handling: 2,
  reloadSpeed: 1,
  zoom: 8,
  aimAssistance: 4,
  airborneEffectiveness: 2,
  recoilDirection: 1,
  magazine: 1,
  inventorySize: 0
}

const gameMode = ref<GameMode>('pvp')
const weaponType = ref<WeaponType>(WeaponType.AutoRifle)
const damageType = ref<DamageTypeEnum | null>(null)
const slot = ref<WeaponSlot | null>(null)
const frame = ref<{ name: string, hash: number } | null>(null)
const weightMode = ref<'default' | 'manual'>('default')
const weights = ref<WeaponStats>({ ...PVP_STAT_MODIFIERS })

watch(weaponType, () => frame.value = null)

watch(gameMode, () => {
  if (weightMode.value === 'default') {
    weights.value = gameMode.value === 'pve'
      ? { ...PVE_STAT_MODIFIERS }
      : { ...PVP_STAT_MODIFIERS }
  }
})

const gameModes = [
  { label: 'PvE', value: 'pve' },
  { label: 'PvP', value: 'pvp' }
]

const weightModes = [
  { label: 'Default', value: 'default' },
  { label: 'Manual', value: 'manual'}
]

const weaponTypes = [
  { label: 'Auto Rifle', value: WeaponType.AutoRifle },
  { label: 'Hand Cannon', value: WeaponType.HandCannon },
  { label: 'Pulse Rifle', value: WeaponType.PulseRifle },
  { label: 'Scout Rifle', value: WeaponType.ScoutRifle },
  { label: 'Sidearm', value: WeaponType.Sidearm },
  { label: 'Submachine Gun', value: WeaponType.SubmachineGun },
  { label: 'Fusion Rifle', value: WeaponType.FusionRifle },
  { label: 'Shotgun', value: WeaponType.Shotgun },
  { label: 'Sniper Rifle', value: WeaponType.SniperRifle },
  { label: 'Trace Rifle', value: WeaponType.TraceRifle },
  { label: 'Linear Fusion Rifle', value: WeaponType.LinearFusionRifle },
  { label: 'Machine Gun', value: WeaponType.MachineGun }
]

const weaponSlots = [
  { label: 'All', value: null },
  { label: 'Kinetic', value: WeaponSlot.Kinetic },
  { label: 'Energy', value: WeaponSlot.Energy },
  { label: 'Power', value: WeaponSlot.Power }
]

const damageTypes = [
  { label: 'All', value: null },
  { label: 'Kinetic', value: DamageTypeEnum.Kinetic },
  { label: 'Stasis', value: DamageTypeEnum.Stasis },
  { label: 'Strand', value: DamageTypeEnum.Strand },
  { label: 'Void', value: DamageTypeEnum.Void },
  { label: 'Solar', value: DamageTypeEnum.Solar },
  { label: 'Arc', value: DamageTypeEnum.Arc }
]

const frames = computed(() => {
  const frames = weapons.value.map(
    weapon => ({ name: weapon.frame, hash: weapon.frameHash })
  )
  return Array.from(new Set(frames.map(frame => frame.hash))).map(
    hash => frames.find(frame => hash === frame.hash)
  )
})

const weapons = computed(() => gameStore.weapons.filter(weapon =>
  weapon.weaponType === weaponType.value &&
  (!damageType.value || weapon.damageType === damageType.value) &&
  (!slot.value || weapon.slot === slot.value)
))

const weaponsToDisplay = computed(() => weapons.value.filter(
  weapon => !frame.value || weapon.frameHash === frame.value.hash)
)

const weaponsWithScores = computed(() => weaponsToDisplay.value.map(weapon => (
  { weapon, score: createScore(weapon.stats!, weights.value) }
)).sort((a, b) => b.score - a.score))

const judgeRecoilDirection = (recoilDirection: number) => {
  const deviation = Math.abs(
    Math.cos(recoilDirection * Math.PI / 10) * (100 - recoilDirection)
  )
  return Math.round(50 - (deviation - recoilDirection) / 2)
}

const createScore = (stats: WeaponStats, modifier: WeaponStats) => {
  return Math.round(
    stats.range * modifier.range +
    stats.stability * modifier.stability  +
    stats.handling * modifier.handling +
    stats.reloadSpeed * modifier.reloadSpeed +
    stats.zoom * modifier.zoom +
    stats.aimAssistance * modifier.aimAssistance +
    stats.airborneEffectiveness * modifier.airborneEffectiveness +
    judgeRecoilDirection(stats.recoilDirection) * modifier.recoilDirection +
    stats.magazine * modifier.magazine +
    stats.inventorySize * modifier.inventorySize * Number(gameMode.value === 'pve')
  )
}
</script>

<style scoped lang="sass">
.controls-row
  max-width: 64em
.q-select, .q-input
  min-width: 12.5em

.weapon
  min-width: 15em
  display: flex
  align-items: center
  gap: 1.5em

  & > img
    width: 2em
    height: 2em
    border-radius: 0.5em
</style>
