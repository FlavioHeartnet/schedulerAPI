import Base from '../database/firebaseAdapter'
import Agendamentos from '../model/appointments'
import Appointment from '../model/appointments'
import ResponseSuccess from '../model/responseSuccess'
import ResponseError from '../model/responseError'

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
      AgendamentosController.Collection
    )
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
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
      id
    ).then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public getAll(): Promise<ResponseSuccess | ResponseError> {

    const data = this.getAllbyCollection(AgendamentosController.Collection)
    return data.then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public getById(id: string): Promise<ResponseSuccess | ResponseError> {
    return this.getDocbyId(AgendamentosController.Collection, id)
      .then((result) => this.convertToAppointmentList(result as ResponseSuccess))
      .catch((error) => error as ResponseError)
  }

  private convertToAppointmentList(result: ResponseSuccess) {
    result = result as ResponseSuccess
    result.snapshop = result.snapshop as Appointment[]
    return result
  }
}
