export const getMembershipDataForCurrentUser = async () => {
  const res = await fetch(
    `${BUNGIE_API_ROOT}/User/GetMembershipsForCurrentUser/`
  )
  const respObj = await res.json()
  console.log(respObj)
}

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

const BUNGIE_API_KEY = process.env.BUNGIE_API_KEY!
const BUNGIE_API_ROOT = process.env.BUNGIE_API_ROOT!
const BUNGIE_OAUTH_CLIENT_ID = process.env.BUNGIE_OAUTH_CLIENT_ID!
const BUNGIE_OAUTH_ROOT = process.env.BUNGIE_OAUTH_ROOT!