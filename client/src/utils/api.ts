import axios from 'axios'
import { DestinyProfileResponse } from 'bungie-api-ts/destiny2'
import { UserInfoCard } from 'bungie-api-ts/user/interfaces'

export const authorizationURL = (state: string) => {
  const queryParams = new URLSearchParams({
    client_id: BUNGIE_OAUTH_CLIENT_ID,
    response_type: 'code',
    state
  })
  return `${BUNGIE_OAUTH_ROOT}?${queryParams}`
}

export const getAccessTokenFromCode = async (code: string) => {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: BUNGIE_OAUTH_CLIENT_ID
  })
  const res = await fetch(
    `${BUNGIE_API_ROOT}/app/oauth/token/`,
    {
      method: 'POST',
      body,
      headers: {
        'X-API-KEY': BUNGIE_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  return await res.json()
}

export const getMembershipData = async (accessToken: string) => {
  const res = await fetch(
    `${BUNGIE_API_ROOT}/User/GetMembershipsForCurrentUser/`,
    {
      headers: {
        'X-API-KEY': BUNGIE_API_KEY,
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return await res.json()
}

export const getDestinyProfileData = async (
  components: number[],
  destinyMembershipId: string,
  membershipType: number,
  accessToken?: string
) => {
  const headers: HeadersInit = { 'X-API-KEY': BUNGIE_API_KEY }
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`
  try {
    const res = await fetch(
      `${BUNGIE_API_ROOT}/Destiny2/${membershipType}/Profile/${destinyMembershipId}?components=${components.join(',')}`,
      { method: 'GET', headers }
    )
    const data = await res.json()
    return data.Response as DestinyProfileResponse
  } catch (ex) {
    console.error(ex)
  }
}

export const getDestinyManifest = async () => {
  const res = await fetch(
    `${BUNGIE_API_ROOT}/Destiny2/Manifest/`,
    {
      method: 'GET',
      headers: { 'X-API-KEY': BUNGIE_API_KEY }
    }
  )
  return await res.json()
}

export const getDestinyManifestDefinition = async (path: string) => {
  const res = await fetch(`https://www.bungie.net${path}`)
  return await res.json()
}

export const searchPlayer = async (query: string) => {
  query = query.replace('#', '%23')
  const res = await axios.get(
    `${BUNGIE_API_ROOT}/Destiny2/SearchDestinyPlayer/-1/${query}`,
    { headers: { 'X-API-KEY': BUNGIE_API_KEY } }
  )
  return res.data.Response as UserInfoCard[]
}

export const searchObject = (obj: any, searchString: string, path = ''): string | undefined => {
  for (const property in obj) {
    const fullPath = path ? `${path}.${property}` : property
    if (typeof obj[property] === 'object') {
      const result = searchObject(obj[property], searchString, fullPath)
      if (result) return result
    } else if (typeof obj[property] === 'string') {
      if (obj[property].includes(searchString)) return fullPath
    }
  }
}

const BUNGIE_API_KEY = process.env.BUNGIE_API_KEY!
const BUNGIE_API_ROOT = process.env.BUNGIE_API_ROOT!
const BUNGIE_OAUTH_CLIENT_ID = process.env.BUNGIE_OAUTH_CLIENT_ID!
const BUNGIE_OAUTH_ROOT = process.env.BUNGIE_OAUTH_ROOT!