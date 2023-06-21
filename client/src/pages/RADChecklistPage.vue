<template>
  <q-page class="q-pa-md">
    <h1>Raid and Dungeon Checklist</h1>

    <div v-if="$route.params.id">
      {{ $route.params.id }}
    </div>

    <div v-else>
      <q-btn
        label="Create group"
        no-caps
      />
    </div>

    <div>
      Links to other raids here
    </div>

    <router-view/>
  </q-page>
</template>

<script setup lang="ts">

</script>