<template>
  <q-page class="items-center justify-evenly q-pa-md">
    <h1>Craftable Weapons</h1>

    <section v-for="ammoType in AmmoType">
      <h2>{{ capitalizeText(ammoType) }}</h2>
      <div class="row q-gutter-md">
        <weapon-table
          v-for="weaponType of getWeaponTypesOfAmmoType(ammoType)"
          :weapon-type="weaponType"
          :ammo-type="ammoType"
        />
      </div>
    </section>

    <section class="q-gutter-y-md">
      <h2>Custom tables</h2>
      <custom-grid-display
        :weapon-type="WeaponType.AutoRifle"
        :ammo-type="AmmoType.Primary"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.AutoRifle"
        :ammo-type="AmmoType.Primary"
      />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import CustomGridDisplay from 'src/components/CustomGridDisplay.vue'
import CustomGridDisplayV2 from 'src/components/CustomGridDisplayV2.vue'
import { AmmoType, WeaponType } from 'src/components/models'
import WeaponTable from 'src/components/WeaponTable.vue'
import { capitalizeText, getWeaponTypesOfAmmoType } from 'src/utils/weapon-util'
</script>
