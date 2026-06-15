<template>
  <q-page class="items-center justify-evenly q-pa-md q-gutter-y-md">
    <h1>Weapons</h1>

    <p>
      Smaller displays may have to scroll horizontally and/or close the
      navigation drawer to see all the data.
    </p>

    <h2>Selection</h2>

    <q-option-group
      v-model="selection"
      :options="selectionOptions"
      color="primary"
    />

    <section
      class="q-gutter-y-md"
      v-for="ammoType of AmmoType"
    >
      <h2>{{ capitalizeText(ammoType) }} Ammo</h2>

      <custom-grid-display
        v-for="weaponType of getWeaponTypesOfAmmoType(ammoType)"
        :weapon-type="weaponType"
        :ammo-type="ammoType"
        :weapons="finalWeaponsList"
      />
    </section>
  </q-page>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { capitalizeText, getWeaponTypesOfAmmoType } from '../utils/weapon-util'
  import { useGameStore } from '../stores/game-store'
  import CustomGridDisplay from '../components/CustomGridDisplay.vue'
  import { AmmoType } from '../types'

  const gameStore = useGameStore()

  const selectionOptions = [
    { label: 'All', value: 'all' },
    { label: 'Tiered', value: 'tiered' },
    { label: 'Craftable', value: 'craftable' }
  ]

  const selection = ref('tiered');

  const dedupedWeapons = computed(() => {
    const map = new Map()
    for (const weapon of gameStore.weapons) {
      const existing = map.get(weapon.name)
      if (!existing || weapon.released > existing.released) {
        map.set(weapon.name, weapon)
      }
    }
    return Array.from(map.values())
  })
  const finalWeaponsList = computed(() => {
    if (selection.value === 'craftable') {
      return dedupedWeapons.value.filter((weapon) => weapon.craftable)
    }
    if (selection.value === 'tiered') {
      return dedupedWeapons.value.filter((weapon) => weapon.tiered)
    }
    return dedupedWeapons.value
  })
</script>
