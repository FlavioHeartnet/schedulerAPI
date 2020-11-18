import Base from "../Database/Base"
import Cliente from "../Model/Cliente"

export default class ClienteController extends Base{
    public static Collection: string = "Cliente"
    
    constructor(){
        super()
    }

    public insert(nome: String, cpf: String, DataNascimento: Date){
        const cliente = new Cliente(nome, cpf, DataNascimento)
       return this.store(cliente, ClienteController.Collection, this.clientConverter()).then((d) => d)     
       
    }

    public update(id: string, nome: String, cpf: String, DataNascimento: Date){
        const cliente = new Cliente(nome, cpf, DataNascimento)
        return this.edit(cliente, ClienteController.Collection, id, this.clientConverter())
        

    }

    public async getAll(){
        const resp = this.getAllbyCollection("Cliente")
        
        return resp.then((data)=>{
            let result : Cliente[] = []
            data.forEach((d)=>{
                let Client : Cliente
                const values = d.data()
                Client = new Cliente(values.nome, values.cpf, values.DataNascimento)
                Client.id = d.id
                result.push(Client)
               
            })
            return result
        })

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
