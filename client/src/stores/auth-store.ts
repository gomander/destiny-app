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
      this.code = getCode()
      this.persist()
    },
    persist() {
      localStorage.setItem(storeName, JSON.stringify(this.$state))
    },
    reset() {
      this.location = '/'
      this.code = getCode()
      localStorage.removeItem(storeName)
    }
  }
})

function getInitialValues(): AuthData {
  const data = JSON.parse(localStorage.getItem(storeName) || '{}')
  if (
    !data ||
    typeof data !== 'object' ||
    !('location' in data) ||
    typeof data.location !== 'string' ||
    !('code' in data) ||
    typeof data.code !== 'string'
  ) {
    return {
      location: '/',
      code: getCode()
    }
  }
  return data
}

function getCode() {
  return crypto.randomUUID().split('-')[0]
}
