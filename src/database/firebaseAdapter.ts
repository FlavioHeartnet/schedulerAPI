import { addDoc, collection, doc, FirestoreError, getDocs, query, QueryConstraint, setDoc } from 'firebase/firestore';
import { db } from '../firebase'
import ResponseError from '../model/responseError';
import ResponseSuccess from '../model/responseSuccess';
import { localizeErrorsMap } from './firestoreException';

interface DatabaseStruct {
  store(data, collection: string, converter): Promise<string>
  edit(data, collection: string, doc: string, converter): Promise<boolean>
}

export default class FirebaseAdapter implements DatabaseStruct {
  async store(data, collectionName: string): Promise<any> {
    try {
      return { message: (await this.insertDocument(collectionName, data)).id } as ResponseSuccess
    } catch (e) {
      const exception: FirestoreError = e
      return { code: exception.code, error: localizeErrorsMap(exception) } as ResponseError
    }
  }

  async insertDocument(collectionName: string, data: any) {
    return await addDoc(collection(db, collectionName), data);
  }

  async edit(data, collectionName: string, id: string, converter): Promise<any> {
    try {
      const userRef = doc(db, collectionName, id).withConverter(converter);
      await setDoc(userRef, data);
      return { message: id } as ResponseSuccess
    } catch (e) {
      const exception: FirestoreError = e
      return { code: exception.code, error: localizeErrorsMap(exception) } as ResponseError
    }
  }

  protected async getAllbyCollection(colletionName: string) {
    return await getDocs(query(collection(db, colletionName)));
  }

  protected async getDocbyId(colletionName: string, where: QueryConstraint[]) {
    return await getDocs(query(collection(db, colletionName), ...where));
  }
}


