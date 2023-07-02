import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { Group } from 'src/types/models'

const firebaseConfig = {
  apiKey: 'AIzaSyAOhmSCBGqBQ_ZryxkOZHxbSi8Ru3301J8',
  authDomain: 'destiny-app-23bc8.firebaseapp.com',
  projectId: 'destiny-app-23bc8',
  storageBucket: 'destiny-app-23bc8.appspot.com',
  messagingSenderId: '1073531271884',
  appId: '1:1073531271884:web:7ef08ace6c9cf02c75a069'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export const getGroup = async (groupId: string): Promise<Group> => {
  const docRef = doc(db, 'groups', groupId)
  const docSnap = await getDoc(docRef)
  return docSnap.data() as Group | undefined ||
    {
      creator: { id: 'INVALID ID', type: 0 },
      players: []
    }
}