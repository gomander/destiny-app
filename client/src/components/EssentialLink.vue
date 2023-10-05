<template>
  <q-item
    clickable
    tag="router-link"
    :to="link"
    :active="exact ? $route.fullPath === link : $route.fullPath.includes(link)"
    active-class="text-primary"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string
  caption?: string
  link?: string
  icon?: string
  exact?: boolean
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '/',
  icon: '',
  exact: false
})
</script>
