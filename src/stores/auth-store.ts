import { defineStore } from 'pinia'

interface AuthData {
  location: string
  code: string
}

const storeName = 'auth'
const initialState = getInitialValues()

export const useAuthStore = defineStore(storeName, {
  state: () => ({
    location: initialState.location,
    code: initialState.code
  }) satisfies AuthData as AuthData,
  actions: {
    prepareAuth(location: string) {
      this.location = location
      this.code = crypto.randomUUID().split('-')[0]
      localStorage.setItem(storeName, JSON.stringify(this.$state))
    },
    reset() {
      this.location = ''
      this.code = ''
      localStorage.removeItem(storeName)
    }
  }
})

function getInitialValues(): AuthData {
  const data = localStorage.getItem(storeName)
  if (!data) {
    return {
      location: '/',
      code: 'invalid'
    }
  }
  return JSON.parse(data)
}
