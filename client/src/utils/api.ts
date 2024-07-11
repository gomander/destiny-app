import axios, { AxiosError } from 'axios'
import {
  DestinyManifest, DestinyProfileResponse, ServerResponse
} from 'bungie-api-ts/destiny2'
import {
  GetGroupsForMemberResponse, GroupMember, GroupMembership, SearchResultOfGroupMember
} from 'bungie-api-ts/groupv2'
import {
  UserInfoCard, UserMembershipData, UserSearchResponse,
  UserSearchResponseDetail
} from 'bungie-api-ts/user/interfaces'
import { BungieTokens } from 'src/types'

export function authorizationURL(state: string): string {
  const queryParams = new URLSearchParams({
    client_id: BUNGIE_OAUTH_CLIENT_ID,
    response_type: 'code',
    state
  })
  return `${BUNGIE_OAUTH}?${queryParams}`
}

export async function getAccessTokenFromCode(code: string): Promise<BungieTokens> {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: BUNGIE_OAUTH_CLIENT_ID
  })
  try {
    const res = await axios.post<BungieTokens>(
      `${BUNGIE_API}/app/oauth/token/`,
      body,
      {
        headers: {
          'X-API-KEY': BUNGIE_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    return res.data
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

export async function getMembershipData(accessToken: string): Promise<UserMembershipData> {
  try {
    const res = await axios.get<ServerResponse<UserMembershipData>>(
      `${BUNGIE_API}/User/GetMembershipsForCurrentUser/`,
      {
        headers: {
          'X-API-KEY': BUNGIE_API_KEY,
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )
    return res.data.Response
  } catch (error) {
    throw new Error('Bungie API request failed')
  }
}

export async function getDestinyProfileData(
  components: number[],
  destinyMembershipId: string,
  membershipType: number,
  accessToken?: string
): Promise<DestinyProfileResponse> {
  if (!destinyMembershipId || !membershipType) {
    throw new Error('Invalid Destiny membership data')
  }
  const headers: HeadersInit = { 'X-API-KEY': BUNGIE_API_KEY }
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`
  try {
    const res = await axios.get<ServerResponse<DestinyProfileResponse>>(
      `${BUNGIE_API}/Destiny2/${membershipType}/Profile/${
        destinyMembershipId
      }?components=${components.join(',')}`,
      { headers }
    )
    return res.data.Response
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

export async function getDestinyManifest(): Promise<DestinyManifest> {
  try {
    const res = await axios.get<ServerResponse<DestinyManifest>>(
      `${BUNGIE_API}/Destiny2/Manifest/`,
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    return res.data.Response
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

export async function getDestinyManifestDefinition<T>(path: string): Promise<{ [key: number]: T }> {
  try {
    const res = await axios.get<{ [key_1: number]: T} >(`${BUNGIE}${path}`)
    return res.data
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

export async function searchPlayersByBungieName(query: string): Promise<UserInfoCard[]> {
  if (!query.trim() || !/#\d{1,4}$/.test(query)) {
    throw new Error('Invalid Bungie name')
  }
  const [displayName, displayNameCode] = query.trim().split('#')
  if (!displayName || !Number(displayNameCode)) {
    throw new Error('Invalid Bungie name')
  }
  try {
    const res = await axios.post<ServerResponse<UserInfoCard[]>>(
      `${BUNGIE_API}/Destiny2/SearchDestinyPlayerByBungieName/-1`,
      { displayName, displayNameCode: Number(displayNameCode) },
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    return res.data.Response
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

export async function searchUsersByName(query: string): Promise<UserSearchResponseDetail[]> {
  query = query.trim().replace('#', '%23')
  try {
    const res = await axios.post<ServerResponse<UserSearchResponse>>(
      `${BUNGIE_API}/User/Search/GlobalName/0`,
      { displayNamePrefix: query },
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    return res.data.Response.searchResults
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

export async function getClanMembers(clanId: string, page = 1): Promise<GroupMember[]> {
  const members: GroupMember[] = []
  try {
    const res = await axios.get<ServerResponse<SearchResultOfGroupMember>>(
      `${BUNGIE_API}/GroupV2/${clanId}/Members/${page}`,
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    members.push(...res.data.Response.results)
    if (res.data.Response.hasMore) {
      members.push(...await getClanMembers(clanId, page + 1))
    }
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
  return members
}

export async function getPlayerByBungieName(bungieName: string): Promise<UserInfoCard | null> {
  const response = await searchPlayersByBungieName(bungieName)
  return response.at(0) ?? null
}

export async function getPlayerGroups(
  membershipId: string, membershipType: number
): Promise<GroupMembership[]> {
  try {
    const res = await axios.get<ServerResponse<GetGroupsForMemberResponse>>(
      `${BUNGIE_API}/GroupV2/User/${membershipType}/${membershipId}`,
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    return res.data.Response.results
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

function getApiErrorText(error: unknown): string {
  if (error instanceof AxiosError) {
    return `Bungie API request failed with status ${error.response?.status || error.status}`
  }
  return 'Bungie API request failed'
}

const BUNGIE_API_KEY = process.env.BUNGIE_API_KEY!
const BUNGIE = 'https://www.bungie.net'
const BUNGIE_API = `${BUNGIE}/Platform`
const BUNGIE_OAUTH_CLIENT_ID = process.env.BUNGIE_OAUTH_CLIENT_ID!
const BUNGIE_OAUTH = 'https://www.bungie.net/en/OAuth/Authorize'
