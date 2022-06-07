import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'

interface DatabaseStruct {
  store(data, collection: string, converter): Promise<string>
  edit(data, collection: string, doc: string, converter): Promise<boolean>
}

export default class FirebaseAdapter implements DatabaseStruct {
  async store(data, collectionName: string): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { message: docRef.id }
    } catch (e) {
      return { message: e }
    }
  }

  edit(data, collection: string, doc: string, converter): Promise<boolean> {
    const docRef = db.collection(collection).doc(doc).withConverter(converter)

    const resp = docRef
      .set(data)
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })

    return resp
  }

  protected getAllbyCollection(collection: string) {
    return db.collection(collection).get()
  }

  protected getDocbyId(collection: string, id: string) {
    return db.collection(collection).doc(id).get()
  }
}


