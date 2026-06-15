import { env } from 'node:process'
import { Firestore } from '@google-cloud/firestore'

export default new Firestore({ projectId: env.FIREBASE_PROJECT_ID })
