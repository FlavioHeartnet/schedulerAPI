import { db } from '../firebase'

interface DatabaseStruct {
  store(data, collection: string, converter): Promise<string>
  edit(data, collection: string, doc: string, converter): Promise<boolean>
}

export default class BaseDb implements DatabaseStruct {
  store(data, collection: string, converter): Promise<string> {
    const docRef = db.collection(collection).withConverter(converter)

    const resp = docRef
      .add(data)
      .then((d) => {
        return d.id
      })
      .catch(() => {
        return ''
      })

    return resp
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
