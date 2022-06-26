
import ResponseSuccess from './responseSuccess'
import ResponseError from './responseError'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDTO } from './dto/update-appointment.dto'
import AppointmentAdapter from '../infra/firestoreDb/appointmentAdapter'

export default class AppointmentController {
  appointmentAdapter: AppointmentAdapter
  constructor() {
    this.appointmentAdapter = new AppointmentAdapter()
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

    return this.appointmentAdapter.insert(appointment)
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

    return this.appointmentAdapter.update(appointment)
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public getAll(): Promise<ResponseSuccess | ResponseError> {
    const data = this.appointmentAdapter.getAllAppointments()
    return data
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public getById(id: string): Promise<ResponseSuccess | ResponseError> {
    return this.appointmentAdapter.getAppointmentById(id)
      .then((result) =>
        this.convertToAppointmentList(result as ResponseSuccess)
      )
      .catch((error) => error as ResponseError)
  }

  private convertToAppointmentList(result: ResponseSuccess) {
    result = result as ResponseSuccess
    result.snapshop = result.snapshop as CreateAppointmentDto[]
    return result
  }
}
