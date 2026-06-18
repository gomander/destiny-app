import { defineStore } from '#q-app/wrappers'
import { createPinia } from 'pinia'
import { useAuthStore } from './auth-store'
import { useDefinitionsStore } from './definitions-store'
import { useGameStore } from './game-store'
import { useUserStore } from './user-store'

export default defineStore(createPinia)

export { useAuthStore, useDefinitionsStore, useGameStore, useUserStore }
