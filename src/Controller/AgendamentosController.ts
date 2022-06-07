import ReponseClass from '../Model/ReponseClass'
import Base from '../Database/Base'
import Agendamentos from '../Model/Agendamentos'

export default class AgendamentosController extends Base {
  public static Collection: string = 'Agendamentos'

  constructor() {
    super()
  }

  public insert(
    data: Date,
    observacao: String,
    servRealizado: boolean,
    dataTermino: Date
  ) {
    const Agendamento: Agendamentos = new Agendamentos(
      data,
      observacao,
      servRealizado,
      dataTermino
    )

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
    data: Date,
    dataTermino: Date,
    observacao: String,
    servRealizado: boolean
  ) {
    const Agendamento: Agendamentos = new Agendamentos(
      data,
      observacao,
      servRealizado,
      dataTermino
    )

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

  private agendamentoConverter() {
    return {
      toFirestore: function (agendamento: Agendamentos) {
        return {
          DATA: agendamento.data,
          DATA_TERMINO: agendamento.dataTermino,
          OBSERVACAO: agendamento.observacao,
          SERV_REALIZADO: agendamento.servRealizado,
        }
      },
      fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options)
        return new Agendamentos(
          data.data,
          data.dataTermino,
          data.observacao,
          data.servRealizado
        )
      },
    }
  }
}
