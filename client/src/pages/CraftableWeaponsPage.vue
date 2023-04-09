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
          :weapons="userStore.craftableWeapons"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { AmmoType } from 'src/components/models'
import WeaponTable from 'src/components/WeaponTable.vue'
import { capitalizeText, getWeaponTypesOfAmmoType } from 'src/utils/weapon-util'
import { useUserStore } from 'src/stores/user-store'

const userStore = useUserStore()
</script>
