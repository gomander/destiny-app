export const authorizationURL = () => {
  const queryParams = new URLSearchParams({
    client_id: BUNGIE_OAUTH_CLIENT_ID,
    response_type: 'code',
    state: '123'
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
  components: string[] | number[],
  destinyMembershipId: string,
  membershipType: number,
  accessToken: string
) => {
  const res = await fetch(
    `${BUNGIE_API_ROOT}/Destiny2/${membershipType}/Profile/${destinyMembershipId}?components=${components.join(',')}`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': BUNGIE_API_KEY,
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return await res.json()
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