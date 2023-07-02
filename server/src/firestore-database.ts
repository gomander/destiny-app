import { Firestore } from '@google-cloud/firestore'

const db = new Firestore({ projectId: process.env.PROJECT_ID })

const getInstance = () => db

export default getInstance