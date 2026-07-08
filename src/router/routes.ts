import type { RouteRecordRaw } from 'vue-router'
import { raids, dungeons } from 'src/data/raids'

const raidsSelector = raids.map((raid) => raid.id).join('|')
const dungeonsSelector = dungeons.map((dungeon) => dungeon.id).join('|')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'weapons',
        children: [
          {
            path: '',
            component: () => import('pages/WeaponsPage.vue')
          },
          {
            path: 'ranking',
            component: () => import('pages/WeaponRankPage.vue')
          }
        ]
      },
      {
        path: `checklists/:activity(${raidsSelector}|${dungeonsSelector})?`,
        component: () => import('pages/RADChecklistPage.vue')
      },
      {
        path: 'auth-return',
        component: () => import('pages/AuthReturnPage.vue')
      }
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
