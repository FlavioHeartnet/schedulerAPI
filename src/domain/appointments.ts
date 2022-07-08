import AppointmentsRepositoryInterface from './appointmentsRepositoryInterface'

export default abstract class Appointment
  implements AppointmentsRepositoryInterface
{
  abstract insert(appointment: Appointment): Promise<void>
  abstract update(appointment: Appointment, id: string): Promise<void>
  abstract getAllAppointments(): Promise<Appointment[]>
  abstract getAppointmentById(id: string): Promise<Appointment>
  private _id?: string | undefined
  public get id(): string | undefined {
    return this._id
  }
  public set id(value: string | undefined) {
    this._id = value
  }
  private _date: Date
  public get date(): Date {
    return this._date
  }
  public set date(value: Date) {
    this._date = value
  }
  private _serviceDoneAt: Date
  public get serviceDoneAt(): Date {
    return this._serviceDoneAt
  }
  public set serviceDoneAt(value: Date) {
    this._serviceDoneAt = value
  }
  private _notes: string
  public get notes(): string {
    return this._notes
  }
  public set notes(value: string) {
    this._notes = value
  }
  private _isDone: boolean
  public get isDone(): boolean {
    return this._isDone
  }
  public set isDone(value: boolean) {
    this._isDone = value
  }
}
