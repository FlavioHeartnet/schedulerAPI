import  ReponseClass  from "../Model/ReponseClass"
import Base from "../Database/Base"
import { db } from "../firebase"
import Agendamentos from "../Model/Agendamentos"


export default class AgendamentosController extends Base{
    public static Collection: string = "Agendamentos"
    
    constructor(){
        super()
    }

    public insert(Data: Date, Observacao:String, Serv_Realizado: boolean, Data_Termino: Date){
            const Agendamento: Agendamentos = new Agendamentos(Data, Observacao,Serv_Realizado, Data_Termino)

            return this.store(Agendamento, AgendamentosController.Collection, this.agendamentoConverter()).then((d) => 
                 new ReponseClass(d,"")
                ).catch(err => new ReponseClass("","Erro ao criar agendamento"))
    }

    public update(id: string, Data: Date, Data_Termino: Date, Observacao:String, Serv_Realizado: boolean){
        const Agendamento: Agendamentos = new Agendamentos(Data, Observacao,Serv_Realizado, Data_Termino)

        return this.edit(Agendamento, AgendamentosController.Collection, id, this.agendamentoConverter())
                .then(a => {
                    switch(a){
                        case true: return new ReponseClass(id,"") 
                            
                        case false: return new ReponseClass("","Não foi possivel atualizar seu agendamento no momento! tente novamente mais tarde ou contate o admin") 
                        
                    } 
                })

    }

    public async getAll(): Promise<Agendamentos[]>{
        const resp = this.getAllbyCollection(AgendamentosController.Collection)
        
        const data = await resp
        let result: Agendamentos[] = []
        data.forEach((d) => {
            let Agenda: Agendamentos
            const values = d.data()
            Agenda = new Agendamentos(values.Data, values.Observacao, values.Serv_Realizado, values.Data_Termino)
            Agenda.id = d.id
            result.push(Agenda)

        })
        return result

    }

    public async getById(id: string): Promise<Agendamentos>{
        let Agenda: Agendamentos
        const values = await (await this.getDocbyId(AgendamentosController.Collection, id)).data()  
        Agenda = new Agendamentos(values!.Data, values!.Observacao, values!.Serv_Realizado, values!.Data_Termino)
        Agenda.id = values!.id

        return Agenda
          
    }

    private agendamentoConverter(){
        return {
            toFirestore: function(agendamento: Agendamentos) {
                return {
                    DATA: agendamento.Data,
                    DATA_TERMINO: agendamento.Data_Termino,
                    OBSERVACAO: agendamento.Observacao,
                    SERV_REALIZADO: agendamento.Serv_Realizado
                    }
            },
            fromFirestore: function(snapshot: any, options: any){
                const data = snapshot.data(options);
                return new Agendamentos(data.Data, data.Data_Termino, data.Observacao, data.Serv_Realizado)
            }
        }
    }

}