import Appointment from './appointments'

export default interface AppointmentsRepositoryInterface {
  insert(appointment: Appointment): Promise<void>
  update(appointment: Appointment, id: string): Promise<void>
  getAllAppointments(): Promise<Appointment[]>
  getAppointmentById(id: string): Promise<Appointment>
}
