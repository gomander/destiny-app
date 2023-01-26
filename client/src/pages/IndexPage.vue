<template>
  <q-page class="row items-center justify-evenly">
    <weapon-table
      :weapon-type="WeaponType.Bow"
    />

    <weapon-table
      :weapon-type="WeaponType.AutoRifle"
    />

    <weapon-table
      :weapon-type="WeaponType.FusionRifle"
    />

    <weapon-table
      :weapon-type="WeaponType.Glaive"
    />

    <weapon-table
      :weapon-type="WeaponType.GrenadeLauncher"
    />

    <weapon-table
      :weapon-type="WeaponType.HandCannon"
    />

    <weapon-table
      :weapon-type="WeaponType.LinearFusionRifle"
    />

    <weapon-table
      :weapon-type="WeaponType.MachineGun"
    />

    <weapon-table
      :weapon-type="WeaponType.PulseRifle"
    />
  </q-page>
</template>

<script setup lang="ts">
import { WeaponType } from 'components/models'
import WeaponTable from 'src/components/WeaponTable.vue'
</script>
