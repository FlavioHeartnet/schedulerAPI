


    export interface Pessoa {
        Nome: String
        CPF: String
        DataNascimento: Date
         
    }
    export interface IResponseClass {
        id: string
        error: string
    }

    export interface IAgendamentos {
        Data: Date
        Data_Termino?: Date
        Observacao: String
        Serv_Realizado: boolean
    }

