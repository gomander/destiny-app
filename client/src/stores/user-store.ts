import { defineStore } from 'pinia'
import { BungieMembershipType } from 'bungie-api-ts/common'
import { GroupUserInfoCard } from 'bungie-api-ts/groupv2/interfaces'
import { GeneralUser } from 'bungie-api-ts/user/interfaces'
import { BungieMember, TriumphPlayer } from 'src/types'

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
