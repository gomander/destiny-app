import axios from 'axios'
import {
  DestinyManifest, DestinyProfileResponse, ServerResponse
} from 'bungie-api-ts/destiny2'
import {
  UserInfoCard, UserMembershipData, UserSearchResponse
} from 'bungie-api-ts/user/interfaces'
import { BungieTokens } from 'src/types'

export const authorizationURL = (state: string) => {
  const queryParams = new URLSearchParams({
    client_id: BUNGIE_OAUTH_CLIENT_ID,
    response_type: 'code',
    state
  })
  return `${BUNGIE_OAUTH}?${queryParams}`
}

export const getAccessTokenFromCode = async (code: string) => {
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
    console.error(error)
  }
}

export const getMembershipData = async (accessToken: string) => {
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
    console.error(error)
  }
}

export const getDestinyProfileData = async (
  components: number[],
  destinyMembershipId: string,
  membershipType: number,
  accessToken?: string
) => {
  if (!destinyMembershipId || !membershipType) return
  const headers: HeadersInit = { 'X-API-KEY': BUNGIE_API_KEY }
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`
  try {
    const res = await axios.get<ServerResponse<DestinyProfileResponse>>(
      `${BUNGIE_API}/Destiny2/${membershipType}/Profile/${destinyMembershipId}?components=${components.join(',')}`,
      { headers }
    )
    return res.data.Response
  } catch (error) {
    console.error(error)
  }
}

export const getDestinyManifest = async () => {
  try {
    const res = await axios.get<ServerResponse<DestinyManifest>>(
      `${BUNGIE_API}/Destiny2/Manifest/`,
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    return res.data.Response
  } catch (error) {
    console.error(error)
  }
}

export const getDestinyManifestDefinition = async <T>(path: string) => {
  try {
    const res = await axios.get<{ [key: number]: T }>(`${BUNGIE}${path}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
  return {}
}

export const searchPlayer = async (query: string) => {
  query = query.trim().replace('#', '%23')
  try {
    const res = await axios.get<ServerResponse<UserInfoCard[]>>(
      `${BUNGIE_API}/Destiny2/SearchDestinyPlayer/-1/${query}`,
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    return res.data.Response
  } catch (error) {
    console.error(error)
  }
  return []
}

export const searchPlayersByName = async (query: string) => {
  const [name, code] = query.trim().split('#')
  const body = { displayName: name, displayNameCode: code }
  try {
    const res = await axios.post<ServerResponse<UserInfoCard[]>>(
      `${BUNGIE_API}/Destiny2/SearchDestinyPlayerByBungieName/-1`,
      body,
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    return res.data.Response
  } catch (error) {
    console.error(error)
  }
  return []
}

export const searchUsersByName = async (query: string) => {
  query = query.trim().replace('#', '%23')
  try {
    const res = await axios.post<ServerResponse<UserSearchResponse>>(
      `${BUNGIE_API}/User/Search/GlobalName/0`,
      { displayNamePrefix: query },
      { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
    )
    return res.data.Response.searchResults
  } catch (error) {
    console.error(error)
  }
  return []
}

const BUNGIE_API_KEY = process.env.BUNGIE_API_KEY!
const BUNGIE = 'https://www.bungie.net'
const BUNGIE_API = `${BUNGIE}/Platform`
const BUNGIE_OAUTH_CLIENT_ID = process.env.BUNGIE_OAUTH_CLIENT_ID!
const BUNGIE_OAUTH = 'https://www.bungie.net/en/OAuth/Authorize'
