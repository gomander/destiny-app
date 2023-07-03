import { defineStore } from 'pinia'
import { TriumphPlayer } from 'src/types/models'

export const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      accessToken: '',
      membershipId: '',
      bungieNetUser: {} as any,
      destinyMemberships: [] as any[],
      primaryMembershipId: '',
      primaryMembershipType: 0,
      records: [] as TriumphPlayer[]
    }),
    persist: true
  }
)