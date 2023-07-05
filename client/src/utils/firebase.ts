import axios from 'axios'
import { showError } from 'src/utils/messenger'
import { DarciApiResponse, Group } from 'src/types'

export const getGroup = async (groupId: string) => {
  try {
    const res = await axios.get<DarciApiResponse<Group>>(
      `${process.env.DARCI_API_ROOT}groups/${groupId}`
    )
    if (res.data.status !== 'success') throw res.data.data.error
    return res.data.data
  } catch (error) {
    console.error(error)
    showError(error)
  }
}

export const createGroup = async (group: Group) => {
  try {
    const res = await axios.post<DarciApiResponse<{ path: string }>>(
      `${process.env.DARCI_API_ROOT}groups`,
      group
    )
    if (res.data.status !== 'success') throw res.data.data.error
    return res.data.data.path
  } catch (error) {
    console.error(error)
    showError(error)
  }
}