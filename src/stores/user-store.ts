import { defineStore } from 'pinia'
import type { BungieMembershipType } from 'bungie-api-ts/app'
import type { GroupUserInfoCard } from 'bungie-api-ts/groupv2'
import type { GeneralUser } from 'bungie-api-ts/user'
import type { BungieMember, TriumphPlayer } from 'src/types'

interface UserData {
  accessToken: string
  membershipId: string
  bungieNetUser: GeneralUser | null
  destinyMemberships: GroupUserInfoCard[]
  primaryMembershipId: string
  primaryMembershipType: BungieMembershipType
  records: TriumphPlayer[]
  name: string
  nameCode: number
  bungieMember: BungieMember | null
}

const storeName = 'user'
const initialState = getInitialValues()

export const useUserStore = defineStore(storeName, {
  state: () => ({
    accessToken: initialState.accessToken,
    membershipId: initialState.membershipId,
    bungieNetUser: initialState.bungieNetUser,
    destinyMemberships: initialState.destinyMemberships,
    primaryMembershipId: initialState.primaryMembershipId,
    primaryMembershipType: initialState.primaryMembershipType,
    records: initialState.records,
    name: initialState.name,
    nameCode: initialState.nameCode,
    bungieMember: initialState.bungieMember
  }) satisfies UserData as UserData,
  actions: {
    persist() {
      localStorage.setItem(storeName, JSON.stringify(this.$state))
    }
  }
})

function getInitialValues(): UserData {
  try {
    const data = localStorage.getItem(storeName)
    if (data) return JSON.parse(data)
  } catch {}
  return {
    accessToken: '',
    membershipId: '',
    bungieNetUser: null,
    destinyMemberships: [],
    primaryMembershipId: '',
    primaryMembershipType: 0,
    records: [],
    name: '',
    nameCode: 0,
    bungieMember: null
  }
}
