import { db } from "../firebase"

interface DatabaseStruct{
    store(data: any, collection: string): Promise<boolean>
    edit(data: any, collection: string, doc: string): Promise<boolean>
}

export default class BaseDb implements DatabaseStruct {

    store(data: any, collection: string): Promise<boolean>{
        const docRef = db.collection(collection);

        const resp = docRef.add({data}).then((d) =>{
            console.log(d)
            return true

        }).catch(()=>{
            return false
        });

        return resp
    }

    edit(data:any, collection: string, doc: string): Promise<boolean>{
        const docRef = db.collection(collection).doc(doc);

        const resp =  docRef.set({data}).then((d) =>{
            console.log(d)
            return true

        }).catch(()=>{
            return false
        });

        return resp
    }


}