import { showError } from './messenger'
import type { DarciApiResponse, Group } from '../types'

export const getGroup = async (groupId: string) => {
  try {
    const res = await fetch(`${process.env.DARCI_API}/groups/${groupId}`)
    const data = await res.json() as DarciApiResponse<Group>
    if (data.status !== 'success') throw data.data.error
    return data.data
  } catch (error) {
    showError(error)
  }
}

export const createGroup = async (group: Group) => {
  try {
    const res = await fetch(
      `${process.env.DARCI_API}/groups`,
      { body: JSON.stringify(group) }
    )
    const data = await res.json() as DarciApiResponse<{ path: string }>
    if (data.status !== 'success') throw data.data.error
    return data.data.path
  } catch (error) {
    showError(error)
  }
}
