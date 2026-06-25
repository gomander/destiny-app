import { useDefinitionsStore, useGameStore, useUserStore } from 'stores'
import * as api from 'src/utils/api'
import { DestinyCharacterRecordsComponent, DestinyProfileRecordsComponent } from 'bungie-api-ts/destiny2'
import { TriumphPlayer } from 'src/types'

const definitionsStore = useDefinitionsStore()
const gameStore = useGameStore()
const userStore = useUserStore()

export async function getAuthenticatedProfileData(
  components = [100, 200, 201, 900],
  membershipId?: string,
  membershipType?: number,
  accessToken?: string
) {
  membershipId = membershipId || userStore.primaryMembershipId
  membershipType = membershipType || userStore.destinyMemberships.find(
    m => m.membershipId === userStore.primaryMembershipId
  )?.membershipType
  accessToken = accessToken || userStore.accessToken
  if (!(membershipId && membershipType)) return
  return await api.getDestinyProfileData(
    components, membershipId, membershipType, accessToken
  )
}

export async function getProfileData(
  components = [100, 200, 201, 900],
  membershipId: string,
  membershipType: number,
  accessToken?: string
) {
  return await api.getDestinyProfileData(
    components, membershipId, membershipType, accessToken
  )
}

export async function getProfileRecords() {
  if (!userStore.membershipId) return
  const response = await getAuthenticatedProfileData([900])
  if (!response || !response.profile.data) return
  const profileRecords = response.profileRecords.data
  const characterRecords = response.characterRecords?.data?.[response.profile.data.characterIds[0]]
  if (!profileRecords || !characterRecords) return

  userStore.records = [
    ...mapRecordsToTriumphs(profileRecords),
    ...mapRecordsToTriumphs(characterRecords)
  ]
}

export function mapRecordsToTriumphs(
  data: DestinyProfileRecordsComponent | DestinyCharacterRecordsComponent
) {
  const { records } = data
  const triumphList = gameStore.raidTriumphs.flatMap((entry) => entry.triumphs)
  const triumphs: TriumphPlayer[] = []
  for (const key of Object.keys(records)) {
    const record = records[Number(key)]
    if (!record.objectives && !record.intervalObjectives) continue
    const triumph = triumphList.find((triumph) => triumph.hash === Number(key))
    if (triumph) {
      const definition = definitionsStore.recordDefinitions.get(key)
      if (!definition) continue
      triumphs.push({
        name: definition.displayProperties.name,
        description: definition.displayProperties.description,
        icon: definition.displayProperties.icon,
        hash: Number(key),
        complete: (
          record.objectives &&
          !record.objectives.find(objective => !objective.complete)
        ) ||
        (
          record.intervalObjectives &&
          !record.intervalObjectives.find(objective => !objective.complete)
        ),
        objectives: record.objectives || record.intervalObjectives,
        required: false
      })
    }
  }
  return triumphs
}
