import { IAgendamentos } from "./interfaces"

export default class Agendamentos implements IAgendamentos{
    public id: String = ""
    constructor(public Data:Date, public Observacao: String, public Serv_Realizado: boolean, public Data_Termino?:Date){

    }

}