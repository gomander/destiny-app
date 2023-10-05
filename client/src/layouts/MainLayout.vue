<template>
  <q-layout view="lHh Lpr lFf">
    <definition-fetcher/>

    <q-header unelevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <span class="toolbar-title">DARCI</span> <span class="version">v{{ version }}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          {{ userStore.bungieNetUser?.uniqueName }}
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user-store'
import DefinitionFetcher from 'src/components/DefinitionFetcher.vue'
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'

const userStore = useUserStore()

const version = process.env.VERSION

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Home',
    caption: '',
    icon: 'fas fa-house',
    link: '/',
    exact: true
  },
  {
    title: 'Legendary Weapons',
    caption: 'By type, frame, and element',
    icon: 'fas fa-gun',
    link: '/weapons',
    exact: true
  },
  {
    title: 'Craftable Weapons',
    caption: 'By type, frame, and element',
    icon: 'fas fa-hammer',
    link: '/weapons/craftable'
  },
  {
    title: 'Raid Checklists',
    caption: 'Visualize player progress',
    icon: 'fas fa-table-cells',
    link: '/checklists/raids'
  },
  {
    title: 'Weapon Ranking',
    caption: 'Judge base stats',
    icon: 'fas fa-ranking-star',
    link: '/weapons/ranking'
  },
  // {
  //   title: 'Exotic Weapons',
  //   caption: 'Paywalls and ornaments',
  //   icon: '',
  //   link: '/weapons/exotic'
  // },
  // {
  //   title: 'Exotic Armor',
  //   caption: 'Paywalls and ornaments',
  //   icon: 'fas fa-shield-halved',
  //   link: '/armor'
  // },
  {
    title: 'Bounty Calculator',
    caption: 'Bounties to XP and levels',
    icon: 'fas fa-calculator',
    link: '/bounty-calculator'
  },
  // {
  //   title: 'Historical Power',
  //   caption: 'Levels by season',
  //   icon: 'fas fa-clock-rotate-left',
  //   link: '/historical-power'
  // }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped lang="sass">
.toolbar-title
  font-weight: 600
.version
  color: #fff8
  font-size: 50%
</style>
