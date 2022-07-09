import {
  CollectionReference,
  DocumentReference,
  FirestoreError,
} from 'firebase/firestore'
import FirebaseAdapter from '../../infra/firestoreDb/firebaseDb'
import { localizeErrorsMap } from '../../infra/firestoreDb/firestoreException'
import { db } from '../../infra/firestoreDb/firebase'
import ResponseSuccess from '../../domain/responseSuccess'

const adapter: FirebaseAdapter = new FirebaseAdapter()
const testObject = {
  id: '1',
  name: 'john doe',
}

const documentReferenceMock: DocumentReference = {
  id: '1',
  converter: null,
  firestore: db,
  parent: {} as CollectionReference,
  path: '',
  type: 'document',
  withConverter: jest.fn().mockImplementation(),
}

const mockFirestoreError: FirestoreError = {
  code: 'cancelled',
  message: 'A operação foi cancelada',
  name: '',
}
describe('Handle store use cases', () => {
  it('Should create a document and return the document with id 1', () => {
    jest
      .spyOn(adapter, 'insertDocument')
      .mockImplementation(() => Promise.resolve(documentReferenceMock))
    const result = adapter.store(testObject, 'foo')
    result.then((response: ResponseSuccess) => {
      expect(response.message).toEqual(testObject.id)
    })
  })

  it('Should try to create a document and fail with a FirestoreError', () => {
    jest
      .spyOn(adapter, 'insertDocument')
      .mockImplementation(() => Promise.reject(mockFirestoreError))
    const result = adapter.store(testObject, 'foo')
    result.catch((error) => {
      console.log(error.message)
      console.log(mockFirestoreError.message)
      expect(error.message).toEqual(mockFirestoreError.message)
    })
  })
})

describe('Handle edit use cases', () => {
  it('Should edit a document and return the document with id 1', () => {
    jest
      .spyOn(adapter, 'editDocument')
      .mockImplementation(() => Promise.resolve())
    const result = adapter.edit(testObject, 'foo', '1')
    result.then((response: ResponseSuccess) => {
      expect(response.message).toEqual(testObject.id)
    })
  })

  it('Should try to edit a document and fail with a FirestoreError', () => {
    jest
      .spyOn(adapter, 'editDocument')
      .mockImplementation(() => Promise.reject(mockFirestoreError))
    const result = adapter.edit(testObject, 'foo', '1')
    result.catch((error) => {
      expect(error.message).toEqual(mockFirestoreError.message)
    })
  })
})

describe('Handle with Exception from Firesotre', () => {
  it('Should return the correct error message in BR language', () => {
    const errorMessage = localizeErrorsMap(mockFirestoreError)
    expect(errorMessage).toEqual(mockFirestoreError.message)
  })
})
