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
    path: '/unsunset-weapons',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UnsunsetWeaponsPage.vue') }]
  },
  {
    path: '/bounty-calculator',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/BountyCalculatorPage.vue') }]
  },
  {
    path: '/weapon-ranking',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WeaponRankPage.vue') }]
  },
  {
    path: '/rad-checklist',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: ':id(\\w\\w\\w-\\w\\w\\w)?',
        component: () => import('pages/RADChecklistPage.vue'),
        children: [
          {
            path: 'last-wish',
            component: () => import('components/rad-checklists/LastWish.vue')
          },
          {
            path: 'garden-of-salvation',
            component: () => import('components/rad-checklists/GardenOfSalvation.vue')
          },
          {
            path: 'deep-stone-crypt',
            component: () => import('components/rad-checklists/DeepStoneCrypt.vue')
          },
          {
            path: 'vault-of-glass',
            component: () => import('components/rad-checklists/VaultOfGlass.vue')
          },
          {
            path: 'vow-of-the-disciple',
            component: () => import('components/rad-checklists/VowOfTheDisciple.vue')
          },
          {
            path: 'kings-fall',
            component: () => import('components/rad-checklists/KingsFall.vue')
          },
          {
            path: 'root-of-nightmares',
            component: () => import('components/rad-checklists/RootOfNightmares.vue')
          },
          {
            path: 'crotas-end',
            component: () => import('components/rad-checklists/CrotasEnd.vue')
          },
        ]
      }
    ]
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
