<template>
  <q-page class="items-center justify-evenly q-pa-md q-gutter-y-md">
    <h1>Craftable Weapons</h1>

    <p>
      Smaller displays may have to scroll horizontally and/or close the
      navigation drawer to see all the data.
    </p>

    <section
      class="q-gutter-y-md"
      v-for="ammoType of AmmoType"
    >
      <h2>{{ capitalizeText(ammoType) }} Ammo</h2>

      <custom-grid-display
        v-for="weaponType of getWeaponTypesOfAmmoType(ammoType)"
        :weapon-type="weaponType"
        :ammo-type="ammoType"
        :weapons="gameStore.craftableWeapons"
      />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/game-store'
import { capitalizeText, getWeaponTypesOfAmmoType } from '../utils/weapon-util'
import CustomGridDisplay from 'src/components/CustomGridDisplay.vue'
import { AmmoType } from '../types'

const gameStore = useGameStore()
</script>
