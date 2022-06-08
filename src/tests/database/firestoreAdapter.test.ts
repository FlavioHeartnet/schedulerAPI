import { CollectionReference, DocumentReference, FirestoreError, } from "firebase/firestore";
import FirebaseAdapter from "../../database/firebaseAdapter";
import { db } from "../../firebase";
import ResponseError from "../../model/responseError";


const adapter: FirebaseAdapter = new FirebaseAdapter()
const testObject = {
    id: "1",
    name: "john doe"
}

const documentReferenceMock: DocumentReference<any> = {
    id: "1",
    converter: null,
    firestore: db,
    parent: {} as CollectionReference,
    path: "",
    type: "document",
    withConverter: jest.fn().mockImplementation()
}

const mockFirestoreError: FirestoreError = {
    code: "cancelled",
    message: "",
    name: ""
}
describe('Handle store use cases', () => {

    it('Should create a document and return the document with id 1', async () => {
        jest.spyOn(adapter, "insertDocument").mockImplementation(() => Promise.resolve(documentReferenceMock));
        const result = await adapter.store(testObject, "foo")
        expect(result.message).toEqual(testObject.id)
    })

    it('Should try to create a document and fail with a FirestoreError', async () => {

    })
})