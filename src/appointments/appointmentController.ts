import ResponseSuccess from '../domain/responseSuccess'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDTO } from './dto/update-appointment.dto'
import AppointmentAdapter from './adapters/firebaseAdapter/appointmentFirebaseAdapter'
import Appointment from '../domain/appointments'
import CreateAppointmentUseCase from '../application/create-appointment.use-case'
import { UpdateAppointmentUseCase } from '../application/update-appointment.use-case'
import GetAllAppointmentUseCase from '../application/getall-appointments.use-case'
import GetByIdAppointmentUseCase from '../application/getbyid-appointments.use-case'

export default class AppointmentController {
  private createUseCase: CreateAppointmentUseCase
  private updateUseCase: UpdateAppointmentUseCase
  private getallUseCase: GetAllAppointmentUseCase
  private getbyidUseCase: GetByIdAppointmentUseCase
  constructor() {
    this.createUseCase = new CreateAppointmentUseCase(new AppointmentAdapter())
    this.updateUseCase = new UpdateAppointmentUseCase(new AppointmentAdapter())
    this.getallUseCase = new GetAllAppointmentUseCase(new AppointmentAdapter())
    this.getbyidUseCase = new GetByIdAppointmentUseCase(
      new AppointmentAdapter()
    )
  }
  public newAppointment(
    date: Date,
    notes: string,
    isDone: boolean
  ): Promise<ResponseSuccess> {
    const appointment: CreateAppointmentDto = {
      date: date,
      notes: notes,
      isDone: isDone,
    }

    return this.createUseCase
      .execute(appointment)
      .then(() => {
        return {
          message: '',
          snapshop: [appointment],
        }
      })
      .catch((error) => error)
  }

  public updateAppointment(
    id: string,
    date: Date,
    notes: string,
    isDone: boolean
  ): Promise<ResponseSuccess> {
    const appointment: UpdateAppointmentDTO = {
      id: id,
      date: date,
      notes: notes,
      isDone: isDone,
    }

    return this.updateUseCase
      .execute(appointment)
      .then(() => {
        return {
          message: '',
          snapshop: [appointment],
        }
      })
      .catch((error) => error)
  }

  public getAll(): Promise<ResponseSuccess> {
    const data = this.getallUseCase.execute()
    return data
      .then(() => {
        return {
          message: '',
          snapshop: data,
        }
      })
      .catch((error) => error)
  }

  public getById(id: string): Promise<Appointment> {
    return this.getbyidUseCase
      .execute(id)
      .then((result) => result)
      .catch((error) => error)
  }
}
