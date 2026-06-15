import { defineStore } from 'pinia'
import type { BungieMembershipType } from 'bungie-api-ts/app'
import type { GroupUserInfoCard } from 'bungie-api-ts/groupv2'
import type { GeneralUser } from 'bungie-api-ts/user'
import type { BungieMember, TriumphPlayer } from '../types'

export const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      accessToken: '',
      membershipId: '',
      bungieNetUser: null as GeneralUser | null,
      destinyMemberships: [] as GroupUserInfoCard[],
      primaryMembershipId: '',
      primaryMembershipType: 0 as BungieMembershipType,
      records: [] as TriumphPlayer[],
      name: '',
      nameCode: 0,
      bungieMember: null as BungieMember | null
    }),
    persist: true
  }
)
