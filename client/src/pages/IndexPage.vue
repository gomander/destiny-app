<template>
  <q-page class="row items-center justify-evenly">
    <weapon-table
      :weapon-type="WeaponType.Bow"
    />

    <weapon-table
      :weapon-type="WeaponType.AutoRifle"
    />

    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Todo, Meta, WeaponType } from 'components/models'
import ExampleComponent from 'components/ExampleComponent.vue'
import WeaponTable from 'src/components/WeaponTable.vue'

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1'
  },
  {
    id: 2,
    content: 'ct2'
  },
  {
    id: 3,
    content: 'ct3'
  },
  {
    id: 4,
    content: 'ct4'
  },
  {
    id: 5,
    content: 'ct5'
  }
])

const meta = ref<Meta>({
  totalCount: 1200
})
</script>
