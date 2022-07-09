import Appointment from '../domain/appointments'
import AppointmentsRepositoryInterface from '../domain/appointmentsRepositoryInterface'

export default class CreateAppointmentUseCase {
  constructor(private appointmentRepo: AppointmentsRepositoryInterface) {}

  async execute(
    input: CreateAppointmentInput
  ): Promise<CreateAppointmentOutput> {
    await this.appointmentRepo.insert(
      new Appointment().create(input.date, input.notes, input.isDone)
    )
    return {
      id: '',
      date: input.date,
      notes: input.notes,
      isDone: input.isDone,
    }
  }
}

type CreateAppointmentInput = {
  date: Date
  notes: string
  isDone: boolean
}

type CreateAppointmentOutput = {
  id: string
  date: Date
  notes: string
  isDone: boolean
}
