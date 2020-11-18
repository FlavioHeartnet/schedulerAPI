import { Pessoa } from "./interfaces"

export default class Cliente implements Pessoa {
    public id: String = ""
    constructor(public Nome: String ="",public CPF: String = "", public DataNascimento: Date){
        
    }
} 
