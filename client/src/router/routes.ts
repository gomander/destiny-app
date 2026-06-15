import type { RouteRecordRaw } from 'vue-router'
import raids from '../data/raids'

const raidsSelector = raids.map(raid => raid.id).join('|')

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
        path: 'checklists/raids',
        children: [
          {
            path: `:id(\\w\\w\\w-\\w\\w\\w)?/:raid(${raidsSelector})?`,
            component: () => import('pages/RADChecklistPage.vue')
          },
          {
            path: `:raid(${raidsSelector})?/:players+`,
            component: () => import('pages/RADChecklistPage.vue')
          }
        ]
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
