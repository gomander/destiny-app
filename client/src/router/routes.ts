import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/craftable-weapons',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CraftableWeaponsPage.vue') }]
  },
  {
    path: '/bounty-calculator',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/BountyCalculatorPage.vue') }]
  },
  {
    path: '/historical-power',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HistoricalPowerPage.vue') }]
  },
  {
    path: '/auth-return',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AuthReturnPage.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
