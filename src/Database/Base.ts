import { db } from "../firebase"

interface DatabaseStruct{
    store(data: any, collection: string, converter: any): Promise<boolean>
    edit(data: any, collection: string, doc: string, converter: any): Promise<boolean>
    
}

export default class BaseDb implements DatabaseStruct {

    store(data: any, collection: string, converter: any): Promise<boolean>{
        const docRef = db.collection(collection).withConverter(converter);
        
        const resp = docRef.add(data).then((d) =>{
            console.log(d.path)
            return true

        }).catch(()=>{
            return false
        });

        return resp
    }

    edit(data:any, collection: string, doc: string, converter: any): Promise<boolean>{
        const docRef = db.collection(collection).doc(doc).withConverter(converter);

        const resp =  docRef.set(data).then((d) =>{
            console.log(d)
            return true

        }).catch(()=>{
            return false
        });

        return resp
    }

     protected getAllbyCollection(collection: string){
        return db.collection(collection).get()
    }


}