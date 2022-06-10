import Appointment from '../model/appointments'
import ResponseSuccess from '../model/responseSuccess'
import ResponseError from '../model/responseError'
import AppointmentAdapter from '../database/appointmentAdapter'

export default class AppointmentController extends AppointmentAdapter {
  constructor() {
    super()
  }

  public newAppointment(
    date: Date,
    notes: String,
    isDone: boolean
  ): Promise<ResponseSuccess | ResponseError> {
    const appointment: Appointment = {
      date: date,
      notes: notes,
      isDone: isDone,
      serviceDoneAt: new Date(),
    }

    return this.insert(appointment)
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public updateAppointment(
    id: string,
    date: Date,
    serviceDoneAt: Date,
    notes: String,
    isDone: boolean
  ): Promise<ResponseSuccess | ResponseError> {
    const appointment: Appointment = {
      date: date,
      serviceDoneAt: serviceDoneAt,
      notes: notes,
      isDone: isDone,
    }

    return this.update(appointment, id)
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public getAll(): Promise<ResponseSuccess | ResponseError> {
    const data = this.getAllAppointments()
    return data
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public getById(id: string): Promise<ResponseSuccess | ResponseError> {
    return this.getAppointmentById(id)
      .then((result) =>
        this.convertToAppointmentList(result as ResponseSuccess)
      )
      .catch((error) => error as ResponseError)
  }

  private convertToAppointmentList(result: ResponseSuccess) {
    result = result as ResponseSuccess
    result.snapshop = result.snapshop as Appointment[]
    return result
  }
}
