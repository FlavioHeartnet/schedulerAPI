import Base from "../Database/Base"
import Cliente from "../Model/Cliente"

export default class ClienteController extends Base{

    constructor(){
        super()
    }

    public insert(nome: String, cpf: String, DataNascimento: Date){
        const cliente = new Cliente(nome, cpf, DataNascimento)
       return this.store(cliente, "Cliente", this.clientConverter()).then((d) => d)     
       
    }

    public update(){

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
