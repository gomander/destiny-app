import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  {
    state: () => ({
      location: '/',
      code: crypto.randomUUID().split('-')[0]
    }),
    persist: true
  }
)