<template>
  <q-layout view="lHh Lpr lFf">
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
          Destiny Stuff
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
          Essential Links
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
import { useQuasar } from 'quasar';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'

const $q = useQuasar()
$q.dark.set('auto')

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Home',
    caption: '',
    icon: 'code',
    link: '/'
  },
  {
    title: 'Craftable Weapons',
    caption: 'By type, frame, and element',
    icon: 'school',
    link: '/craftable-weapons'
  },
  {
    title: 'Bounty Calculator',
    caption: 'Bounties to XP and levels',
    icon: 'chat',
    link: '/bounty-calculator'
  },
  {
    title: 'Historical Power',
    caption: 'Levels by season',
    icon: 'chat',
    link: '/historical-power'
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
