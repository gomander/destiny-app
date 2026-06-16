import type {
  DestinyManifest, DestinyProfileResponse, ServerResponse
} from 'bungie-api-ts/destiny2'
import type {
  GetGroupsForMemberResponse, GroupMember, GroupMembership, SearchResultOfGroupMember
} from 'bungie-api-ts/groupv2'
import type {
  UserInfoCard, UserMembershipData, UserSearchResponse, UserSearchResponseDetail
} from 'bungie-api-ts/user'
import type { BungieTokens } from 'src/types'

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
    const res = await fetch(
      `${BUNGIE_API}/app/oauth/token/`,
      {
        method: 'POST',
        headers: {
          'X-API-KEY': BUNGIE_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      }
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json() as BungieTokens
    return data
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

export async function getMembershipData(accessToken: string): Promise<UserMembershipData> {
  try {
    const res = await fetch(
      `${BUNGIE_API}/User/GetMembershipsForCurrentUser/`,
      {
        headers: {
          'X-API-KEY': BUNGIE_API_KEY,
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json() as ServerResponse<UserMembershipData>
    return data.Response
  } catch {
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
    const res = await fetch(
      `${BUNGIE_API}/Destiny2/${membershipType}/Profile/${destinyMembershipId}?components=${components.join(',')}`,
      { headers }
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json() as ServerResponse<DestinyProfileResponse>
    return data.Response
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

export async function getDestinyManifest(): Promise<DestinyManifest> {
  try {
    const res = await fetch(
      `${BUNGIE_API}/Destiny2/Manifest/`,
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json() as ServerResponse<DestinyManifest>
    return data.Response
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

export async function getDestinyManifestDefinition<T>(path: string): Promise<{ [k: number]: T }> {
  try {
    const res = await fetch(`${BUNGIE}${path}`)
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json() as { [k: number]: T }
    return data
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
    const res = await fetch(
      `${BUNGIE_API}/Destiny2/SearchDestinyPlayerByBungieName/-1`,
      {
        headers: {
          'X-API-KEY': BUNGIE_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ displayName, displayNameCode: Number(displayNameCode) })
      }
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json() as ServerResponse<UserInfoCard[]>
    return data.Response
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

export async function searchUsersByName(query: string): Promise<UserSearchResponseDetail[]> {
  query = query.trim().replace('#', '%23')
  try {
    const res = await fetch(
      `${BUNGIE_API}/User/Search/GlobalName/0`,
      {
        method: 'POST',
        headers: { 'X-API-KEY': BUNGIE_API_KEY },
        body: JSON.stringify({ displayNamePrefix: query })
      }
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json() as ServerResponse<UserSearchResponse>
    return data.Response.searchResults
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

export async function getClanMembers(clanId: string, page = 1): Promise<GroupMember[]> {
  const members: GroupMember[] = []
  try {
    const res = await fetch(
      `${BUNGIE_API}/GroupV2/${clanId}/Members/${page}`,
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json() as ServerResponse<SearchResultOfGroupMember>
    members.push(...data.Response.results)
    if (data.Response.hasMore) {
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
    const res = await fetch(
      `${BUNGIE_API}/GroupV2/User/${membershipType}/${membershipId}`,
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json() as ServerResponse<GetGroupsForMemberResponse>
    return data.Response.results
  } catch (error) {
    throw new Error(getApiErrorText(error))
  }
}

function getApiErrorText(error: unknown): string {
  if (error instanceof Error) {
    return `Bungie API request failed with status ${error.message}`
  }
  return 'Bungie API request failed'
}

const BUNGIE_API_KEY = process.env.BUNGIE_API_KEY!
const BUNGIE = 'https://www.bungie.net'
const BUNGIE_API = `${BUNGIE}/Platform`
const BUNGIE_OAUTH_CLIENT_ID = process.env.BUNGIE_OAUTH_CLIENT_ID!
const BUNGIE_OAUTH = 'https://www.bungie.net/en/OAuth/Authorize'
