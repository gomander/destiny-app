<template>
  <q-layout view="lHh Lpr lFf">
    <definition-fetcher/>

    <q-header elevated>
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
          DARCI
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
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

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Home',
    caption: '',
    icon: 'fas fa-house',
    link: '/'
  },
  {
    title: 'Craftable Weapons',
    caption: 'By type, frame, and element',
    icon: 'fas fa-hammer',
    link: '/craftable-weapons'
  },
  {
    title: 'Unsunset Weapons',
    caption: 'By type, frame, and element',
    icon: 'fas fa-gun',
    link: '/unsunset-weapons'
  },
  {
    title: 'Bounty Calculator',
    caption: 'Bounties to XP and levels',
    icon: 'fas fa-calculator',
    link: '/bounty-calculator'
  },
  {
    title: 'Weapon Ranking',
    caption: 'Judge base stats',
    icon: 'fas fa-ranking-star',
    link: '/weapon-ranking'
  },
  {
    title: 'RAD Checklists',
    caption: 'Visualize player progress',
    icon: 'fas fa-table-cells',
    link: '/rad-checklist'
  }
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
