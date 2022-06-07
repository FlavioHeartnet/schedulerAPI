export interface Pessoa {
  nome: String
  cpf: String
  dataNascimento: Date
}
export interface IResponseClass {
  id: string
  error: string
}

export interface IAgendamentos {
  data: Date
  dataTermino?: Date
  observacao: String
  servRealizado: boolean
}
