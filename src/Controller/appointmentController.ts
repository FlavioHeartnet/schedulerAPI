import ReponseClass from '../Model/responseErrorClass'
import Base from '../Database/firebaseAdapter'
import Agendamentos from '../Model/appointments'
import Appointment from '../Model/appointments'

export default class AgendamentosController extends Base {
  public static Collection: string = 'Agendamentos'

  constructor() {
    super()
  }

  public insert(
    date: Date,
    serviceDoneAt: Date,
    notes: String,
    isDone: boolean
  ) {
    const Agendamento: Appointment = {
      date: date,
      serviceDoneAt: serviceDoneAt,
      notes: notes,
      isDone: isDone
    }

    return this.store(
      Agendamento,
      AgendamentosController.Collection,
      this.agendamentoConverter()
    )
      .then((d) => new ReponseClass(d, ''))
      .catch(() => new ReponseClass('', 'Erro ao criar agendamento'))
  }

  public update(
    id: string,
    date: Date,
    serviceDoneAt: Date,
    notes: String,
    isDone: boolean
  ) {
    const Agendamento: Appointment = {
      date: date,
      serviceDoneAt: serviceDoneAt,
      notes: notes,
      isDone: isDone
    }

    return this.edit(
      Agendamento,
      AgendamentosController.Collection,
      id,
      this.agendamentoConverter()
    ).then((a) => {
      switch (a) {
        case true:
          return new ReponseClass(id, '')

        case false:
          return new ReponseClass(
            '',
            'Não foi possivel atualizar seu agendamento no momento! tente novamente mais tarde ou contate o admin'
          )
      }
    })
  }

  public async getAll(): Promise<Agendamentos[]> {
    const resp = this.getAllbyCollection(AgendamentosController.Collection)

    const data = await resp
    const result: Agendamentos[] = []
    data.forEach((d) => {
      const values = d.data()
      const Agenda: Agendamentos = new Agendamentos(
        values.data,
        values.observacao,
        values.servRealizado,
        values.dataTermino
      )
      Agenda.id = d.id
      result.push(Agenda)
    })
    return result
  }

  public async getById(id: string): Promise<Agendamentos> {
    const values = await (
      await this.getDocbyId(AgendamentosController.Collection, id)
    ).data()
    const Agenda: Agendamentos = new Agendamentos(
      values!.data,
      values!.observacao,
      values!.servRealizado,
      values!.dataTermino
    )
    Agenda.id = values!.id

    return Agenda
  }


}
