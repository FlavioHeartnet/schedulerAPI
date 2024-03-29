import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreError,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase'
import ResponseSuccess from '../../domain/responseSuccess'
import { localizeErrorsMap } from './firestoreException'

interface DatabaseStruct {
  store(data, collection: string, converter): Promise<ResponseSuccess>
  edit(
    data,
    collection: string,
    doc: string,
    converter
  ): Promise<ResponseSuccess>
}

export default class FirebaseDb implements DatabaseStruct {
  protected db: Firestore = db
  async store(data, collectionName: string): Promise<ResponseSuccess> {
    try {
      return {
        message: (await this.insertDocument(collectionName, data)).id,
        snapshop: [],
      } as ResponseSuccess
    } catch (e) {
      throw this.exceptionHandler(e)
    }
  }

  async insertDocument(
    collectionName: string,
    data: object
  ): Promise<DocumentReference> {
    return await addDoc(collection(db, collectionName), data)
  }

  async edit(
    data,
    collectionName: string,
    id: string
  ): Promise<ResponseSuccess> {
    try {
      await this.editDocument(collectionName, id, data)
      return { message: id, snapshop: [] } as ResponseSuccess
    } catch (e) {
      throw this.exceptionHandler(e)
    }
  }

  protected exceptionHandler(e): Error {
    const exception: FirestoreError = e
    return {
      name: exception.code,
      message: localizeErrorsMap(exception),
    }
  }

  async editDocument(collectionName: string, id: string, data: object) {
    await setDoc(doc(collection(db, collectionName), id), data)
  }

  protected async getAllbyCollection(
    colletionName: string
  ): Promise<ResponseSuccess> {
    try {
      return {
        message: 'ok',
        snapshop: this.mountObjArray(
          await getDocs(query(collection(db, colletionName)))
        ),
      } as ResponseSuccess
    } catch (e) {
      throw this.exceptionHandler(e)
    }
  }

  protected async getDocbyId(
    colletionName: string,
    id: String
  ): Promise<ResponseSuccess> {
    try {
      return {
        message: id,
        snapshop: this.mountObjArray(
          await getDocs(
            query(collection(db, colletionName), where('id', '==', id))
          )
        ),
      } as ResponseSuccess
    } catch (e) {
      throw this.exceptionHandler(e)
    }
  }

  private mountObjArray(result: QuerySnapshot<DocumentData>) {
    const objArray: Array<unknown> = []
    result.forEach((snapshot) => {
      objArray.push(snapshot.data().values)
    })
    return objArray
  }

  protected getDocsbyWhere(
    collectionName: string,
    property: unknown,
    collectionProperty: string
  ) {
    return getDocs(
      query(
        collection(db, collectionName),
        where(collectionProperty, '==', property)
      )
    )
  }
}
