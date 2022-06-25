
import ResponseSuccess from './responseSuccess'
import ResponseError from './responseError'
import AppointmentAdapter from '../Infra/firestoreDb/appointmentAdapter'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDTO } from './dto/update-appointment.dto'

export default class AppointmentController extends AppointmentAdapter {
  constructor() {
    super()
  }

  public newAppointment(
    date: Date,
    notes: String,
    isDone: boolean
  ): Promise<ResponseSuccess | ResponseError> {
    const appointment: CreateAppointmentDto = {
      date: date,
      notes: notes,
      isDone: isDone,
    }

    return this.insert(appointment)
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public updateAppointment(
    id: string,
    date: Date,
    notes: String,
    isDone: boolean
  ): Promise<ResponseSuccess | ResponseError> {
    const appointment: UpdateAppointmentDTO = {
      id: id,
      date: date,
      notes: notes,
      isDone: isDone,
    }

    return this.update(appointment)
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
