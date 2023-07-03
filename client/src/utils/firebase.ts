import axios from 'axios'
import { Group } from 'src/types/models'

export const getGroup = async (groupId: string): Promise<Group> => {
  const res = await axios.get<{ status: string, data: Group }>(
    `${process.env.DARCI_API_ROOT}groups/${groupId}`
  )
  return res.data.data
}

export const createGroup = async (group: Group) => {
  const res = await axios.post(
    `${process.env.DARCI_API_ROOT}groups`,
    group
  )
  return res.data
}