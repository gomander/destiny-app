<template>
  <q-page class="items-center justify-evenly q-pa-md">
    <h1>Weapon Ranking</h1>

    <q-btn-toggle
      v-model="state.mode"
      :options="[
        { label: 'PvE', value: 'pve' },
        { label: 'PvP', value: 'pvp' }
      ]"
    />

    <div v-for="weapon of sortedWeapons">
      {{ weapon.name }} {{ createScore(weapon.stats!) }}
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useGameStore } from 'src/stores/game-store'
import {
  DamageTypeEnum, GameMode, WeaponSlot, WeaponStats, WeaponType
} from 'src/types/models'

const gameStore = useGameStore()

const state = reactive({
  mode: 'pvp' as GameMode,
  weaponType: 'hand cannon' as WeaponType,
  damageType: null as DamageTypeEnum | null,
  slot: 'energy' as WeaponSlot | null
})

const weapons = computed(() => gameStore.weapons.filter(weapon =>
  weapon.weaponType === state.weaponType &&
  (!state.damageType || weapon.damageType === state.damageType) &&
  (!state.slot || weapon.slot === state.slot)
))

const sortedWeapons = computed(() => weapons.value.sort(
  (a, b) => createScore(b.stats!) - createScore(a.stats!)
))

const PVE_STAT_MODIFIERS: WeaponStats = {
  range: 1,
  stability: 1 / 2,
  handling: 1 / 3,
  reloadSpeed: 3 / 5,
  zoom: 5 / 2,
  aimAssistance: 2 / 3,
  airborneEffectiveness: 1,
  recoilDirection: 1 / 4,
  magazine: 2 / 5,
  inventorySize: 3
}

const PVP_STAT_MODIFIERS: WeaponStats = {
  range: 1,
  stability: 3 / 5,
  handling: 2 / 5,
  reloadSpeed: 1 / 3,
  zoom: 3,
  aimAssistance: 1,
  airborneEffectiveness: 1,
  recoilDirection: 1 / 4,
  magazine: 1 / 5,
  inventorySize: 0
}

const judgeRecoilDirection = (recoilDirection: number) => {
  const deviation = Math.abs(
    Math.cos(recoilDirection * Math.PI / 10) * (100 - recoilDirection)
  )
  return Math.round(50 - (deviation - recoilDirection) / 2)
}

const createScore = (stats: WeaponStats) => {
  const modifier = state.mode === 'pve'
    ? PVE_STAT_MODIFIERS
    : PVP_STAT_MODIFIERS
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
    stats.inventorySize * modifier.inventorySize
  )
}
</script>