import FirestoreDatabase from '../firestore-database'
import { CreateGroupData } from '../types'

export const getGroup = async (path: string) => {
  const db = FirestoreDatabase()
  const snapshot = await db.doc(`groups/${path}`).get()
  return snapshot.data()
}

export const createGroup = async (group: CreateGroupData) => {
  const db = FirestoreDatabase()
  const path = await createUniquePath()
  await db.collection('groups').doc(path).set(group)
  return { path }
}

const createUniquePath = async () => {
  let newPath
  while (true) {
    newPath = getRandomPath()
    if (await pathIsAvailable(newPath)) break
  }
  return newPath
}

const getRandomPath = () => {
  return `${getRandomChars(3)}-${getRandomChars(3)}`
}

const pathIsAvailable = async (path: string) => {
  const db = FirestoreDatabase()
  const doc = await db.doc(`groups/${path}`).get()
  return !doc.exists
}

const getRandomChars = (charCount: number): string => {
  let retVal = ''
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789'
  for (let i = 0; i < charCount; i++) {
    retVal += chars[Math.floor(Math.random() * chars.length)]
  }
  return retVal
}
