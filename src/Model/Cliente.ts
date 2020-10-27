import { Pessoa } from "./interfaces"

export default class Cliente implements Pessoa {
    
    constructor(public Nome: String,public CPF: String, public DataNascimento: Date){
        
    }
} 
