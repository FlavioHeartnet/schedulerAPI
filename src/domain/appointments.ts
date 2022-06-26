import { IAppointment } from './interfaces'

export default class Appointment implements IAppointment {
  public id?: string
  public date: Date
  public serviceDoneAt: Date
  public notes: string
  public isDone: boolean
}
