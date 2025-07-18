import { defineStore } from 'pinia'
import { BungieMembershipType } from 'bungie-api-ts/app'
import { GroupUserInfoCard } from 'bungie-api-ts/groupv2'
import { GeneralUser } from 'bungie-api-ts/user'
import { BungieMember, TriumphPlayer } from '../types'

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
