<template>
  <q-page class="items-center justify-evenly q-pa-md q-gutter-y-md">
    <h1>Craftable Weapons</h1>

    <section class="q-gutter-y-md">
      <h2>Primary Ammo</h2>

      <custom-grid-display-v2
        :weapon-type="WeaponType.AutoRifle"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.Bow"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.HandCannon"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.PulseRifle"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.ScoutRifle"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.Sidearm"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.SubmachineGun"
      />
    </section>

    <section class="q-gutter-y-md">
      <h2>Special Ammo</h2>

      <custom-grid-display-v2
        :weapon-type="WeaponType.FusionRifle"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.Glaive"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.GrenadeLauncher"
        :ammo-type="AmmoType.Special"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.Shotgun"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.SniperRifle"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.TraceRifle"
      />
    </section>

    <section class="q-gutter-y-md">
      <h2>Heavy Ammo</h2>

      <custom-grid-display-v2
        :weapon-type="WeaponType.GrenadeLauncher"
        :ammo-type="AmmoType.Heavy"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.LinearFusionRifle"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.MachineGun"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.RocketLauncher"
      />

      <custom-grid-display-v2
        :weapon-type="WeaponType.Sword"
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
