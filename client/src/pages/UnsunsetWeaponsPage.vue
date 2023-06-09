<template>
  <q-page class="items-center justify-evenly q-pa-md q-gutter-y-md">
    <h1>Unsunset Weapons</h1>

    <p>A 1080p landscape display is recommended for this page.</p>

    <section
      class="q-gutter-y-md"
      v-for="ammoType of AmmoType"
    >
      <h2>{{ capitalizeText(ammoType) }} Ammo</h2>

      <custom-grid-display
        v-for="weaponType of getWeaponTypesOfAmmoType(ammoType)"
        :weapon-type="weaponType"
        :ammo-type="ammoType"
        :weapons="gameStore.weapons"
      />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import CustomGridDisplay from 'src/components/CustomGridDisplay.vue'
import { AmmoType } from 'src/types/models'
import { capitalizeText, getWeaponTypesOfAmmoType } from 'src/utils/weapon-util'
import { useGameStore } from 'src/stores/game-store'

const gameStore = useGameStore()
</script>