import { BungieMembershipType } from 'bungie-api-ts/common'
import { GroupUserInfoCard } from 'bungie-api-ts/groupv2/interfaces'
import { GeneralUser } from 'bungie-api-ts/user/interfaces'
import { defineStore } from 'pinia'
import { BungieMember, TriumphPlayer } from 'src/types/models'

export const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      accessToken: '',
      membershipId: '',
      bungieNetUser: {} as GeneralUser,
      destinyMemberships: [] as GroupUserInfoCard[],
      primaryMembershipId: '',
      primaryMembershipType: 0 as BungieMembershipType,
      records: [] as TriumphPlayer[],
      name: '',
      nameCode: 0,
      bungieMember: { } as BungieMember
    }),
    persist: true
  }
)