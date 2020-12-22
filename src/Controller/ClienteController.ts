import  ReponseClass  from "../Model/ReponseClass"
import Base from "../Database/Base"
import { db } from "../firebase"
import Cliente from "../Model/Cliente"

export default class ClienteController extends Base{
    public static Collection: string = "Cliente"
    
    constructor(){
        super()
    }

    public insert(nome: String, cpf: String, DataNascimento: Date){
        const cliente = new Cliente(nome, cpf, DataNascimento)
        let cpfVerify = db.collection(ClienteController.Collection).where('cpf', '==', cpf).get()
        .then((snapshot) => {
            if(snapshot.empty){

               return this.store(cliente, ClienteController.Collection, this.clientConverter()).then((d) => 
                 new ReponseClass(d,"")
                )

            }else{

                return new ReponseClass("","CPF já cadastrado")
                   
            }

        }).catch(err => {
            return new ReponseClass("","Erro ao buscar documentos")
        });

        return cpfVerify 
       
    }

    public update(id: string, nome: String, cpf: String, DataNascimento: Date){
        const cliente = new Cliente(nome, cpf, DataNascimento)
        let cpfVerify = db.collection(ClienteController.Collection).where('cpf', '==', cpf).get()
        .then(snapshot => {
            if(snapshot.empty){
                return this.edit(cliente, ClienteController.Collection, id, this.clientConverter())
                .then(a => {
                    switch(a){
                        case true: return new ReponseClass(id,"") 
                            
                        case false: return new ReponseClass("","Não foi possivel atualizar no momento! tente novamente mais tarde ou contate o admin") 
                        
                    } 
                })
            }
            const resp: ReponseClass = new ReponseClass("","")
                snapshot.docs.map(a =>{
                    if(a.id == id){
                        resp.error = "CPF inserido é o mesmo já cadastrado"
                        
                    }else{
                        resp.error = "CPF já cadastrado em outro cliente"
                    }
                })
            
           return resp

        }).catch(() => {
            return new ReponseClass("","Não foi possivel validar os dados inseridos! tente novamente mais tarde ou contate o admin") 
        })
         
        return cpfVerify

    }

    public async getAll(): Promise<Cliente[]>{
        const resp = this.getAllbyCollection(ClienteController.Collection)
        
        const data = await resp
        let result: Cliente[] = []
        data.forEach((d) => {
            let Client: Cliente
            const values = d.data()
            Client = new Cliente(values.nome, values.cpf, values.DataNascimento)
            Client.id = d.id
            result.push(Client)

        })
        return result

    }

    public async getById(id: string): Promise<Cliente>{
        let Client: Cliente
        const values = await (await this.getDocbyId(ClienteController.Collection, id)).data()  
        Client = new Cliente(values!.nome, values!.cpf, values!.DataNascimento)
        Client.id = values!.id

        return Client
          
    }

   

    private clientConverter(){
        return {
            toFirestore: function(cliente: Cliente) {
                return {
                    nome: cliente.Nome,
                    cpf: cliente.CPF,
                    DataNascimento: cliente.DataNascimento
                    }
            },
            fromFirestore: function(snapshot: any, options: any){
                const data = snapshot.data(options);
                return new Cliente(data.nome, data.cpf, data.DataNascimento)
            }
        }
    }
}
