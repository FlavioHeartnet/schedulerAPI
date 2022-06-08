import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreError,
  getDocs,
  query,
  QueryConstraint,
  QuerySnapshot,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import ResponseError from '../model/responseError'
import ResponseSuccess from '../model/responseSuccess'
import { localizeErrorsMap } from './firestoreException'

interface DatabaseStruct {
  store(
    data,
    collection: string,
    converter
  ): Promise<ResponseSuccess | ResponseError>
  edit(
    data,
    collection: string,
    doc: string,
    converter
  ): Promise<ResponseSuccess | ResponseError>
}

export default class FirebaseAdapter implements DatabaseStruct {
  async store(
    data,
    collectionName: string
  ): Promise<ResponseSuccess | ResponseError> {
    try {
      return {
        message: (await this.insertDocument(collectionName, data)).id,
      } as ResponseSuccess
    } catch (e) {
      const exception: FirestoreError = e
      return {
        code: exception.code,
        message: localizeErrorsMap(exception),
      } as ResponseError
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
  ): Promise<ResponseSuccess | ResponseError> {
    try {
      await this.editDocument(collectionName, id, data)
      return { message: id } as ResponseSuccess
    } catch (e) {
      const exception: FirestoreError = e
      return {
        code: exception.code,
        message: localizeErrorsMap(exception),
      } as ResponseError
    }
  }

  async editDocument(collectionName: string, id: string, data: object) {
    await setDoc(doc(collection(db, collectionName), id), data)
  }

  protected async getAllbyCollection(
    colletionName: string
  ): Promise<QuerySnapshot<DocumentData>> {
    return await getDocs(query(collection(db, colletionName)))
  }

  protected async getDocbyId(
    colletionName: string,
    where: QueryConstraint[]
  ): Promise<QuerySnapshot<DocumentData>> {
    return await getDocs(query(collection(db, colletionName), ...where))
  }
}
