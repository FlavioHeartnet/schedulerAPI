import ReponseClass from '../model/responseError'
import Base from '../database/firebaseAdapter'
import Agendamentos from '../model/appointments'
import Appointment from '../model/appointments'

export default class AgendamentosController extends Base {
  public static Collection: string = 'Agendamentos'

  constructor() {
    super()
  }

  public insert(date: Date, notes: String, isDone: boolean) {
    const appointment: Appointment = {
      date: date,
      notes: notes,
      isDone: isDone,
      serviceDoneAt: new Date(),
    }

    return this.store(
      appointment,
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
      isDone: isDone,
    }

    return this.edit(
      Agendamento,
      AgendamentosController.Collection,
      id,
      this.agendamentoConverter()
    ).then((a) => {
      switch (a) {
        case true:
          return new ReponseClass()

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
