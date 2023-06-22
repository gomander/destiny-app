import { DestinyRecordComponent } from 'bungie-api-ts/destiny2'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      accessToken: '',
      membershipId: '',
      bungieNetUser: {} as any,
      destinyMemberships: [] as any[],
      primaryMembershipId: '',
      records: [] as DestinyRecordComponent[]
    }),
    persist: true
  }
)