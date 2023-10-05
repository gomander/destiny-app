import { RouteRecordRaw } from 'vue-router'
import raids from 'src/data/raids'

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
            component: () => import('pages/UnsunsetWeaponsPage.vue')
          },
          {
            path: 'craftable',
            component: () => import('pages/CraftableWeaponsPage.vue')
          },
          {
            path: 'ranking',
            component: () => import('pages/WeaponRankPage.vue')
          }
        ]
      },
      {
        path: 'checklists',
        children: [
          {
            path: `raids/:id(\\w\\w\\w-\\w\\w\\w)?/:raid(${raidsSelector})?`,
            component: () => import('pages/RADChecklistPage.vue')
          }
        ]
      },
      {
        path: 'bounty-calculator',
        component: () => import('pages/BountyCalculatorPage.vue')
      },
      {
        path: 'historical-power',
        component: () => import('pages/HistoricalPowerPage.vue')
      },
      {
        path: 'auth-return',
        component: () => import('pages/AuthReturnPage.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
