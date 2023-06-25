import { DestinyProfileRecordsComponent } from 'bungie-api-ts/destiny2'
import { useDefinitionsStore } from 'src/stores/definitions-store'
import { useGameStore } from 'src/stores/game-store'
import { useUserStore } from 'src/stores/user-store'
import { TriumphPlayer } from 'src/types/models'
import * as api from 'src/utils/api'

const definitionsStore = useDefinitionsStore()
const gameStore = useGameStore()
const userStore = useUserStore()

export const getAuthenticatedProfileData = async (
  components = [100, 200, 201, 900],
  membershipId?: string,
  membershipType = 3,
  accessToken?: string
) => {
  return await api.getDestinyProfileData(
    components,
    membershipId || userStore.primaryMembershipId,
    membershipType || userStore.destinyMemberships.find(
      m => m.membershipId === userStore.primaryMembershipId
    ).membershipType,
    accessToken || userStore.accessToken
  )
}

export const getProfileData = async (
  components = [100, 200, 201, 900],
  membershipId?: string,
  membershipType = 3,
  accessToken?: string
) => {
  return await api.getDestinyProfileData(
    components,
    membershipId || userStore.primaryMembershipId,
    membershipType || userStore.destinyMemberships.find(
      m => m.membershipId === userStore.primaryMembershipId
    ).membershipType,
    accessToken
  )
}

export const getProfileRecords = async () => {
  if (!userStore.membershipId) return
  const profile = await getAuthenticatedProfileData([900])
  console.log(profile)

  const records = profile?.profileRecords.data
  if (!records) return

  userStore.records = mapProfileRecordsToTriumphs(records)
}

export const mapProfileRecordsToTriumphs = (
  profileRecords: DestinyProfileRecordsComponent
) => {
  const records = profileRecords.records
  const triumphList = gameStore.raidTriumphs.map(entry => entry.triumphs).flat()

  const triumphs: TriumphPlayer[] = []
  for (const key of Object.keys(records)) {
    const record = records[Number(key)]

    const triumph = triumphList.find(triumph => triumph.hash === Number(key))
    if (triumph) {
      const definition = definitionsStore.recordDefinitions[key]
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
        objectives: record.objectives || record.intervalObjectives
      })
    }
  }

  return triumphs
}