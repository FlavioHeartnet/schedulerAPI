import AppointmentFirebaseAdapter from '../appointments/adapters/firebaseAdapter/appointmentFirebaseAdapter'
import Appointment from '../domain/appointments'

export class UpdateAppointmentUseCase {
  constructor(private appointmentAdapter: AppointmentFirebaseAdapter) { }

  async execute(
    input: UpdateAppointmentInput
  ): Promise<UpdateAppointmentOutput> {

    await await this.appointmentAdapter.update(new Appointment().create(input.date, input.notes, input.isDone), input.id)
    return {
      date: input.date,
      notes: input.notes,
      isDone: input.isDone,
    }
  }
}

type UpdateAppointmentInput = {
  id: string
  date: Date
  notes: string
  isDone: boolean
}

type UpdateAppointmentOutput = {
  date: Date
  notes: string
  isDone: boolean
}
